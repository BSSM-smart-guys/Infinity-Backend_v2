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
  let { loginData, tempImageData } = req.session;
  if (!loginData) return res.sendStatus(401);
  if (!tempImageData) req.session.tempImageData = [];

  const userName = loginData.userName;
  let userTempData = tempImageData.find(v => v.userName === userName);

  if (!userTempData) {
    userTempData = { userName: userName, data: [] };
    tempImageData.push(userTempData);
  }

  const result = await generateImage(req.body);

  userTempData.data.push(result.fileName);

  req.session.save();

  res.status(200).json({ result: result });
});

module.exports = router;
