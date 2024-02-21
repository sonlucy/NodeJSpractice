const mysql = require('mysql2');
const {info} = require('../config/dbconfig');

const pool = mysql.createPool({
  host : info.host,
  user : info.user,
  password : info.password,
  port : info.port,
  database : info.database,
});

pool.getConnection((err, conn) => {
  if (err) {
    console.error('Pool DB연결 실패: ' + err);
  } else {
    console.log('Pool DB연결 성공');
  }
});

module.exports = pool;
