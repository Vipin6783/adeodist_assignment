import FeedService from "./feed.service";

class FeedController {
  createFeed = async (req, res, next) => {
    try {
      const {
        body: { name, url, description },
        feedPermissions,
      } = req;
      const result = await FeedService.createFeed({
        name,
        url,
        description,
        feedPermissions,
      });
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getFeedList = async (req, res, next) => {
    try {
      const result = await FeedService.getFeedList();
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getFeedById = async (req, res, next) => {
    try {
      const result = await FeedService.getFeedById();
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
        feedPermissions,
      } = req;

      const result = await FeedService.updateFeed({
        name,
        url,
        description,
        feedId,
        feedPermissions,
      });
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
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new FeedController();
