// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRouter from "./routes/auth.route";
// import userRouter from "./routes/user.route";
// import blogRouter from "./routes/blog.route";

// dotenv.config();

// const app = express();
// const allowedOrigins = [
//   "http://localhost:4000",
//   "https://blog-it-app-ruby.vercel.app",
// ];

// app.use(express.json());
// app.use(
//   cors({
//     origin: allowedOrigins,
//     credentials: true,
//   }),
// );

// app.get("/", (_req, res) => {
//   res.send("<h1>BlogIT App</h1>");
// });
// app.use("/api/auth", authRouter);
// app.use("/api/blogs", blogRouter);
// app.use("/api/user", userRouter);

// const port = process.env.PORT || 4000;
// app.listen(port, () => console.log(`BlogIT running on ${port} `));

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
    origin: ["http://localhost:5173", "https://blog-it-app-ruby.vercel.app"],
    methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
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
