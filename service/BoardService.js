const { Board, sequelize } = require("../models");

class BoardService {
  async showAllBoard() {
    try {
      const result = await Board.findAll();
      return result;
    } catch (err) {
      console.log(err);
      return 404;
    }
  }

  async showOneBoard(boardId) {
    try {
      await Board.increment("views", {
        by: 1,
        where: { boardId },
      });
      const result = await Board.findAll({ where: { boardId } });
      return result;
    } catch (err) {
      console.log(err);
      return 404;
    }
  }
  async InsertBoard(boardInfo) {
    try {
      const { title, novel, character, event, background, userName } =
        boardInfo;
      const result = await Board.create({
        title,
        novel,
        character,
        event,
        background,
        userName,
        created: sequelize.literal("NOW()"),
        views: 0,
        likes: 0,
      });
      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async modifyBoard(boardId, userName, boardInfo) {
    try {
      const info = await Board.findOne({ where: { boardId } });
      if (info.userName !== userName) return 401;
      const [updatedCount] = await Board.update(boardInfo, {
        where: { boardId, userName },
      });
      if (updatedCount === 1) {
        return 200;
      }
      return 404;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async deleteBoard(boardId, userName) {
    try {
      const info = await Board.findOne({ where: { boardId } });
      if (info.userName !== userName) return 401;
      await Board.destroy({
        where: {
          boardId,
          userName,
        },
      });
      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

module.exports = BoardService;
