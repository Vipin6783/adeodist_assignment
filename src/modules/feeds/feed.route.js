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

feedRouter.get("/read/feed/list", authMiddleware, FeedController.getFeedList);

feedRouter.get(
  "/read/feed/:feedId",
  authMiddleware,
  feedMiddleware,
  FeedController.getFeedDetail
);

feedRouter.put(
  "/update/feed/:feedId",
  authMiddleware,
  feedMiddleware,
  FeedController.updateFeed
);

feedRouter.delete(
  "/delete/feed/:feedId",
  authMiddleware,
  feedMiddleware,
  FeedController.deleteFeed
);

feedRouter.post(
  "/provide/feed/access",
  authMiddleware,
  FeedController.provideFeedAccess
);

feedRouter.put(
  "/provide/feed/delete/access",
  authMiddleware,
  FeedController.provideFeedDeleteAccess
);



export default feedRouter;
