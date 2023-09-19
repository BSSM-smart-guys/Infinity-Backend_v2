const express = require("express");
const BoardService = require("../service/boardService");
const router = express.Router();

const boardService = new BoardService();

router.get("/", async (req, res) => {
  const result = await boardService.showAllBoard();
  return res.status(200).send(result);
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    query = `SELECT * FROM Board WHERE BoardId = ${id}`;
    viewQuery = `update Board set views = views + 1 where BoardId = ${id}`;
    [sql] = await db.query(query);
    db.query(viewQuery);
    res.json(sql);
  } catch (e) {
    res.status(500).send("돌아가.");
    console.log(e);
  }
});

router.post("/", async (req, res) => {
  try {
    let { title, content, username, keywords } = req.body;
    query = `insert into Board(title, content, username, created, views, keywords) values ('${title}', '${content}', '${username}', now(), 0, '${keywords}')`;
    sql = await db.query(query);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.put("/", async (req, res) => {
  try {
    let { title, content } = req.body;
    query = `update Board set title = '${title}', content = '${content}'`;
    sql = await db.query(query);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;

    query = `delete from Board where boardId = ${id}`;
    sql = await db.query(query);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});
module.exports = router;
