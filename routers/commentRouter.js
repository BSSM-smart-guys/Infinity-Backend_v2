const express = require("express");
const router = express.Router();
const db = require("../models/connection");

router.get("/:id", async (req, res) => {
  let { id } = req.params;
  query = `select * from Comment where BoardId = ${id}`;
  [sql] = await db.query(query);
  res.send(sql);
});

router.get("/reply/:id", async (req, res) => {
  let { id } = req.params;
  query = `select * from ReplyComment where commentId = ${id}`;
  [sql] = await db.query(query);
  res.send(sql);
});

router.post("/insert", async (req, res) => {
  try {
    let { BoardId, comment, userName } = req.body;
    query = `insert into Comment(BoardId, comment, userName, created ) values(${BoardId}, '${comment}', '${userName}', now())`;
    sql = await db.query(query);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});

router.post("/insertReply", async (req, res) => {
  try {
    let { commentId, userName, comment } = req.body;
    query = `insert into ReplyComment values(${commentId}, '${userName}', '${comment}', now())`;
    sql = await db.query(query);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});
module.exports = router;
