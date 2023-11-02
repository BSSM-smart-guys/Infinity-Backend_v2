require("dotenv").config();
const OpenAI = require("openai");

const callLaas = async (dto) => {
  const openai = new OpenAI({
    apiKey: process.env.AI_APIKEY,
  });
  console.log(dto);
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `Write a novel within 500~600 characters in Korean. then translate it to Korean. send me only Korean version please. genre: ${dto.genre}, keyword: ${dto.keywords}, character: ${dto.character},event: ${dto.event}, the setting of the novel: ${dto.background}.`,
      },
    ],
  });
  return response.choices[0].message.content;
};

// const callLaas = (dto) => {
//     let params = {};
//     Object.entries(dto).forEach(([key, value]) => params[key] = value.toString());

//     const headers = {
//         headers: {
//             project: laas.projectCode,
//             apiKey: laas.apiKey,
//             "Content-Type": "application/json"
//         }
//     }

//     const body = {
//         hash: laas.hash,
//         params
//     }

//     return axios.post(laas.endpoint, body, headers)
//         .then(res => {
//             return res.data.choices[0].message.content;
//         })
//         .catch(err => {
//             return err;
//         });
// }

module.exports = { callLaas };
