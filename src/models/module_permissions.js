import sequelize from "sequelize";
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "module_permissions",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "role",
          key: "id",
        },
      },
      permissions: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "module_permissions",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "fk_module_permissions_role_id_idx",
          using: "BTREE",
          fields: [{ name: "role_id" }],
        },
      ],
    }
  );
};
