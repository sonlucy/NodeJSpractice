// http 모듈 연결
const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req, res) => {
  try {
    // fs 모듈을 이용해 index.html 파일 읽어오기
    const data = await fs.readFile('./index.html');
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(data)
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
    res.end(err.message);
  }
}).listen(3000, () => {
  console.log('3000번 포트로 연결')
})