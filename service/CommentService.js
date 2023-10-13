const { sequelize, Comment } = require("../models");

class CommentService {
  async showComment(boardId) {
    const result = await Comment.findAll({ where: { boardId } });
    return result;
  }

  async InsertComment(comment) {
    comment.created = sequelize.literal("NOW()");
    console.log(comment);
    await Comment.create(comment);

    return 200;
  }

  async modifyComment(commentId, userName, comments) {
    const [update] = await Comment.update(comments, {
      where: { commentId, userName },
    });
    if (update === 1) return 200;
    return 404;
  }

  async deleteComment(commentId) {
    await Comment.destroy({
      where: { commentId },
    });
    return 200;
  }
}

module.exports = CommentService;
