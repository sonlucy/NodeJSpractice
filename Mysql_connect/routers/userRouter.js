const express = require('express'); 
const mysql = require('mysql2');
const dbcfg = require('../config/dbconfig.json');

const router = express.Router();

// 연결 Pool 객체 생성
const pool = mysql.createPool({
  host: dbcfg.localdb.host,
  user: dbcfg.localdb.user,
  password: dbcfg.localdb.password,
  database: dbcfg.localdb.database,
  connectionLimit: 10
});

// 라우터 설정('/user'로 접속시 사용자 정보 조회)
router.get('/', (req, res) => {
  // 연결 Pool 객체를 이용하여 연결
  pool.getConnection((err, connect) => {
    if (err) {
      console.error('DB 연결 실패: ', err);
      return;
    }
    console.log('DB 연결 성공');
    // SQL 쿼리문 실행
    sql = 'SELECT * FROM usertbl'; // SQL 쿼리문
    connect.query(sql, (err, result) => {
      if (err) {
        console.log('SQL 실행 실패', err);
        return;
      }
      console.log('SQL 실행 성공');
      res.json(result);  // JSON 형식으로 결과 출력
    });
    connect.release(); // 연결 객체 반환(연결 해제)
  });

});

module.exports = router; // 모듈로 라우터 설정을 반환