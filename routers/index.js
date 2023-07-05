const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const generateRouter = require("./generate");

router.use("/auth", authRouter);
router.use("/generate", generateRouter);

module.exports = router;
