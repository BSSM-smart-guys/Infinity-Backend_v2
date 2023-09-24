const express = require("express");
const UserService = require("../service/userService");
const router = express.Router();

const userService = new UserService();

router.post("/register", async (req, res) => {
  const userDTO = req.body;
  const User = await userService.register(userDTO);

  res.sendStatus(User);
});

router.post("/login", async (req, res) => {
  const userDTO = req.body;
  const login = await userService.login(userDTO);
  if (!login) return res.sendStatus(401);
  req.session.loginData = {
    userId: login.userId,
    userName: login.userName,
  };
  req.session.save();
  res.status(200).send(req.session.loginData);
});

router.get("/logincheck", async (req, res) => {
  if (!req.session.loginData) return res.status(404).send({ login: false });
  return res
    .status(200)
    .send({ login: true, loginData: req.session.loginData });
});
module.exports = router;
