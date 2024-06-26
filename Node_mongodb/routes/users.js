const express = require('express');
const User = require('../module/users'); // 몽고디비 연결(User 모델)
const Comment = require('../module/comments'); // 몽고디비 연결(Comment 모델)

const router = express.Router();

// 사용자 데이터를 가져와 화면에 출력
router.route('/')
  .get(async (req, res, next) => { // GET /users
    try {
      const users = await User.find({}); // 몽고디비에서 데이터를 조회
      res.json(users); // 조회한 데이터를 json 형식으로 응답
    } catch (err) {
      console.error(err);
      next(err);
    }
  })

  .post(async (req, res, next) => { // POST / 요청에 대한 라우터
    try {
      const user = await User.create({ // 몽고디비에 데이터를 생성
        name: req.body.name,
        age: req.body.age,
        married: req.body.married,
      });
      console.log(user);
      res.status(201).json(user); // 생성한 데이터를 json 형식으로 응답
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => { // GET /users/:id/comments 요청에 대한 라우터
  try {
    const comments = await Comment.find({commenter: req.params.id}).populate('commenter'); // 몽고디비에서 데이터를 조회(댓글 작성자의 id로 조회)
    console.log(comments);
    res.json(comments); // 조회한 데이터를 json 형식으로 응답
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;