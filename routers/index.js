const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");
const board = require("./boardRouter");
const user = require("./userRouter");
const generateRouter = require("./GenerateRouter");
// const authRouter = require("./auth");
// const generateRouter = require("./generate");

router.use("/board", board);
router.use("/user", user);
router.use("/comment", comment);
router.use("/generate", generateRouter);
// router.use("/auth", authRouter);

module.exports = router;
