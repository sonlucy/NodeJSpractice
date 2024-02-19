const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');

const app = express(); // express 객체 생성

app.set('views', './views'); // 화면 출력 파일의 기본 경로를 설정
app.set('view engine', 'pug');  // 사용할 뷰 엔진을 설정

// 화면 엔진을 HTML로 변경
/* app.engine('html', engines.mustache);
app.set('view engine', 'html'); */

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

const indexRouter = require('./routes/index');

app.use('/', indexRouter)

const port = 3001;
app.listen(port, () => {
  console.log(`서버 실행 중 port ${port}`);
});




