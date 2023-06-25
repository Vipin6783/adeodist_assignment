import express from "express";
import LogController from "./log.controller";
import authMiddleware from "../../middlewares/authMiddleware";
const logRouter = express.Router();

logRouter.get("/read/logs", authMiddleware, LogController.getLatestLogs);

export default logRouter;
