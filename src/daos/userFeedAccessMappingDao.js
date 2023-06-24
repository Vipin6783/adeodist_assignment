import Models from "../db";
import Dao from "./dao";

const { user_feed_access_mapping } = Models;

class UserFeedAccessMappingDao extends Dao {
  constructor() {
    super(user_feed_access_mapping);
  }

  bulkCreate = async (data) => {
    try {
      return await user_feed_access_mapping.bulkCreate(data);
    } catch (err) {
      throw err;
    }
  };
}

export default new UserFeedAccessMappingDao();
