const express = require("express");
const CommentService = require("../service/CommentService");
const router = express.Router();

const commentService = new CommentService();
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await commentService.showComment(id);

  return res.status(200).send(result);
});

router.post("/", async (req, res) => {
  const commentDTO = req.body;
  commentDTO.userName = req.session.loginData.userName;
  const result = await commentService.InsertComment(commentDTO);

  return res.sendStatus(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const commentDTO = req.body;
  const result = await commentService.modifyComment(
    id,
    req.session.loginData.userName,
    commentDTO
  );

  return res.sendStatus(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await commentService.deleteComment(id);

  return res.sendStatus(result);
});

module.exports = router;
