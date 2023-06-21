import FeedService from "./feed.service";

class FeedController {
  getFeedList = async (req, res, next) => {
    try {
      const { userId, roleId } = req;
      const result = await FeedService.getFeedList(userId, roleId);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default new FeedController();
