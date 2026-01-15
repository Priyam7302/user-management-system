import express from "express";
import { connectToDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
await connectToDB();

app.use("/users", userRouter);
app.listen(PORT, () => console.log("Server started at port " + PORT));
