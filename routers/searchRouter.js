const express = require("express");
const BoardService = require("../service/BoardService");
const asyncify = require("express-asyncify").default;
const router = asyncify(express.Router());

const boardService = new BoardService();

router.get("/", async (req, res) => {
  try {
    const { title } = req.query; // 변경: query string에서 "title" 파라미터를 추출
    const result = await boardService.searchBoard(title);
    if (result === 404) return res.sendStatus(404);

    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json("Internal Server Error"); // 변경: 오류 응답을 보내도록 수정
  }
});

module.exports = router;
