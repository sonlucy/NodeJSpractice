const http = require('http');
const express = require('express')

http.createServer((req, res) => {
  // 비동기 처리 결과를 출력하기 위한 콜백 함수

})

const app = express();

// app.user()의 인자가 미들웨어
app.use((req, res, next) => {
  console.log('모든 요청시 다 실행됩니다.')
  req.requestTime = Data.now(); // req 라는 객체에 requestTime 키와 Value를 등록, requestTime: 사용자 등록값
  next() // 다음 미들웨어 함수 실행
});

app.get('/', (req, res) => { // next()가 호출한 미들웨어 함수(next()에 의한 콜백함수 작동)
  // 익스프레스 전용 미들웨어 함수
  console.log('GET을 통한 / 에서 요청시만 실행됩니다.')
  res.send(req.requestTime); //위에서 받아온 req.requestTime 출력
  next();
}, (req, res) => {
  throw new Error('에러 처리 미들웨어로 이동');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message)
})

app.listen(3000);

/* 
- 요청과 응답 사이에 위치하여 미들웨어 라고 함
- 미들웨어는 req, res, next가 매개변수인 함수
- 미들웨어 함수를 여러번 인자로 쓸 수 있다.
- req: 요청, res: 응답 조작 가능, next()로 다음 미들웨어로 넘어감.
 */