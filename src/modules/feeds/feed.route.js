import express from "express";
import FeedController from "./feed.controller";
import authMiddleware from "../../middlewares/authMiddleware";
import feedMiddleware from "../../middlewares/feedMiddleware";
const feedRouter = express.Router();

feedRouter.post(
  "/create/feed",
  authMiddleware,
  feedMiddleware,
  FeedController.createFeed
); 
feedRouter.get(
  "/read/feed/list",
  authMiddleware,
//   feedMiddleware,
  FeedController.getFeedList
); 
feedRouter.get(
  "/read/feed/:feedId",
  authMiddleware,
//   feedMiddleware,
  FeedController.getFeedById
); 
feedRouter.put(
  "/update/feed/:feedId",
  authMiddleware,
//   feedMiddleware,
  FeedController.updateFeed
); 
feedRouter.delete(
  "/delete/feed/:feedId",
  authMiddleware,
//   feedMiddleware,
  FeedController.deleteFeed
); 

export default feedRouter;
