import sequelize from "sequelize";
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "user_feed_access_mapping",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "user",
          key: "id",
        },
      },
      feed_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "feed",
          key: "id",
        },
      },
      can_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "user_feed_access_mapping",
      timestamps: true,
      paranoid: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_admin_feed_access_mapping_user_idx",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
        {
          name: "fk_admin_feed_access_mapping_feed_idx",
          using: "BTREE",
          fields: [{ name: "feed_id" }],
        },
      ],
    }
  );
};
