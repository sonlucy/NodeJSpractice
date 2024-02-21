const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  console.log("환영합니다.");
  return res.render('main', {title:'Main', username:'000'});  // views/index.ejs 파일을 렌더링
});

module.exports = router;