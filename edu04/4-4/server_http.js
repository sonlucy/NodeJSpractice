const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>hello, World!</h1>');
  res.end('<p>Node.js 서버 생성</p>');
}).listen(3000, () => { // 포트 연결 시 출력
  console.log("3000포트에서 서버 실행중")
});


