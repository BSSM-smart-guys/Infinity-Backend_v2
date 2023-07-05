const express = require("express");
const router = express.Router();
const db = require("../models/connection");
const jwt = require("jsonwebtoken");
const { BsmOauth, BsmOauthError, BsmOauthErrorType } = require("bsm-oauth");
const bsmOauth = new BsmOauth(
  process.env.BSM_AUTH_CLIENT_ID,
  process.env.BSM_AUTH_CLIENT_SECRET
);

router.get("/login", async (req, res) => {
  const authCode = req.query.code;
  const { userCode, nickname } = await getUserInfo(res, authCode);

  try {
    const [verifyResult] = await db.query(
      `SELECT * FROM user WHERE UserId = ${userCode} AND UserName = '${nickname}'`
    );

    const accessToken = jwt.sign(
      {
        id: userCode,
        exp: Math.floor(Date.now() / 1000) + 60 * 30, // 10분
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({ accessToken: accessToken });
  } catch (error) {
    console.log(error);
    await db.query(`INSERT INTO user VALUES(${userCode}, '${nickname}')`);
    res.status(200).json("success");
  }

  res.status(200);
});

const getUserInfo = async (res, authCode) => {
  try {
    // 인증코드로 토큰 발급
    const token = await bsmOauth.getToken(authCode);

    // 토큰으로 유저 정보 가져오기
    const resource = await bsmOauth.getResource(token);

    // res.status(200).json(resource);
    return resource;
  } catch (error) {
    if (error instanceof BsmOauthError) {
      if (error.type === BsmOauthErrorType.INVALID_CLIENT) {
        // 클라이언트 정보가 잘못되었을 때
        return res.json("Invalid client information");
      }
      if (error.type === BsmOauthErrorType.AUTH_CODE_NOT_FOUND) {
        // 인증코드를 찾을 수 없을 때
        return res.json("Not found authorization code");
      }
      if (error.type === BsmOauthErrorType.TOKEN_NOT_FOUND) {
        // 토큰을 찾을 수 없을 때
        return res.json("Not found access token");
      } else {
        return res.json("unknown error");
      }
    }
  }
};

module.exports = router;
