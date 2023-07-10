const express = require("express");
const router = express.Router();
const util = require("util");
const db = require("../models/connection");

router.get("/logout", async (req, res) => {
  try {
    if (req.session.loginData) {
      req.session.loginData = null;
      res.json({ message: "success" });
    } else {
      res.json({ message: "fail" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/loginCheck", async (req, res) => {
  try {
    if (req.session.loginData != null) {
      res.send({ loggedIn: true, loginData: req.session.loginData });
    } else {
      res.send({ loggedIn: false });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

module.exports = router;
