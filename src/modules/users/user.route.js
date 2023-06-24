import express from "express";
import UserController from "./user.controller";
import authMiddleware from "../../middlewares/authMiddleware";

const userRouter = express.Router();

userRouter.post("/create/user", authMiddleware, UserController.createUser);

userRouter.get("/read/user/list", authMiddleware, UserController.getUserList);

userRouter.get("/read/user/:userId", authMiddleware, UserController.getUserDetail);

userRouter.put(
  "/update/user/:userId",
  authMiddleware,
  UserController.updateUser
);

userRouter.delete(
  "/delete/user/:userId",
  authMiddleware,
  UserController.deleteUser
);

export default userRouter;
