// 시퀄라이즈와 동일하게 몽구스 스키마를 만들고 이를 통해 DB 사용한다.
// 몽구스는 몽고DB와 연결하기 위한 라이브러리이다.

const mongoose = require('mongoose'); // 몽고DB 연결을 위한 몽구스 모듈 호출
const {Schema} = mongoose; // 몽구스의 Schema 객체를 가져옴

const userShema = new Schema({ // users에 대한 스키마 생성
  name: {
    type: String, // 데이터 타입
    required: true, // 필수 입력 여부
    unique: true, // 고유값 여부
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String, // 데이터 타입만 설정하고 나머지는 선택사항
  createdAt: {
    type: Date,
    default: Date.now, // 기본값 설정
  }
});

// 스키마를 통해 모델 생성
module.exports = mongoose.model('User', userShema); // User 모델을 외부에서 사용할 수 있도록 export