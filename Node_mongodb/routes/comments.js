const express = require('express');
const Comment = require('../module/comments'); // 몽고디비 연결(Comment 모델)

const router = express.Router();

router.post('/', async (req, res, next) => { // POST /comments
  try {
    const comment = await Comment.create({ // 몽고디비에 데이터를 생성
      commenter: req.body.id,
      comment: req.body.comment,
    });
    console.log(comment);
    const result = await Comment.populate(comment, {
      path: 'commenter'
    });
    // 몽고디비에서 데이터를 조회(댓글 작성자의 id로 조회)
    res.status(201).json(result); // 생성한 데이터를 json 형식으로 응답
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.route('/:id')
  .patch(async (req, res, next) => { // PATCH /comments/:id
    try {
      const result = await Comment.update({ // 몽고디비에서 데이터를 수정
        _id: req.params.id,
      }, {
        comment: req.body.comment,
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .delete(async (req, res, next) => { // DELETE /comments/:id
    try {
      const result = await Comment.remove({
        _id: req.params.id
      }); // 몽고디비에서 데이터를 삭제
      res.json(result); // 삭제된 데이터를 json 형식으로 응답
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;
