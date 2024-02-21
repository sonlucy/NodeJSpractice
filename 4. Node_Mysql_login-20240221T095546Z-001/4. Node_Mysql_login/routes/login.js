const express = require('express');
const router = express.Router();
const dbconn = require('../config/dbconfig');
let bcrypt = require('bcrypt-nodejs');


/* GET home page. */
router.get('/', (req, res) => {
  return res.render('login', {title: 'login'});
});

router.get('/login', (req, res) => {
  return res.render('login', {title: 'login'});
});

router.post('/', (req, res) => {
  let id = req.body.id;
  let pw = req.body.pw;

  let sql = `SELECT * FROM users WHERE id = '${id}'`;
  console.log(sql);

  dbconn.db.query(sql, (err, result) => {
     if (err || result.length === 0) {
      return res.render('error', {message: '아이디가 존재하지 않습니다.'})
    }

    console.log(result[0].id, result[0].pwd);
    // if (result[0].pwd !== pw) {
    //   return res.render('error', {message: '패스워드 오류입니다.'})
    // }
    
    // 암호화된 비밀번호와 입력된 비밀번호 비교
    bcrypt.compare(pw, result[0].pwd, (err, isMatch) => { // isMatch: pw === result[0].pwd 결과
      if (err || !isMatch) {
        return res.render('error', {message: '패스워드 오류입니다.'})
      }
    });

    console.log('로그인 성공');
    
    return res.redirect('/main');

  });
});


module.exports = router;
