const mysql = require('mysql2');
const dbconfig = require('../config/dbconfig');

const db = mysql.createConnection(
  host = dbconfig.host,
  user = dbconfig.user,
  password = dbconfig.password,
  port = dbconfig.port,
  database = dbconfig.database
);

db.connect((err) => {
  if (err) {
    console.error('DB연결 실패: ' + err);
  } else {
    console.log('DB연결 성공');
  }

});

module.exports = db;