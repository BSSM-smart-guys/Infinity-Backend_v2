const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.CHATGPT_API_KEY,
});

router.get("/", async (req, res) => {
  // const keywords = req.body.kewords;
  const keywords = ["안녕", "암흑", "귀신"];
  const question =
    keywords + " 이 키워드를 활용해서 소설을 써줘. 글자 수는 300자 내로 해줘.";

  try {
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    return res.json(response.data.choices[0].message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "OpenAI Server Error" });
  }
});

module.exports = router;
