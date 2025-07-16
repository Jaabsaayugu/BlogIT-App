import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("password123", 10);

  // Create or skip existing user
  const user = await prisma.user.upsert({
    where: { username: "johndoe" },
    update: {}, // No update if exists
    create: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@example.com",
      password: hashed,
    },
  });

  // Check if the blog already exists (optional safety)
  const existingBlogs = await prisma.blog.findMany({
    where: { userId: user.id },
  });

  if (existingBlogs.length === 0) {
    await prisma.blog.createMany({
      data: [
        {
          title: "First Blog",
          synopsis: "My first blog",
          content: "## Hello world in markdown!",
          imageUrl: "https://via.placeholder.com/150",
          userId: user.id,
        },
      ],
    });
    console.log("Blog seeded successfully.");
  } else {
    console.log("User already has blogs. Skipping blog seed.");
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
