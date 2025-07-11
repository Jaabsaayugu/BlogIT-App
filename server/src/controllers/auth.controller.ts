import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: "User Created Successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Something Went Wrong! Try again Later!" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const user = await client.user.findFirst({
      where: {
        OR: [{ username: identifier }, { email: identifier }],
      },
    });
    if (!user) {
      res.status(400).json({ message: "You Entered Wrong Login Credentials" });
      return;
    }
    const passAuth = await bcrypt.compare(password, user.password);
    if (!passAuth) {
      res.status(400).json({ message: "You Entered Wrong Login Credentials" });
      return;
    }
    const {
      password: loginPassword,
      dateJoined,
      lastUpdate,
      ...userDetails
    } = user;
    const token = jwt.sign(userDetails, process.env.JWT_SECRET!);
    res.cookie("authToken", token).json(userDetails);
  } catch (e) {
    res.status(500).json({ message: "Bad request" });
  }
};
