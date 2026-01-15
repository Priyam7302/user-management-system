import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  addUser,
  checkUser,
  deleteUser,
  getUserById,
  getUsers,
  login,
  updateUser,
} from "../controllers/users.js";

const userRouter = Router();

// public routes
userRouter.get("/", getUsers);
userRouter.get("/check", checkUser);
userRouter.post("/add", addUser);
userRouter.post("/login", login);

// protected routes
userRouter.get("/:id", authenticate, getUserById);
userRouter.put("/:id", authenticate, updateUser);
userRouter.delete("/:id", authenticate, deleteUser);

export default userRouter;
