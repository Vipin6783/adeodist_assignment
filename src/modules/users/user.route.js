import express from "express";
import UserController from "./user.controller";
import AuthInspector from '../../middlewares/authInspector'

const userRouter = express.Router();

userRouter.get("/user/list", AuthInspector.validateToken, UserController.getUserList);

export default userRouter;
