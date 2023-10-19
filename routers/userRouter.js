const express = require("express");
const UserService = require("../service/userService");
const asyncify = require("express-asyncify").default;
const router = asyncify(express.Router());

const userService = new UserService();

router.post("/register", async (req, res) => {
  const userDTO = req.body;
  console.log(userDTO);
  const random = Math.floor(Math.random() * 12) + 1;
  userDTO.userProfileImage = random;
  const User = await userService.register(userDTO);

  res.sendStatus(User);
});

const options = {
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  sameSite: "None",
};

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

  res
    .status(200)
    .cookie("ssibal", req.session.loginData, options)
    .json(req.session.loginData);
});

router.get("/logincheck", async (req, res) => {
  const { loginData } = req.session;
  if (!loginData) return res.status(200).json({ login: false });

  return res.status(200).json({ login: true, loginData });
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  return res.sendStatus(200);
});

module.exports = router;
