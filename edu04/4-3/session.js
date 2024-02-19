const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') =>
  cookie
    .split(';')
    .map(v => v.split('='))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

const session = {};

http.createServer(async (req, res) => {
  const cookies = parseCookies(req.headers.cookie);
  if (req.url.startsWith('/login')) {
    const { query } = url.parse(req.url);
    // console.log(url.parse(req.url)); 
    const { name } = qs.parse(query);
    const expires = new Date(); // 현재 날짜/시간
    expires.setMinutes(expires.getMinutes() + 5); // 현재 시간에 5분 더하기
    /*************** * uniqueInt라는 숫자 값을 보냄. ************/
    const uniqueInt = Date.now();
    session[uniqueInt] = { // 사용자의 이름과 만료시간은 session 객체에 대신 저장
      name,
      expires,
    };
    /*  */
    res.writeHead(302, {
      Location: '/',
      'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
    });
    res.end();
  // 세션쿠키가 존재하고, 만료 기간이 지나지 않았다면
  /* session 변수에서 사용자 정보를 가져와 사용  */
  } else if (cookies.session && session[cookies.session].expires > new Date()) {
    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`${session[cookies.session].name}님 안녕하세요`);
  } else { // 최초 접속 시 로그인 화면 출력
    try {
      const data = await fs.readFile('./4-3/cookie2.html');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.message);
    }
  }
})
  .listen(3000, () => {
    console.log('3000번 포트에서 서버 대기 중입니다!');
  });
