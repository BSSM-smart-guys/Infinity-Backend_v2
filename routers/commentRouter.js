const express = require("express");
const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    const query = `select * from Comment where BoardId = ${id}`;
    const [sql] = await db.query(query);
    return res.json(sql);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
});

router.get("/reply/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const query = `select * from ReplyComment where commentId = ${id}`;
    const [sql] = await db.query(query);
    return res.json(sql);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
});

router.post("/", async (req, res) => {
  try {
    let { BoardId, comment, userName } = req.body;
    const query = `insert into Comment(BoardId, comment, userName, created ) values(${BoardId}, '${comment}', '${userName}', DATE_ADD(NOW(), INTERVAL 9 HOUR))`;
    const sql = await db.query(query);
    return res.status(200);
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
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
