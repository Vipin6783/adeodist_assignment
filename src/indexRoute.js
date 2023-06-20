import express from "express";
import authRouter from "./modules/auth/route";

var indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (req, res, next) {
  res.status(200).json({ message: "WELCOME TO ADEODIST" });
});

indexRouter.use(authRouter);

module.exports = indexRouter;
