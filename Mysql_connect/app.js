const express = require('express');
const path = require('path');
const static = require('serve-static'); // static 미들웨어
const dbcfg = require('./config/dbconfig.json'); // db 접속 정보
const session = require('express-session'); // 세션 미들웨어
const cookieParser = require('cookie-parser'); // 쿠키 파서 미들웨어
const FileStore = require('session-file-store')(session); // 세션 파일 저장용 모듈

const app = express();
const port = 3000;
app.set('views', path.join(__dirname, 'views')); // views 폴더 설정
app.set('view engine', 'ejs'); // view 엔진 설정


app.use('/static', static(path.join(__dirname, 'public'))); // static 미들웨어 설정
app.use(express.json()); // json 파싱 미들웨어 설정
app.use(express.urlencoded({
  extended: false
})); // urlencoded 파싱 미들웨어 설정

app.use(cookieParser()); // 쿠키 파서 미들웨어 설정
app.use(session({ // 세션 미들웨어 설정
  secret: '12345abcde', // 세션 암호화 키
  resave: false, // 세션을 항상 저장할지 여부
  saveUninitialized: true, // 초기화되지 않은 세션을 저장할지 여부
  store: new FileStore(), // 세션 저장소
  cookie: {
    maxAge: 60 * 1000
  } // 세션 유효시간
}));

// 라우터 설정
const userRouter = require('./routers/userRouter');
app.use('/user', userRouter);


app.get('/', (req, res) => {
  console.log('메인 페이지로 이동');
  res.render('main.ejs');
});


// 서버 실행
app.listen(port, () => {
  console.log('서버 실행 중...port: 3000');
});