import { DataTypes } from "sequelize";

const _role = require("./role");
const _user = require("./user");
const _feed = require("./feed");
const _permissions = require("./permissions");
const _module_permissions = require("./module_permissions");
const _user_feed_access_mapping = require("./user_feed_access_mapping");

function initModels(sequelize) {
  const role = _role(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);
  const feed = _feed(sequelize, DataTypes);
  const permissions = _permissions(sequelize, DataTypes);
  const module_permissions = _module_permissions(sequelize, DataTypes);
  const user_feed_access_mapping = _user_feed_access_mapping(
    sequelize,
    DataTypes
  );

  role.belongsTo(user, {
    as: "role",
    foreignKey: "role_id",
  });
  user.hasMany(role, {
    as: "user_role",
    foreignKey: "role_id",
  });

  return {
    role,
    user,
    feed,
    permissions,
    module_permissions,
    user_feed_access_mapping
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
