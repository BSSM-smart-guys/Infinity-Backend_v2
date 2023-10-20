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
      keyword: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      userName: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      userProfileImage: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },

      views: {
        type: DataTypes.INTEGER,
        default: 0,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "Board",
      timestamps: false,
    }
  );
  return Board;
};
