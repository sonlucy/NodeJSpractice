const mongoose = require('mongoose'); // 몽고DB 연결을 위한 몽구스 모듈 호출

// users에 대한 스키마 생성과 비교해보세요.
const { Schema } = mongoose;  // 몽구스에서 스키마 생성자를 가져온다.
const { Types: { ObjectId } } = Schema; // ObjectId를 사용하기 위해


const commentSchema = new mongoose.Schema({  // comments에 대한 스키마 생성
  commenter: {
    type: ObjectId, // 데이터타입
    required: true,  // 필수 입력 여부
    ref: 'User',  // Users 스키마와 연결
  },
  comment: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

// Comment 모델을 외부에서 사용할 수 있도록 export
module.exports = mongoose.model('Comment', commentSchema);

