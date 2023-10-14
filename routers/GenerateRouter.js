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
  if (!req.session.loginData) return res.sendStatus(401);
  if (!req.session.tempImageData) req.session.tempImageData = [];

  const userName = req.session.loginData.userName;
  let userTempData = req.session.tempImageData.find(v => v.userName === userName);

  if (!userTempData) {
    userTempData = { userName: userName, data: [] };
    req.session.tempImageData.push(userTempData);
  }

  const result = await generateImage(req.body);

  userTempData.data.push(result.fileName);

  req.session.save();
  console.log(req.session.tempImageData);
  res.status(200).json({ result: result });
});

module.exports = router;
