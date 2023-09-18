const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");
const board = require("./boardRouter");
// const authRouter = require("./auth");
// const generateRouter = require("./generate");

router.use("/board", board);
router.use("/comment", comment);

// router.use("/auth", authRouter);
// router.use("/generate", generateRouter);

module.exports = router;
