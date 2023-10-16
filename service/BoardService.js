const { Board, sequelize } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
class BoardService {
  async showAllBoard() {
    const result = await Board.findAll();
    return result;
  }

  async showOneBoard(boardId) {
    await Board.increment("views", {
      by: 1,
      where: { boardId },
    });
    const result = await Board.findAll({ where: { boardId } });
    return result;
  }
  async InsertBoard(boardInfo) {
    const {
      title,
      novel,
      character,
      event,
      background,
      userUniqueId,
      userName,
      image,
      tempImage,
    } = boardInfo;
    const saveImage = fs.readFileSync("public/images/temp/" + image);
    await tempImage.map((v) => fs.unlinkSync(`public/images/temp/${v}`));
    if (!fs.existsSync("public/images/release"))
      fs.mkdirSync("public/images/release");
    fs.writeFileSync("public/images/release/" + image, saveImage);
    const imageLocation = "/image/release/" + image;
    try {
      await Board.create({
        title,
        novel,
        character,
        event,
        background,
        userUniqueId,
        userName,
        image: imageLocation,
        created: sequelize.literal("NOW()"),
        views: 0,
        likes: 0,
      });
    } catch (err) {
      console.log(err);
      return 500;
    }
    return 200;
  }

  async searchBoard(title) {
    const result = await Board.findAll({
      where: {
        title: {
          [Op.like]: `%${title}%`,
        },
      },
    });
    return result;
  }

  async modifyBoard(boardId, userName, boardInfo) {
    const [updatedCount] = await Board.update(boardInfo, {
      where: { boardId, userName },
    });
    if (updatedCount === 1) {
      return 200;
    }
  }

  async deleteBoard(boardId, userName) {
    await Board.destroy({
      where: {
        boardId,
        userName,
      },
    });
    return 200;
  }
}

module.exports = BoardService;
