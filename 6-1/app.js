const express = require('express');
const path = require('path');
const app = express();  // express 모듈을 app 변수에 할당
app.set('port', process.env.PORT || 3000); // 서버가 실행될 포트 설정
// process.env.PORT에 설정값이 있다면 process.env.PORT를 사용하고 아니면 3000번을 지정한다.

// '/'로 요청 시 hello~ 출력 / index.html 출력
app.get('/', (req, res) => { // GET 요청이 있을때 어떤 동작을 할것인지 결정
  // res.send('hello~');
  res.sendFile(path.join(__dirname, '/index.html')); // 절대 경로 생성
  console.log(path.join(__dirname, '/index.html'));
})

app.listen(app.get('port'), () => {  // app.listen('포트', 콜백): 몇번 포트에서 서버를 실행할지 결정
  console.log(app.get('port'), '번 포트에서 실행중입니다.')
})


