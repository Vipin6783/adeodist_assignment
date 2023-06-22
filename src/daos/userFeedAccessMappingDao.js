import Models from "../db";
import Dao from "./dao";

const { user_feed_access_mapping } = Models;

class UserFeedAccessMappingDao extends Dao {
  constructor() {
    super(user_feed_access_mapping);
  }
}

export default new UserFeedAccessMappingDao();
