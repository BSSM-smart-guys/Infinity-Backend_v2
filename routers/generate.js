// const express = require("express");
// const router = express.Router();
// const { Configuration, OpenAIApi } = require("openai");
// const jwt = require("jsonwebtoken");
// const db = require("../models/connection");
// const jwtFilter = require("../middlewares/jwtFilter");

// const configuration = new Configuration({
//   apiKey: process.env.CHATGPT_API_KEY,
// });

// router.post("/", async (req, res) => {
//   const { keywords } = req.body;
//   const question = `${keywords} 이 키워드를 활용해서 소설을 써줘. 글자 수는 200자 내로 해줘. 특수기호는 포함하지 않고 한글로만 작성해줘.`;

//   try {
//     const openai = new OpenAIApi(configuration);

//     const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: question }],
//     });

//     return res.json(response.data.choices[0].message);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "OpenAI Server Error" });
//   }
// });

// router.post("/save", jwtFilter, async (req, res) => {
//   //생성 날짜, 작성자
//   const { title, content, keywords } = req.body;
//   const token = req.headers.authorization.split(" ")[1];
//   const id = jwt.decode(token);
//   let writer;
//   try {
//     const [author] = await db.query(
//       `SELECT UserName FROM user WHERE UserId = ${id.id}`
//     );
//     writer = author;
//   } catch (error) {
//     console.error(error);
//     return res.json({ error: "유저가 없음" });
//   }

//   try {
//     const query = await db.query(
//       `INSERT INTO Board(title, Content, UserName, created, views, keywords) VALUES('${title}', '${content}', '${writer[0].UserName}', DATE_ADD(NOW(), INTERVAL 9 HOUR), 0, '${keywords.keywords}')`
//     );
//     return res.json("success");
//   } catch (error) {
//     console.error(error);
//     return res.json({ error: "sql 에러" });
//   }
// });

// module.exports = router;
