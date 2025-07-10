import express from "express";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import zxcvbn from "zxcvbn";
import dotenv from "dotenv";
import cors from "cors";
// import { registerSchema } from "./validators/auth";

dotenv.config();

const app = express();
const client = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  }),
);

app.get("/", (_req, res) => {
  res.send("<h1>Welcome To BlogIT</h1>");
});

function verifyUserInformation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName) {
    res.status(400).json({ message: "First Name is Required" });
    return;
  }
  if (!lastName) {
    res.status(400).json({ message: "Last Name is Required" });
    return;
  }
  if (!username) {
    res.status(400).json({ message: "Username is Required" });
    return;
  }
  if (!email) {
    res.status(400).json({ message: "Email Address is Required" });
    return;
  }
  if (!password) {
    res.status(400).json({ message: "Password is Required" });
    return;
  }
  next();
}

function verifyPasswordStrength(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { password } = req.body;
  const result = zxcvbn(password);
  if (result.score < 3) {
    res.status(400).json({ message: " Please Use a Stronger Password" });
    return;
  }
  next();
}

async function checkUsernameAndEmailReuse(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, email } = req.body;
    const userWithSameDetails = await client.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
    if (userWithSameDetails) {
      res
        .status(400)
        .json({ message: "Email or Username is already being used" });
      return;
    }
    //   const userWithEmail = await client.user.findFirst({ where: { email } });
    //   if (userWithEmail) {
    //     res.status(400).json({ message: "Email is already being used" });
    //     return;
    //   }
    next();
  } catch (error) {
    res.status(500).json({ message: "Database error occurred." });
  }
}

app.post(
  "/auth/register",
  verifyUserInformation,
  checkUsernameAndEmailReuse,
  verifyPasswordStrength,
  async (req, res) => {
    try {
      //     const result = registerSchema.safeParse(req.body);

      //     if (!result.success) {
      //   const errors = result.error.flatten().fieldErrors;
      //   return res.status(400).json({ message: "Invalid input", errors });
      // }

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
      res
        .status(500)
        .json({ message: "Something Went Wrong! Try again Later!" });
    }
  },
);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`BlogIT running on ${port} `));
