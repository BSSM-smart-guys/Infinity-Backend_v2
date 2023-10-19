const express = require("express");
const UserService = require("../service/userService");
const asyncify = require("express-asyncify").default;
const router = asyncify(express.Router());

const userService = new UserService();

router.post("/register", async (req, res) => {
  const userDTO = req.body;
  const random = Math.floor(Math.random() * 12) + 1;
  userDTO.userProfileImage = random;
  const User = await userService.register(userDTO);

  res.sendStatus(User);
});

router.post("/login", async (req, res) => {
  const userDTO = req.body;
  const login = await userService.login(userDTO);
  if (!login) return res.sendStatus(401);
  const { userUniqueId, userId, userName, userProfileImage } = login;
  req.session.loginData = {
    userUniqueId,
    userId,
    userName,
    userProfileImage,
  };
  req.session.save();

  res.status(200).json(req.session.loginData);
});

router.get("/logincheck", async (req, res) => {
  const { loginData } = req.session;
  if (!loginData) return res.status(404).send({ login: false });

  return res.status(200).send({ login: true, loginData });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  return res.sendStatus(200);
});

module.exports = router;
