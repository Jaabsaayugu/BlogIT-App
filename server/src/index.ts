import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./routes/auth.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    // methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  }),
);

app.get("/", (_req, res) => {
  res.send("<h1>Welcome To BlogIT</h1>");
});
app.use("/auth", authRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`BlogIT running on ${port} `));
