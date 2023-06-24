import Models from "../db";
import Dao from "./dao";

const { feed, user_feed_access_mapping } = Models;

class FeedDao extends Dao {
  constructor() {
    super(feed);
  }

  findAllByFeedIds = async (feedIds) => {
    try {
      return await feed.findAll({
        id:  feedIds ,
        raw: true,
      });
    } catch (err) {
      throw err;
    }
  };

  findAllByFeedIdsAndUserId = async (feedIds, userId) => {
    console.log('feedIds, userId =================== ', feedIds, userId);
    try {
      return await feed.findAll({
        where: { id: feedIds },
        include: [
          {
            model: user_feed_access_mapping,
            as: 'feeds_mapping',
            required: false,
            where: {user_id: userId}
          }
        ],
        raw: true,
      });
    } catch (err) {
      throw err;
    }
  };
}

export default new FeedDao();
