const express = require("express");
const asyncify = require("express-asyncify").default;
const router = asyncify(express.Router());
const { callLaas } = require("../service/laas");
const { generateImage } = require("../service/karlo");

router.post("/novel", async (req, res) => {
  const result = await callLaas(req.body);
  res.status(200).json({ result: result });
});

router.post("/image", async (req, res) => {
  const result = await generateImage(req.body);
  res.status(200).json({ result: result });
});

module.exports = router;
