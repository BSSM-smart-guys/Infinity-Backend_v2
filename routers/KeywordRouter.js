const express = require("express");
const router = express.Router();
const db = require("../models/connection");

router.post("/", async (req, res) => {
  try {
    let { BoardId, keyword } = req.body;
    query = `insert into Keyword(BoardId, word) values(${BoardId},'${keyword}') `;
    await db.query(query);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.send(500);
  }
});
module.exports = router;
