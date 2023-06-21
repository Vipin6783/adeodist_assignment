import express from "express";
import FeedController from "./feed.controller";
import AuthInspector from '../../middlewares/authInspector'
const feedRouter = express.Router();

feedRouter.get("/feed/list", AuthInspector.validateToken, FeedController.getFeedList);

export default feedRouter;
