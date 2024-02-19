// http 서버 모듈 연결
const http = require('http');

// http 서버1 실행
http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write('<h1>hello, World!</h1>');
  res.end('<p>Node.js 서버 생성</p>');
}).listen(3000, () => { // 포트 연결 시 출력
  console.log("3000포트에서 서버 실행중")
});

// http 서버2 실행
http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  res.write('<h1>hello, World!</h1>');
  res.end('<p>서버 생성</p>');
}).listen(3001, () => { // 포트 연결 시 출력
  console.log("3001포트에서 서버 실행중")
});