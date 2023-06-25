import createError from "http-errors";
import express from "express";

import indexRouter from "./indexRoute";
import logger from "./utils/logger";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/",
  (req, res, next) => {
    logger.log(
      `method$>>> ${req.method}, path$>>> ${req.path}, params$>>> ${
        req.params
      }, body$>>> ${JSON.stringify(req.body)}`
    );
    next();
  },
  indexRouter
);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  logger.log(`error >>> ${err}`);
  return res.status(500).json({ error: err.message });
});

export default app;
