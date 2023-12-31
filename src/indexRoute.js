import express from "express";
import authRouter from "./modules/auth/auth.route";
import userRouter from "./modules/users/user.route";
import feedRouter from "./modules/feeds/feed.route";
import logRouter from "./modules/logs/log.route";

var indexRouter = express.Router();

indexRouter.get("/", function (req, res, next) {
  res.status(200).json({ message: "WELCOME TO ADEODIST" });
});

indexRouter.use(authRouter);
indexRouter.use(userRouter);
indexRouter.use(feedRouter);
indexRouter.use(logRouter);

module.exports = indexRouter;
