import FeedDao from "../daos/feedDao";
import UserFeedAccessMappingDao from "../daos/userFeedAccessMappingDao";
import { ROLES } from "../utils/appConstant";

const feedMiddleware = async (req, res, next) => {
  try {
    const {
      loggedInUserId,
      loggedInRoleId,
      params: { feedId },
    } = req;
   
    if (loggedInRoleId != ROLES.SUPER_ADMIN && feedId) {
      
      const feedRef = await FeedDao.findOne({ id: feedId });
      if (!feedRef) {
        next(new Error("Invalid feed Id"));
      }

      const feedAccess = await UserFeedAccessMappingDao.findOne({
        user_id: loggedInUserId,
        feed_id: feedId,
      });

      if (!feedAccess) {
        next(new Error("You have not access for this feed"));
      }
      next();
    }
    next();
  } catch (err) {
    next(err);
  }
};

export default feedMiddleware;
