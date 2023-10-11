require("dotenv").config();
const env = process.env;

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

const laas = {
  projectCode: env.LAAS_PROJECT_CODE,
  apiKey: env.LAAS_PROJECT_API_KEY,
  hash: env.LAAS_PRESET_HASH,
  endpoint: env.LAAS_ENDPOINT
}

const naver = {
  clientId: env.NAVER_CLIENT_ID,
  clientSecret: env.NAVER_CLIENT_SECRET,
  url: env.NAVER_URL
}

module.exports = { development, production, test, kakao, laas };
