import { Router } from "express";
import { authenticate } from "../middlewares/auth.js";
import {
  addUser,
  authCheck,
  logout,
  deleteUser,
  getUserById,
  getUsers,
  login,
  updateUser,
  checkUserExists,
} from "../controllers/users.js";

const userRouter = Router();

// public routes
userRouter.get("/", getUsers);
userRouter.post("/add", addUser);
userRouter.post("/login", login);

userRouter.get("/check", checkUserExists);

// auth-specific routes (STATIC — MUST COME FIRST)
userRouter.get("/auth-check", authenticate, authCheck);
userRouter.post("/logout", authenticate, logout);

// protected CRUD routes (DYNAMIC — LAST)
userRouter.get("/:id", authenticate, getUserById);
userRouter.put("/:id", authenticate, updateUser);
userRouter.delete("/:id", authenticate, deleteUser);

export default userRouter;
