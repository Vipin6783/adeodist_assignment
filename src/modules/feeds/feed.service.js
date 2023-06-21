import FeedDao from "../../daos/feedDao";

class FeedService {
  getFeedList = async (userId, roleId) => {
    const feedRef = await FeedDao.findAll();
    const feedRecord = [];
    feedRef.map(({ id, name, url, description }) => {
      feedRecord.push({
        userId: id,
        name,
        url,
        description,
      });
    });
    return feedRecord;
  };
}

export default new FeedService();
