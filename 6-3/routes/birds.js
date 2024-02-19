const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

// 기본 페이지 경로 정의
/* router.get('/', (req, res, next) => {
  res.send('Birds home page');
  next('route'); // 밑에 나머지는 실행 x
}, (req, res, next) => {
  console.log('next1');
  next();
}, (req, res, next) => {
  console.log('next2');
  next();
}); */
router.get('/', (req, res, next) => {
  res.send('Birds home page');

});

// about 페이지 경로 정의
router.get('/about', (req, res) => {
  res.send('Abot birds');
});

module.exports = router;