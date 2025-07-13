import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash("password123", 10);

  const user = await prisma.user.create({
    data: {
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
      email: "john@example.com",
      password: hashed,
    },
  });

  await prisma.blog.createMany({
    data: [
      {
        title: "First Blog",
        synopsis: "My first blog",
        content: "## Hello world in markdown!",
        featuredImg: "https://via.placeholder.com/150",
        userId: user.id,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
