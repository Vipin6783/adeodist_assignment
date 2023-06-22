import Models from '../db';
import Dao from './dao';

const {role} = Models;

class RoleDao extends Dao {
  constructor() {
    super(role);
  }
}

export default new RoleDao();
