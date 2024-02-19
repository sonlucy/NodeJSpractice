const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
// const {sequlize} = require('./models'); // 시퀄라이즈 객체 가져오기
const {sequlize} = require('sequelize');

const app = express();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
nunjucks.configure('views', {  // 첫번째 인수로 views 폴더 위치를, 두번째 인수로 옵션을 넣음
  express: app,
  watch: true,
});

sequlize.sync({force: false})
// 서버 실행시 MySQL 연동하도록 설정하는 메소드: sync()
// force : true로 하면 서버 실행 시마다 테이블을 재생성(테이블 생성 오류), false는 테이블을 재생성하지 않음
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  })

app.use(morgan('dev')); // 접속 로그 기록(개발용)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // JSON 형식 데이터를 받을 때 해석
app.use(express.urlencoded({extended: false}));

// 에러 처리 미들웨어(url 접속 오류)
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  res.status = 404; // 상태 코드를 404로 설정
  next(error);  // 에러를 다음 미들웨어로 넘김
})

// 에러 처리 미들웨어(500 오류)
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production'? err : {};
  res.status(err.status || 500);
  res.render('error');
})

// 서버 실행
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
})