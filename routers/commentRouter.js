const express = require("express");
const CommentService = require("../service/CommentService");
const router = express.Router();

const commentService = new CommentService();
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await commentService.showComment(id);

  return res.status(200).json(result);
});

router.post("/", async (req, res) => {
  const commentDTO = req.body;
  const { userUniqueId, userName, userProfileImage } = req.session.loginData;
  commentDTO.userUniqueId = userUniqueId;
  commentDTO.userName = userName;
  commentDTO.userProfileImage = userProfileImage;
  const result = await commentService.InsertComment(commentDTO);

  return res.sendStatus(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { userUniqueId } = req.session.loginData;
  const commentDTO = req.body;
  const result = await commentService.modifyComment(
    id,
    userUniqueId,
    commentDTO
  );

  return res.sendStatus(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await commentService.deleteComment(
    id,
    req.session.loginData.userUniqueId
  );

  return res.sendStatus(result);
});

module.exports = router;
