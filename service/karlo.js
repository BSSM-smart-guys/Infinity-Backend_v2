const {kakao} = require("../config");
const axios = require("axios");
const fs = require("fs");
const { translate } = require("./papago");

const generateImage = async (props) => {
    const translatedProps = await translate(props);
    console.log(translatedProps);
    const { genre, keywords, character, event, background } = translatedProps;

    const prompt = `genre: ${genre} | keywords: ${keywords} | ` +
        `character: ${character} | event: ${event} | background: ${background}`;

    const headers = {
        headers: {
            Authorization: `KakaoAK ${kakao.apiKey}`,
            "Content-Type": "application/json"
        }
    }

    const body = {
        prompt: prompt,
        return_type: "base64_string"
    }

    return axios.post(kakao.endpoint + "/t2i", body, headers)
        .then((res) => {
            const {id, seed, image, nsfw_content_detected, nsfw_score} = res.data.images[0];
            fs.writeFile("public/images/" + id + ".png", Buffer.from(image, "base64"), (err) => {
                if (err) return err
            });
            return "success";
        })
        .catch((err) => {
            return err;
        });
}

module.exports = { generateImage };