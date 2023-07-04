const express = require("express");
const app = express();

require("dotenv").config();

const router = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(3000);
