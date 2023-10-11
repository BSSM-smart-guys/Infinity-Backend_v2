const { naver } = require("../config")
const axios = require("axios");

const translate = async (contents) => {
    contents.genre = await callPapago(contents.genre.toString());
    contents.keywords = await callPapago(contents.keywords.toString());
    contents.character = await callPapago(contents.character.toString());
    contents.event = await callPapago(contents.event.toString());
    contents.background = await callPapago(contents.background.toString());
    return contents;
}

const callPapago = (contents) => {
    const headers = {
        headers: {
            "X-Naver-Client-Id": naver.clientId,
            "X-Naver-Client-Secret": naver.clientSecret
        }
    }

    const body = {
        source: 'ko',
        target: 'en',
        text: JSON.stringify(contents)
    }

    return axios.post(naver.url, body, headers)
        .then(res => {
            return res.data.message.result.translatedText;
        })
        .catch(err => {
            return err;
        });
}

module.exports = { translate };