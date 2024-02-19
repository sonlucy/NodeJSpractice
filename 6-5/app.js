const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');

const app = express(); // express 객체 생성

/* app.set('views', './views'); // 화면 출력 파일의 기본 경로를 설정
app.set('view engine', 'pug');  // 사용할 뷰 엔진을 설정 */

// 화면 엔진을 HTML로 변경
// app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(session({
  secret: '123456789qwerty',
  resave: false,
  saveUninitialized: true
}));

const indexRouter = require('./routes/index'); //./routes 로 해도 됨
const usersRouter = require('./routes/user');

app.use('/', indexRouter)
app.use('/user', usersRouter)

// 에러처리 미들웨어
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  res.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production"? err : {};
  res.status(err.status || 500);
  res.render('error');
})

const port = 3005;
app.listen(port, () => {
  console.log(`서버 실행 중 port ${port}`);
});




