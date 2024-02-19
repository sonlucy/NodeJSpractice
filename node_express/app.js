const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const fs = require('fs');
const cookieParser = require('cookie-parser');
const e = require('express');

// express 객체 생성
const app = express();

// DB 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'tabledb' //
});

// 미들웨어 설정
app.use(express.static(path.join(__dirname, '/public')));  // 정적 파일 제공
app.use(express.urlencoded({extended: false}));    // urlencoded 형식의 데이터를 받기 위한 설정
app.use(express.json());   // json 형식의 데이터를 받기 위한 설정

app.use(session({
  secret: 'ssa123456789', // 암호화 키, 아무거나 넣어도 됨
  resave: false, // 세션을 언제나 저장할 지 (변경되지 않아도) 정하는 값
  saveUninitialized: true, // 세션이 필요하면 세션을 구동시키고 아니면 구동시키지 않음
  store: new FileStore() // 세션 데이터를 저장
}));

app.set('views', './views'); // views 폴더를 views로 설정
app.set('view engine', 'ejs'); // view engine을 ejs로 설정

// 기본 페이지 연결
app.get('/', (req, res) => {
    console.log('메인페이지 요청');
    console.log(req.session);

    if(req.session.is_logined) {
        res.render('index', {
            is_logined: req.session.is_logined,
            user_id: req.session.user_id,
            name: req.session.user_name,
            birthYear: req.session.birthYear
        });
    } else {
        res.render('login', {
            is_logined: false
        });
    }
});

// 로그인 페이지 연결
app.get('/login', (req, res) => {
  console.log('로그인 페이지 이동');
  res.render('login');
});

// 로그인 처리
app.post('/login', (req, res) => {
  console.log('로그인 요청');

  var user_id = req.body.id;
  var user_pw = req.body.password;

  console.log(user_id, user_pw);

  var sql = 'SELECT * FROM usertbl WHERE uid=?';
  db.query(sql, [user_id], (err, result) => {
    if (err) {
      console.log('sql 에러');
      console.log(err);
      return;
    }

    console.log(result.length); // 조회 건수 확인

    if (result.length > 0) { // 조회된 데이터가 있을 경우(id가 일치하는 경우)
      console.log('아이디 일치 확인');
      if (result[0].upw == user_pw) { // 비밀번호 일치 확인
        console.log('비밀번호 일치 확인');
        req.session.is_logined = true; // 세션에 로그인 정보 저장
        req.session.user_id = user_id;
        req.session.user_name = result[0].name;
        req.session.birthYear = result[0].birthYear; //
        req.session.save(() => {
          res.render('index', {
            name: result[0].name,
            id: user_id, //uid
            birthYear: result[0].birthYear,
            is_logined: true
          });
        });
      } else { // 비밀번호 불일치
        console.log('로그인 실패: 비밀번호 일치하지 않음');
        res.render('login');
      }

    } else { // 조회된 데이터가 없을 경우(id가 일치하지 않는 경우)
      console.log('로그인 실패: 아이디 일치하지 않습니다.');
      res.render('login')
    }

  });
});

// 서버 실행
app.listen(3001, () => {
  console.log('3001번 포트에서 서버 대기 중...');
});


