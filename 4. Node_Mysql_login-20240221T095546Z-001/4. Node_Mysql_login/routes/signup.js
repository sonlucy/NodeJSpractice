const express = require('express');
const router = express.Router();
const dbconn = require('../model/dbPool');
let bcrypt = require('bcrypt-nodejs');  // 암호화 모듈 

router.get('/', (req, res) => {
  return res.render('signup');
});

router.get('/users', (req, res) => {
  return res.render('signup');
});

router.post('/', (req, res, next) => {
  let { id, pwd, name, age, tel, email } = req.body;
  
  pwd = bcrypt.hashSync(pwd);  // 암호화

  if (email==='') email = null;  // email이 없을 경우 null로 처리

  let sql = `INSERT INTO users VALUES ('${id}', '${pwd}', '${name}', ${age}, '${tel}', '${email}')`;
  console.log(sql);

  dbconn.query(sql, (err, result) => {
    if (err) {
      console.error(err);
      return res.render('error', { message: '회원가입 실패' });
    }

    console.log('회원가입 성공');
    
    return res.redirect('/login');
  });
});

module.exports = router;

