const jwt = require("jsonwebtoken");

const jwtException = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // jwt.verify()를 프로미스로 래핑하여 사용하도록 변경
    await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log("Invalid token");
          // 에러가 발생하면 reject() 호출
          reject(err);
        } else {
          // 에러가 발생하지 않으면 resolve() 호출
          resolve(decoded);
        }
      });
    });
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid or Non-existent token" });
  }
};

module.exports = jwtException;
