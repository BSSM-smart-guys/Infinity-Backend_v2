const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");
const board = require("./boardRouter");
const keyword = require("./KeywordRouter");

router.use("/board", board);
router.use("/comment", comment);
router.use("/keyword", keyword);

const authRouter = require("./auth");

router.use("/auth", authRouter);

module.exports = router;
