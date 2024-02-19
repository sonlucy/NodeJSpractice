const http = require('http'); // 웹 서버 연결
const fs = require('fs').promises; // 파일 관리
const url = require('url'); // 클라이언트가 요청한 주소 처리
const qs = require('querystring'); // url 뒤에 담겨서 가는 내용

// 문자열로 들어온 데이터를 객체 형식으로 변경해주는 함수
const parseCookies = (cookie = '') =>
  cookie
  .split(';')
  .map(v => v.split('='))
  .reduce((acc, [k, v]) => {
    acc[k.trim()] = decodeURIComponent(v);
    return acc;
  }, {});

http.createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }
    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith('/login')) {
      const {
        query
      } = url.parse(req.url);
      const {
        name
      } = qs.parse(query);
      const expires = new Date();

      // 쿠키 유효 시간을 현재시간 + 5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, {
        Location: '/',        // 쿠키를 헤더에 넣기
        'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
      });
      // Set-Cookie: 쿠키 설정
      // Expires: 만료 기한
      // HttpOnly: Http를 통해서만 접속 가능 => 자바스크립트에서 접근 불가
      // Path=url: 쿠기가 전송될 위치
      res.end();

      // name이라는 쿠키가 있는 경우
    } else if (cookies.name) {
      res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8'
      });
      res.end(`${cookies.name}님 안녕하세요`);
    } else { //쿠키가 없는 경우
      try {
        const data = await fs.readFile('./cookie2.html'); // 로그인 페이지로 이동
        res.writeHead(200, {
          'Content-Type': 'text/html; charset=utf-8'
        });
        res.end(data);
      } catch (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain; charset=utf-8'
        });
        res.end(err.message);
      }
    }
  })
  .listen(3000, () => {
    console.log('3000번 포트에서 서버 대기 중입니다!');
  });




  