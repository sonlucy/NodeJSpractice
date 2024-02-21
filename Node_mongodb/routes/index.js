const express = require('express');
const User = require('../module/users'); // 몽고DB와 연결하기 위한 Users 모델 호출

const router = express.Router();
router.get('/', async (req, res, next) => { // GET / 요청에 대한 라우터
  try {
    const users = await User.find({}); // 몽고디비에서 데이터를 조회
    res.render('mongoose', { users }); // 조회한 데이터를 템플릿에 넣어 렌더링
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router; //외부에서 사용할 수 있도록 export