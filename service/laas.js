const { laas} = require("../config");
const axios = require("axios");

const callLaas = (dto) => {
    let params = {};
    Object.entries(dto).forEach(([key, value]) => params[key] = value.toString());

    const headers = {
        headers: {
            project: laas.projectCode,
            apiKey: laas.apiKey,
            "Content-Type": "application/json"
        }
    }

    const body = {
        hash: laas.hash,
        params
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