const jwt = require("jsonwebtoken");

const jwtException = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyResult = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json("success");
  } catch (error) {
    return res.status(401).json({ error: "Invalid or Not exsit token" });
  }
  next();
};

module.exports = jwtException;
