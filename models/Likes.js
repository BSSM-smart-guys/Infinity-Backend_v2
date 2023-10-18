module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    "Likes",
    {
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userUniqueId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "Likes",
      timestamps: false,
    }
  );
  return Likes;
};
