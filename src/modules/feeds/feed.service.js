import FeedDao from "../../daos/feedDao";
import UserFeedAccessMappingDao from "../../daos/userFeedAccessMappingDao";
import { PERMISSIONS, ROLES } from "../../utils/appConstant";
import UserDao from "../../daos/userDao";

class FeedService {
  createFeed = async ({ name, url, description, modulePermissions }) => {
    const feedPermissions = modulePermissions.feed;
    if (!feedPermissions.includes(PERMISSIONS.CREATE)) {
      throw new Error("No permission to create feeds");
    }

    if (!name || !url || !description) {
      throw new Error("All fields are mandatory");
    }

    const feedRef = await FeedDao.create({ name, url, description });

    return { message: "Feed created successfully", feedId: feedRef.id };
  };

  getFeedList = async (loggedInUserId, loggedInRoleId, modulePermissions) => {
    let feeds;
    const feedRecords = [];
    let feedAccess;
 
    if (loggedInRoleId == ROLES.SUPER_ADMIN) {
      feeds = await FeedDao.findAll();
    } else {
      feedAccess = await UserFeedAccessMappingDao.findAll({
        user_id: loggedInUserId,
      });

      if (!feedAccess || feedAccess.length < 1) {
        throw new Error("You have not access of any feed");
      }
      const feedIds = [];
      feedAccess.map(({ feed_id }) => {
        feedIds.push(feed_id);
      });
      feeds = await FeedDao.findAll({ id: feedIds });
    }
    if (!feeds || feeds.length < 1) {
      throw new Error("No feed found");
    }
    feeds.map(({ id, name, url, description }) => {
      feedRecords.push({
        feedId: id,
        name,
        url,
        description,
        canDelete: feedAccess
          ? feedAccess.can_delete == true
            ? true
            : false
          : true,
      });
    });

    return { feedRecords, permissions: modulePermissions.feed };
  };

  getFeedDetail = async ({
    feedId,
    loggedInUserId,
    loggedInRoleId,
    modulePermissions,
  }) => {
    const feedRef = await FeedDao.findOne({ id: feedId });
    const { id, name, url, description } = feedRef;
    let feedAccess;
    if (loggedInRoleId != ROLES.SUPER_ADMIN) {
      feedAccess = await UserFeedAccessMappingDao.findOne({
        user_id: loggedInUserId,
        feed_id: feedId,
      });
    }

    return {
      feedId: id,
      name,
      url,
      description,
      canDelete: feedAccess
        ? feedAccess.can_delete == true
          ? true
          : false
        : true,
      permissions: modulePermissions.feed,
    };
  };

  updateFeed = async ({
    name,
    url,
    description,
    feedId,
    modulePermissions,
  }) => {
    const feedPermissions = modulePermissions.feed;

    if (!feedPermissions.includes(PERMISSIONS.UPDATE)) {
      throw new Error("No permission to update feeds");
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

      if (feedAccess.can_delete != true) {
        throw new Error("You have not access for this feed");
      }
    }

    await FeedDao.destroy({ id: feedId });

    return { message: "Feed deleted successfully" };
  };

  provideFeedAccess = async ({
    userId,
    feedIds,
    modulePermissions,
    loggedInUserId,
    loggedInRoleId,
  }) => {
    const feedPermissions = modulePermissions.feed;
    if (!feedPermissions.includes(PERMISSIONS.MODIFY_PERMISSIONS)) {
      throw new Error("No permission to provide feed access");
    }

    const userRef = await UserDao.findOne({ id: userId });
    if (!userRef) {
      throw new Error("Invalid user id");
    }

    if (loggedInUserId == userId || userRef.role_id == loggedInRoleId) {
      throw new Error("Invalid Request to provide feed access");
    } else if (loggedInRoleId == ROLES.BASIC_USER) {
      throw new Error("Basic user cannot provide feed access to any one");
    } else if (
      loggedInRoleId == ROLES.ADMIN &&
      userRef.role_id != ROLES.BASIC_USER
    ) {
      throw new Error(
        "Admin user cannot provide feed access to any one accept basic user"
      );
    }

    if (!Array.isArray(feedIds) || feedIds.length < 1) {
      throw new Error("Feed ids should be an array with at least one item");
    }

    const feedRecords = await FeedDao.findAllByFeedIdsAndUserId(
      feedIds,
      userId
    );
    const data = [];
    for (let i = 0; i < feedRecords.length; i++) {
      const userFeedAccessMappingId = feedRecords[i]["feeds_mapping.id"];

      if (!userFeedAccessMappingId) {
        data.push({
          user_id: userId,
          feed_id: feedRecords[i].id,
        });
      }
    }

    if (data.length > 0) {
      await UserFeedAccessMappingDao.bulkCreate(data);
    }

    return { message: "Feed access provided successfully" };
  };

  provideFeedDeleteAccess = async ({
    userId,
    feedIds,
    canDelete,
    modulePermissions,
    loggedInUserId,
    loggedInRoleId,
  }) => {
    const feedPermissions = modulePermissions.feed;

    if (!feedPermissions.includes(PERMISSIONS.MODIFY_PERMISSIONS)) {
      throw new Error("No permission to provide feed access");
    }

    const userRef = await UserDao.findOne({ id: userId });
    if (!userRef) {
      throw new Error("Invalid user id");
    }

    if (loggedInUserId == userId || userRef.role_id == loggedInRoleId) {
      throw new Error("Invalid Request to provide delete feed access");
    } else if (loggedInRoleId == ROLES.BASIC_USER) {
      throw new Error(
        "Basic user cannot provide delete feed access to any one"
      );
    } else if (
      loggedInRoleId == ROLES.ADMIN &&
      userRef.role_id != ROLES.BASIC_USER
    ) {
      throw new Error(
        "Admin user cannot provide delete feed access to any one accept basic user"
      );
    }

    if (!Array.isArray(feedIds) || feedIds.length < 1) {
      throw new Error("Feed ids should be an array with at least one item");
    }

    if (typeof canDelete != "boolean") {
      throw new Error("Invalid value of canDelete");
    }

    const feedAccess = await UserFeedAccessMappingDao.findAll({
      user_id: userId,
      feed_id: feedIds,
    });
    const feedAccessIds = [];
    for (let i = 0; i < feedAccess.length; i++) {
      feedAccessIds.push(feedAccess[i].id);
    }

    if (feedAccessIds.length > 0) {
      await UserFeedAccessMappingDao.update(
        { can_delete: canDelete },
        { id: feedAccessIds }
      );
    }

    return { message: "Feed delete access provided successfully" };
  };
}

export default new FeedService();
