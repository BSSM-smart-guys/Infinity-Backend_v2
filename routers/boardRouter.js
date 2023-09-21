const express = require("express");
const BoardService = require("../service/boardService");
const router = express.Router();

const boardService = new BoardService();

router.get("/", async (req, res) => {
  const result = await boardService.showAllBoard();

  return res.status(200).send(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await boardService.showOneBoard(id);
  if (result.length === 0) return res.sendStatus(404);

  res.status(200).send(result);
});

router.post("/", async (req, res) => {
  if (!req.session.loginData) return res.sendStatus(401);
  const boardDTO = req.body;
  boardDTO.userName = req.session.loginData.userName;
  const result = await boardService.InsertBoard(boardDTO);

  res.sendStatus(result);
});

router.put("/:id", async (req, res) => {
  if (!req.session.loginData) return res.sendStatus(401);
  const { id } = req.params;
  const boardDTO = req.body;
  const result = await boardService.modifyBoard(
    id,
    req.session.loginData.userName,
    boardDTO
  );
  res.sendStatus(result);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.session.loginData) return res.sendStatus(401);
  const userName = req.session.loginData.userName;
  const result = await boardService.deleteBoard(id, userName);

  res.sendStatus(result);
});
module.exports = router;
