// 필요한 모듈 연결하기
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const nunjucks = require('nunjucks');

// 몽고DB 연결 함수 호출
const connectDB = require('./module');

// 라우터 정의
const indexRouter = require('./routes/index'); // 라우터
const usersRouter = require('./routes/users'); // 라우터
const commentsRouter = require('./routes/comments'); // 라우터


const app = express();
app.set('port', process.env.PORT || 3005);
app.set('view engine', 'html'); // 렌더링 엔진을 html로 설정(nunjucks)

nunjucks.configure('views', { // views 폴더를 템플릿 폴더로 지정
  express: app,
  watch: true, // HTML 파일이 변경될 때 템플릿 엔진을 다시 렌더링
});

connectDB(); // 몽고DB 연결 함수 호출

app.use(morgan('dev')); // 개발환경에서 요청과 응답을 콘솔에 기록
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공(이미지, CSS 파일, 동작을 위한 js파일 등)
app.use(express.json()); // JSON 형식의 데이터를 받기 위한 미들웨어
app.use(express.urlencoded({extended: false})); // URL-encoded 형식의 데이터를 받기 위한 미들웨어

// 라운터 연결
app.use('/', indexRouter); // 루트 라우터 연결
app.use('/users', usersRouter); // 사용자 라우터 연결
app.use('/comments', commentsRouter); // 댓글 라우터 연결

// 에러 처리 미들웨어
app.use((req, res, next) => { // 404 처리 미들웨어
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => { // 실제 에러처리 부분
  res.locals.message = err.message; // res.locals 객체에 속석을 설정하면 탬플릿 엔진에서 사용 가능
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 개발환경에서 에러를 표시
  res.status(err.status || 500); // 에러에 대한 상태 코드로 500을 설정
  res.render('error'); // 에러 페이지 렌더링
});

// 서버 실행
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});