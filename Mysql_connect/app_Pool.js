const express = require('express'); // express 모듈 연결
const mysql = require('mysql2'); // mysql2 모듈 연결
const path = require('path'); // path 모듈 연결
const dbconfig = require('./config/dbconfig.json'); // dbconfig.json 파일을 불러옴

const app = express();
const port = 3000;
const router = express.Router();

// Pool db 연결 객체 생성(dbconfig.json 파일의 정보로 연결-localdb)
const pool = mysql.createPool({
  host: dbconfig.localdb.host,
  user: dbconfig.localdb.user,
  password: dbconfig.localdb.password,
  database: dbconfig.localdb.database,
  connectionLimit: 10
});

// Pool 객체를 이용한 DB 연결
app.get('/', (req, res) => {


  pool.getConnection((err, connect) => {
    if (err) {
      console.log('DB 연결 실패', err);
    } else {
      console.log('DB 연결 성공');
      let sql = 'SELECT * FROM usertbl where userID=? and height>?'; // SQL 쿼리문
      let user_id = 'BBK'; // SQL 쿼리문에 전달할 매개변수
      let height = 170;

      connect.query(sql, [user_id, height], (err, result) => {
        if (err) {
          console.log('SQL 실행 실패', err);
        } else { // SQL 쿼리문 실행 성공 시 결과 출력
          console.log('조회결과', result.length); // 결과 개수 출력
          console.log(result); // 결과 내용 출력
          console.log(result[0].userID, result[0].addr); // 첫번째 결과의 사용자아이디, 지역 출력
          res.json(result); //  Json 형식으로 겨로가 출력
        }
        connect.release(); // 연결 객체 반환(연결 해제)
      })

    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});