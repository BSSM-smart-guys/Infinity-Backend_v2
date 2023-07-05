const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 5,
  queueLimit: 0,
});

module.exports = pool;
