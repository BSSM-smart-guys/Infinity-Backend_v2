require("dotenv").config();
const express = require("express");
const asyncify = require("express-asyncify").default;
const cors = require("cors");
const app = asyncify(express());
const router = require("./routers");
const db = require("./models");
const port = 3001;
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
app.use(cookieParser());
// app.set("trust proxy", 1);
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "secret",
//     proxy: true,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 5,
//       domain: "*",
//       store: new MemoryStore({
//         checkPeriod: 86400000,
//       }),
//       cookie: {
//         expires: 60 * 60 * 1000 * 24, // 쿠키 만료일 (60초 * 60분 * 24 = 1일)
//       },
//     },
//   })
// );
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", (err, req, res, next) => {
  var e = err;
  console.error(err.stack);
  res
    .status(err.status ?? 500)
    .json({ message: err.message ?? "Internal Server Error" });
});
app.use("/api", router);
app.use("/image", express.static("./public/images"));

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공 ");
  })
  .catch(console.error);

app.listen(port);
console.log("listening at " + "127.0.0.1:" + port);
