// http 서버 모듈 연결
const { error } = require('console');
const http = require('http');

// http 서버 정의
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write('<h1>hello, World!</h1>');
  res.end('<p>Node.js 서버 생성</p>');
});

// 서버에 대한 포트 설정
server.listen(3000);

// 서버 정상 작동
server.on('listening', ()=> {
  console.log("3000포트에서 서버 실행중")
});
// 서버 에러 발생 시
server.on('error', (error) => {
  console.error(error)
});