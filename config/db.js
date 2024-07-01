// const dotenv =require('dotenv');
// dotenv.config();
const mysql = require('mysql2');

// const {
//     DB_HOST, DB_NAME, DB_USER, DB_PASSWORD,
//   } = process.env;

const pool = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "hava_havai"
});

module.exports = pool.promise();
