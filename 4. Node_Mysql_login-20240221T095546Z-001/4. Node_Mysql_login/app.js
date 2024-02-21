const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const FileStort = require('session-file-store')(session);

// 서버 생성
const app = express();
const port = 3000;

// views 폴더 설정 및 ejs 엔진 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 미들웨어 설정
app.use(logger('dev')); // 로그 미들웨어
app.use(express.json()); // json 파싱 미들웨어
app.use(express.urlencoded({ extended: false })); // url 파싱 미들웨어
app.use(cookieParser()); // 쿠키 파싱 미들웨어
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공 미들웨어

// 라우터 설정
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const mainRouter = require('./routes/main');
const signupRouter = require('./routes/signup');


// 라우터 연결
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/main', mainRouter);
app.use('/users', signupRouter);



// 에러 핸들러
// 404 에러 핸들러
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 서버쪽 에러 핸들러
app.use((error, req, res, next) => {
  res.locals.message = error.message;
  res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.render('error');
})

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
