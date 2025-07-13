import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();
const prisma = new PrismaClient();

router.patch("/user", verifyToken, async (req, res): Promise<void> => {
  const { firstName, lastName, username, email } = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id: req.user!.id },
      data: { firstName, lastName, username, email },
    });
    res.json({ message: "Profile updated", user: updated });
  } catch (err) {
    res.status(500).json({ message: "Could not update profile" });
  }
});

router.patch("/user/password", verifyToken, async (req, res): Promise<void> => {
  const { currentPassword, newPassword } = req.body;

  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const valid = await bcrypt.compare(currentPassword, user.password);

    if (!valid) {
      res.status(400).json({ message: "Incorrect current password" });
      return;
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: req.user.id },
      data: { password: hashed },
    });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to update password" });
  }
});

router.get("/blogs", verifyToken, async (req, res): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const blogs = await prisma.blog.findMany({
      where: { userId: req.user.id, isDeleted: false },
      orderBy: { createdAt: "desc" },
    });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user's blogs" });
  }
});

export default router;
