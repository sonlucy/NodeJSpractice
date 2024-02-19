//const http = require('http');
import http from 'http';

http.createServer((req, res) => {
  console.log(req.url, req.headers.cookie);

  // 브아루저에 쿠키를 저장
  res.writeHead(200, {'Set-cookie':'mycookie = test'});
  res.end('ok')
}).listen(3000, () => {
  console.log('3000번 포트로 서버 연결');
});

/*** 
 * commonJS
exports 함수; 여러 모듈
module.exports; 단일 모듈

exports.변수1 = 값1
exports.함수 = () => {};

module.exports = {변수1, 함수};

// 모듈 연결
const a = require('js파일명');
a.변수1
***/


/***
 * ES6
export 변수1 = 값1;
export 함수 = () => {};

import {변수1, 함수} from '모듈파일.js';
import {변수1} from '모듈파일.js'; // 변수1만 가져와

export default 함수2

import 함수2 from '모듈파일.js'; 
 */