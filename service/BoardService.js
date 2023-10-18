const { Board, sequelize, Sequelize, Likes } = require("../models");
const fs = require("fs");
const { Op } = require("sequelize");
class BoardService {
  async showAllBoard() {
    const result = await Board.findAll({
      order: [["created", "DESC"]],
    });
    return result;
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
      return 500;
    }
  }

  async popularBoard() {
    try {
      const result = await Board.findAll({
        order: [["likes", "DESC"]],
      });
      return result;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async dateBoard() {
    try {
      const result = await Board.findAll({
        order: [["created"]],
      });
      return result;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async likeBoard(userUniqueId, boardId) {
    try {
      const likeCheck = await Likes.findAll({
        where: { boardId, userUniqueId },
      });
      console.log(likeCheck[0]?.dataValues);
      if (likeCheck.length === 0) {
        console.log("플러스 작업");
        await Board.increment("likes", {
          by: 1,
          where: { boardId },
        });
        await Likes.create({
          boardId,
          userUniqueId,
        });
        return 200;
      }

      console.log("마이너스작업");
      await Board.update(
        {
          likes: sequelize.literal("likes - 1"),
        },
        { where: { boardId } }
      );
      await Likes.destroy({
        where: { userUniqueId, boardId },
      });
      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
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
