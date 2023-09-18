const { Pool } = require("pg");
const fs = require("fs");
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: {
    ca: fs.readFileSync("./eu-west-2-bundle.pem").toString(),
    rejectUnauthorized: true,
  },
});

module.exports = pool;
