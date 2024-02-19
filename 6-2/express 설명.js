/* 
서버가 없어도 서버가 있는것처럼 움직이게끔. 자바스크립트에서 서버역할을 해주는게 Node.js

* express 서버
- 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는
  간결하고 유연한 웹 애플리케이션 프레임워크(Node에서 가장 많이 사용하는 프레임워크)
- 개발자들이 거의 모든 웹 개발의 문제를 다루는 호환성 있는 미들웨어 패키지로, 쿠키, 세션,
  사용자 로그인, URL 파라미터, POST 데이터, 보안 헤더와 그 외 많은 것들에 대한 라이브러리들이 존재

- 프로젝트 폴더 생성 => npm init -y (package.json 파일 생성)
- 설치: npm i express
- 연결: const express = require('express'); // import express from 'express';
        const app = express;
- 정의: const app = express();

- 라우터 메소드
  get, post, put, head, delete, options, trace, copy, lock, mkcol, move,
  purge, propfind, 


*/

/* http 내장 모듈을 사용한 웹서버 띄우기 */







/*
- 라우트(Route) : 라우트 경로는 요청 메소드와의 조합을 통해 요청이 이루어질 수 있는 엔드포인트를 정의
  '/', '/about', '/about/customer'

- 라우트 핸들러
req: Request로 클라이언트의 요청 정보를 담고 있다
res: Response로 클라이언트에게 응답하기 위한 정보를 담고 있다.
next: 다음 미들웨어 함수를 가리키는 오브젝트

*/

// 하나의 라우ㅡ에서 하나의 콜백 함수 실행



