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

  res.sendStatus(login);
});

module.exports = router;
