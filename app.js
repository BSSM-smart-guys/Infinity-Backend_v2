const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MemoryStore = require("memorystore")(session);
const mid = require("./middlewares/jwtFilter");

const router = require("./routers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mid);

app.use("/api", router);

app.listen(3000);
