module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      boardId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        default: 1,
      },
      comment: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      created: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      tableName: "Comment",
      timestamps: false,
    }
  );
  return Comment;
};
