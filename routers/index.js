const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");
const board = require("./boardRouter");
const user = require("./userRouter");
const search = require("./searchRouter");
// const authRouter = require("./auth");
// const generateRouter = require("./generate");

router.use("/board", board);
router.use("/user", user);
router.use("/comment", comment);
router.use("/search", search);
// router.use("/auth", authRouter);
// router.use("/generate", generateRouter);

module.exports = router;
