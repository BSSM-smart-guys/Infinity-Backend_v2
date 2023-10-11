const { laas} = require("../config");
const axios = require("axios");

const callLaas = (genre, keywords, character, event, background) => {
    const headers = {
        headers: {
            project: laas.projectCode,
            apiKey: laas.apiKey,
            "Content-Type": "application/json"
        }
    }

    const body = {
        hash: laas.hash,
        params: {
            genre: genre.toString(),
            keywords: keywords.toString(),
            character: character.toString(),
            event: event.toString(),
            background: background.toString()
        }
    }

    return axios.post(laas.endpoint, body, headers)
        .then(res => {
            return res.data.choices[0].message.content;
        })
        .catch(err => {
            return err;
        });
}

module.exports = { callLaas }