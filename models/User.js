const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userUniqueId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        default: 1,
      },
      userId: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "User",
      timestamps: false,
    }
  );
  return User;
};
