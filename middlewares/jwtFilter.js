const cors = require("cors");
const express = require("express");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MemoryStore = require("memorystore")(session);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    key: "loginData",
    secret: "testSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24, // 쿠키 만료일 (60초 * 60분 * 24 = 1일)
    },
  })
);

module.exports = app;
