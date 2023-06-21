import express from "express";
import AuthController from "./auth.controller";
const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/refreshToken", AuthController.regenerateToken);

export default authRouter;
