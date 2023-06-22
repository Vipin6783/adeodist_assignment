import FeedDao from "../../daos/feedDao";
import UserFeedAccessMappingDao from "../../daos/userFeedAccessMappingDao";
import { PERMISSIONS, ROLES } from "../../utils/appConstant";

class FeedService {
  createFeed = async ({ name, url, description, feedPermissions }) => {
    if (!feedPermissions.includes(PERMISSIONS.CREATE)) {
      throw new Error("No permission to create feeds");
    }

    if (!name || !url || !description) {
      throw new Error("All fields are mandatory");
    }

    const feedRef = await FeedDao.create({ name, url, description });

    return { message: "feed created successfully", feedId: feedRef.id };
  };

  getFeedList = async () => {
    const feedRef = await FeedDao.findAll();
    const feedRecords = [];
    feedRef.map(({ id, name, url, description }) => {
      feedRecords.push({
        userId: id,
        name,
        url,
        description,
      });
    });
    return feedRecords;
  };

  getFeedById = async (feedId) => {
    const feedRef = await FeedDao.findOne({ id: feedId });
    if (!feedRef) {
      throw new Error("Invalid feed id");
    }
    const feedRecords = [];
    // feedRef.map(({ id, name, url, description }) => {
    //   feedRecords.push({
    //     userId: id,
    //     name,
    //     url,
    //     description,
    //   });
    // });
    return feedRecords;
  };

  updateFeed = async ({ name, url, description, feedId, feedPermissions }) => {
    if (!feedPermissions.includes(PERMISSIONS.UPDATE)) {
      throw new Error("No permission to update feeds");
    }
    console.log("feedId ========================== ", feedId);
    const feedRef = await FeedDao.findOne({ id: feedId });
    if (!feedRef) {
      throw new Error("Invalid feed id");
    }
    const data = {};
    if (name) {
      data.name = name;
    }
    if (url) {
      data.url = url;
    }
    if (description) {
      data.description = description;
    }

    console.log("data ================== ", data);
    if (Object.keys(data).length < 1) {
      throw new Error("Invalid feed update request");
    }
    await FeedDao.update(data, { id: feedId });

    return { message: "Feed updated successfully" };
  };

  deleteFeed = async (feedId, loggedInUserId, loggedInRoleId) => {
    if (loggedInRoleId != ROLES.SUPER_ADMIN) {
      const feedAccess = await UserFeedAccessMappingDao.findOne({
        user_id: loggedInUserId,
        feed_id: feedId,
      });

      if (!feedAccess || (feedAccess && feedAccess.can_delete != true)) {
        throw new Error("You have not access for this feed");
      }
    }
    const feedRef = await FeedDao.findOne({ id: feedId });
    if (!feedRef) {
      throw new Error("Invalid feed id");
    }
    await FeedDao.destroy({ id: feedId });

    return { message: "Feed deleted successfully" };
  };
}

export default new FeedService();
