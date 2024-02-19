const express = require('express');
const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.render('users.html', {title:'사용자 정보', 
  users:[
    {id:1, name:'홍길동', age:20},
    {id:2, name:'이순신', age:30},
    {id:3, name:'유관순', age:17},

  ] });
});

module.exports = router;
