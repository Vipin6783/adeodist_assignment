import {DataTypes} from "sequelize";

const _role = require("./role");
const _user = require("./user");
const _feed = require("./feed");

function initModels(sequelize) {
  const role = _role(sequelize, DataTypes);
  const user = _user(sequelize, DataTypes);
  const feed = _feed(sequelize, DataTypes);

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
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
