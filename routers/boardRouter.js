const express = require("express");
const BoardService = require("../service/BoardService");
const asyncify = require("express-asyncify").default;
const router = asyncify(express.Router());

const boardService = new BoardService();

router.get("/", async (req, res) => {
  const result = await boardService.showAllBoard();

  return res.status(200).json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await boardService.showOneBoard(id);
  if (result.length === 0) return res.sendStatus(404);

  res.status(200).json(result);
});
router.get("/method/popular", async (req, res) => {
  const result = await boardService.popularBoard();
  return res.json(result);
});

router.get("/method/date", async (req, res) => {
  const result = await boardService.dateBoard();
  return res.json(result);
});

// router.get("/like/:id", async (req, res) => {
//   const { id } = req.params;
//   const result = await boardService.likeBoard(loginData.userUniqueId, id);
// });

router.post("/", async (req, res) => {
  const boardDTO = req.body;
  const random = Math.floor(Math.random() * 12) + 1;
  boardDTO.userProfileImage = random;
  console.log(boardDTO);
  const result = await boardService.InsertBoard(boardDTO);
  res.sendStatus(result);
});

// router.put("/:id", async (req, res) => {
//   const { loginData } = req.session;
//   if (!loginData) return res.sendStatus(401);
//   const { id } = req.params;
//   const boardDTO = req.body;
//   const result = await boardService.modifyBoard(
//     id,
//     loginData.userName,
//     boardDTO
//   );

//   res.sendStatus(result);
// });

// router.delete("/:id", async (req, res) => {
//   try {
//     const { loginData } = req.session;
//     const { id } = req.params;
//     if (!loginData) return res.sendStatus(401);
//     const userUniqueId = loginData.userUniqueId;
//     const result = await boardService.deleteBoard(id, userUniqueId);

//     res.sendStatus(result);
//   } catch (err) {
//     console.log(err);
//     return 500;
//   }
// });
module.exports = router;
