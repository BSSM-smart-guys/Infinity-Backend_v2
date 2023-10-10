const express = require("express");
const BoardService = require("../service/boardService");
const router = express.Router();

const boardService = new BoardService();

router.get("/", async (req, res) => {
  const { title } = req.body;
  console.log(title);
  const result = await boardService.searchBoard(title);
  if (result === 404) return res.sendStatus(404);
  return res.status(200).send(result);
});

module.exports = router;
