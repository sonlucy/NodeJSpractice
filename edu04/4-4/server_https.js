const http = require('http');
// http와 https의 차이점: SSL 인증서 유무
// SSL 인증서 : 사용자가 사이트에서 제공하는 정보를 암호화 한 것
const fs = require('fs');

http.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'), // 인증서 저장위치
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write('<h1>hello, World!</h1>');
  res.end('<p>Node.js 서버 생성</p>');
}).listen(3000, () => { // 포트 연결 시 출력
  console.log("3000포트에서 서버 실행중")
});