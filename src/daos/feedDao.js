import Models from '../db';
import Dao from './dao';

const {feed} = Models;

class FeedDao extends Dao {
  constructor() {
    super(feed);
  }
}

export default new FeedDao();
