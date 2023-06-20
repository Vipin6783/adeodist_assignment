import Models from '../db';
import Dao from './dao';

const {user} = Models;

class UserDao extends Dao {
  constructor() {
    super(user);
  }
}

export default new UserDao();
