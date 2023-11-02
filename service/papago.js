const { naver } = require("../config");
const axios = require("axios");

const translate = async (keywords) => {
  let translated = {};
  for (let [k, v] of Object.entries(keywords)) {
    translated[k] = await callPapago(v.toString());
  }
  return translated;
};

const callPapago = (contents) => {
  const headers = {
    headers: {
      "X-Naver-Client-Id": naver.clientId,
      "X-Naver-Client-Secret": naver.clientSecret,
    },
  };

  const body = {
    source: "ko",
    target: "en",
    text: JSON.stringify(contents),
  };

  return axios
    .post(naver.url, body, headers)
    .then((res) => {
      return res.data.message.result.translatedText;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = { translate };
