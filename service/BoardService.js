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

  async InsertBoard(boardInfo) {
    try {
      const result = await Board.create({
        title: boardInfo.title,
        novel: boardInfo.novel,
        character: boardInfo.character,
        event: boardInfo.event,
        background: boardInfo.background,
        userName: boardInfo.userName,
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
}

module.exports = BoardService;
