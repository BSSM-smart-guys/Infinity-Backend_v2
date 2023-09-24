const { sequelize, Comment, Board } = require("../models");

class CommentService {
  async showComment(boardId) {
    try {
      const result = await Comment.findAll({ where: { boardId } });
      return result;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async InsertComment(comment) {
    try {
      comment.created = sequelize.literal("NOW()");
      console.log(comment);
      await Comment.create(comment);

      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async modifyComment(commentId, userName, comments) {
    try {
      const info = await Comment.findOne({ where: { commentId } });
      if (info.userName !== userName) return 401;
      const [update] = await Comment.update(comments, {
        where: { commentId, userName },
      });
      if (update === 1) return 200;
      return 404;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }

  async deleteComment(commentId) {
    try {
      await Comment.destroy({
        where: { commentId },
      });
      return 200;
    } catch (err) {
      console.log(err);
      return 500;
    }
  }
}

module.exports = CommentService;
