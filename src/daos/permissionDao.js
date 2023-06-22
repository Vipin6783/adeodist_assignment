import Models from '../db';
import Dao from './dao';

const {permissions} = Models;

class PermissionsDao extends Dao {
  constructor() {
    super(permissions);
  }
}

export default new PermissionsDao();
