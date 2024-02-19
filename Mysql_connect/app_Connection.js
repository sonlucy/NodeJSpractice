const express = require('express'); // express 모듈 연결
const mysql = require('mysql2'); // mysql2 모듈 연결
const path = require('path'); // path 모듈 연결

const app = express(); // express 객체 생성

// connection 함수를 이용한 DB 연결 객체 생성
const connect = mysql.createConnection({
  connectionLimit: 10,
  host: 'localhost', //DB 서버 주소
  port: 3306,  // DB 서버 포드
  user: 'root',  // DB 사용자 아이디
  password: '1234', // DB 사용자 비번
  database: 'tabledb'  // DB 이름
});

// DB 연결
connect.connect((err) => {
  if (err) {  // 연결 실패 시 오류 메시지 출력
    console.log('DB 연결 실패', err);
  } else {  // 연결 성공 시 성공 메시지 출력
    console.log('DB 연결 성공')
  }

  let sql = 'SELECT * FROM usertbl where userID=? and height>?'; // SQL 쿼리문
  let user_id = 'BBK'; // SQL 쿼리문에 전달할 매개변수
  let height = 170;

  connect.query(sql, [user_id, height], (err, result) => {
    if (err) {
      console.log('SQL 실행 실패', err);
    } else { // SQL 쿼리문 실행 성공 시 결과 출력
      console.log('조회결과', result.length); // 결과 개수 출력
      console.log(result);  // 결과 내용 출력
      console.log(result[0].userID, result[0].addr); // 첫번째 결과의 사용자아이디, 지역 출력
    }
  })
})



