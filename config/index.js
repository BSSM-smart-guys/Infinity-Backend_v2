require("dotenv").config();
const env = process.env;
const { Configuration, OpenAIApi } = require("openai");

const development = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DATABASE,
  host: env.DB_HOST,
  dialect: "mysql",
};

const production = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DATABASE,
  host: env.DB_HOST,
  dialect: "mysql",
};

const test = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DATABASE_TEST,
  host: env.DB_HOST,
  dialect: "mysql",
};

const kakao = {
  apiKey: env.KAKAO_API_KEY,
  endpoint: env.KAKAO_API_ENDPOINT
}

module.exports = { development, production, test, kakao };
