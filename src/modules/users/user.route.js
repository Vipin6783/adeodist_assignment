import express from "express";
import UserController from "./user.controller";
import authMiddleware from '../../middlewares/authMiddleware'

const userRouter = express.Router();

userRouter.post("/create/user", authMiddleware, UserController.createUser);   // C
userRouter.get("/read/user", authMiddleware, UserController.getUserList);     // R
userRouter.put("/update/user/:userId", authMiddleware, UserController.updateUser);    // U
userRouter.delete("/delete/user/:userId", authMiddleware, UserController.deleteUser); // D

export default userRouter;
