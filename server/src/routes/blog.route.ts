import { Router } from "express";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (_req, res) => {
  const blogs = await prisma.blog.findMany({
    where: { isDeleted: false },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  res.json(blogs);
});

router.get("/blogs/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await prisma.blog.findUnique({
      where: { id },
      include: {
         user: {
          select: {firstName: true, lastName: true },
         },
        },    
    });

    if (!blog || blog.isDeleted) {
      res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Failed to fetch blog" });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { title, synopsis, content, imageUrl } = req.body;

  const blog = await prisma.blog.create({
    data: {
      title,
      synopsis,
      content,
      imageUrl,
      userId: req.user!.id,
    },
  });

  res.status(201).json(blog);
});

router.patch("/:id", verifyToken, async (req, res) => {
  const { title, synopsis, content, imageUrl } = req.body;

  const existing = await prisma.blog.findUnique({
    where: { id: req.params.id },
  });
  if (!existing || existing.userId !== req.user!.id) {
    res.status(403).json({ message: "Unauthorized or blog not found" });
  }

  const updated = await prisma.blog.update({
    where: { id: req.params.id },
    data: { title, synopsis, content, imageUrl },
  });

  res.json(updated);
});

router.delete("/:id", verifyToken, async (req, res) => {
  const blog = await prisma.blog.findUnique({ where: { id: req.params.id } });
  if (!blog || blog.userId !== req.user!.id) {
    res.status(403).json({ message: "Unauthorized or blog not found" });
  }

  await prisma.blog.update({
    where: { id: req.params.id },
    data: { isDeleted: true },
  });

  res.json({ message: "Blog deleted" });
});

export default router;
