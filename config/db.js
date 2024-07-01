const dotenv =require('dotenv');
dotenv.config();
const mysql = require('mysql2');

const {
    DB_HOST, DB_NAME, DB_USER, DB_PASSWORD,
  } = process.env;

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
});

module.exports = pool.promise();
