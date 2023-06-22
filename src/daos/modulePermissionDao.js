import Models from '../db';
import Dao from './dao';

const {module_permissions} = Models;

class ModulePermissionDao extends Dao {
  constructor() {
    super(module_permissions);
  }
}

export default new ModulePermissionDao();
