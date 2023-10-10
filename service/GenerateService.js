const axios = require("axios");
const { kakao } = require("../config")
const fs = require("fs");

const execute = (genre, keywords, character, event, background) => {
    return generateImage();
}

const generateImage = () => {
    const headers = {
        headers: {
            Authorization: `KakaoAK ${kakao.apiKey}`,
            "Content-Type": "application/json"
        }
    }
    const body = {
        prompt: "cute cat",
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

module.exports = { execute };
