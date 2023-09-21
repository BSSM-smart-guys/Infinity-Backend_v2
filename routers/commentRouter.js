const express = require("express");
const CommentService = require("../service/CommentService");
const router = express.Router();

const commentService = new CommentService();
router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const result = await commentService.showComment(id);
    return res.status(200).send(result);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
});

router.post("/", async (req, res) => {
  const commentDTO = req.body;
  commentDTO.userName = req.session.loginData.userName;
  const result = await commentService.InsertComment(commentDTO);
  return res.sendStatus(result);
});

router.post("/insertReply", async (req, res) => {
  try {
    let { commentId, userName, comment } = req.body;
    query = `insert into ReplyComment values(${commentId}, '${userName}', '${comment}', now())`;
    sql = await db.query(query);
    return res.send(200);
  } catch (e) {
    console.log(e);
    return res.send(500);
  }
});
module.exports = router;
