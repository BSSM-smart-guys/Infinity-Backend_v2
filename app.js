require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routers");
const db = require("./models");

const port = 3000;
app.use(
  cors({
    origin: "*",
    credentials: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공 ");
  })
  .catch(console.error);

app.listen(port);
console.log("listening at " + "127.0.0.1:" + port);
