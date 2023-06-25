import FeedService from "./feed.service";
import logger from "../../utils/logger";
class FeedController {
  createFeed = async (req, res, next) => {
    try {
      const {
        body: { name, url, description },
        modulePermissions,
      } = req;
      const result = await FeedService.createFeed({
        name,
        url,
        description,
        modulePermissions,
      });

      logger.log(`response$>>> ${JSON.stringify(result)}`);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getFeedList = async (req, res, next) => {
    try {
      const { loggedInUserId, loggedInRoleId, modulePermissions } = req;
      const result = await FeedService.getFeedList(
        loggedInUserId,
        loggedInRoleId,
        modulePermissions
      );

      logger.log(`response$>>> ${JSON.stringify(result)}`);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getFeedDetail = async (req, res, next) => {
    const {
      params: { feedId },
      loggedInUserId,
      loggedInRoleId,
      modulePermissions,
    } = req;
    try {
      const result = await FeedService.getFeedDetail({
        feedId,
        loggedInUserId,
        loggedInRoleId,
        modulePermissions,
      });

      logger.log(`response$>>> ${JSON.stringify(result)}`);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  updateFeed = async (req, res, next) => {
    try {
      const {
        body: { name, url, description },
        params: { feedId },
        modulePermissions,
      } = req;

      const result = await FeedService.updateFeed({
        name,
        url,
        description,
        feedId,
        modulePermissions,
      });

      logger.log(`response$>>> ${JSON.stringify(result)}`);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  deleteFeed = async (req, res, next) => {
    try {
      const {
        params: { feedId },
        loggedInUserId,
        loggedInRoleId,
      } = req;
      const result = await FeedService.deleteFeed(
        feedId,
        loggedInUserId,
        loggedInRoleId
      );

      logger.log(`response$>>> ${JSON.stringify(result)}`);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  provideFeedAccess = async (req, res, next) => {
    try {
      const {
        body: { userId, feedIds },
        modulePermissions,
        loggedInUserId,
        loggedInRoleId,
      } = req;
      const result = await FeedService.provideFeedAccess({
        userId,
        feedIds,
        modulePermissions,
        loggedInUserId,
        loggedInRoleId,
      });

      logger.log(`response$>>> ${JSON.stringify(result)}`);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  provideFeedDeleteAccess = async (req, res, next) => {
    try {
      const {
        body: { userId, feedIds, canDelete },
        modulePermissions,
        loggedInUserId,
        loggedInRoleId,
      } = req;

      const result = await FeedService.provideFeedDeleteAccess({
        userId,
        feedIds,
        canDelete,
        modulePermissions,
        loggedInUserId,
        loggedInRoleId,
      });

      logger.log(`response$>>> ${JSON.stringify(result)}`);

      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new FeedController();
