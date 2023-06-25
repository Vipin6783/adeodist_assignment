import createError from "http-errors";
import express from "express";

import indexRouter from "./indexRoute";
import logger from "./utils/logger";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", (req,res,next)=>{
  logger.log(`body$`)

},indexRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  logger.log("req===============", req);
  logger.log("res===============", res);

  logger.log("err===============", err);
  return res.status(500).json({ error: err.message });
});

export default app;
