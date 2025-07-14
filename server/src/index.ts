import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route";
import userRouter from "./routes/user.route";
import blogRouter from "./routes/blog.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://blogit-backend-xlol.onrender.com",
    credentials: true,
  }),
);

app.get("/", (_req, res) => {
  res.send("<h1>BlogIT App</h1>");
});
app.use("/api/auth", authRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/user", userRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`BlogIT running on ${port} `));
