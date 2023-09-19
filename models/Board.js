module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      boardId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        default: 1,
      },

      title: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      novel: {
        type: DataTypes.STRING(2000),
        allowNull: false,
      },

      character: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      event: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      background: {
        type: DataTypes.STRING(50),
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

      views: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
      },
    },
    {
      tableName: "Board",
      timeStamps: false,
    }
  );
  return Board;
};
