require("dotenv").config();
const env = process.env;

const development = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  dialect: "mysql",
};

const production = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  dialect: "mysql",
};

const test = {
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE_TEST,
  host: env.DB_HOST,
  dialect: "mysql",
};

module.exports = { development, production, test };
