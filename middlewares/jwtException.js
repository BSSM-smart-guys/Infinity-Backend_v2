const jwt = require("jsonwebtoken");

const jwtException = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Invalid token");
        return res.status(401).json({ error: "Invalid token" });
      }
    });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid or Not exsit token" });
  }
};

module.exports = jwtException;
