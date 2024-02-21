const mongoose = require('mongoose'); // 몽고DB 연결을 위한 몽구스 모듈 호출

const connectDB = async () => {
  // 개발환경에서 콘솔을 통해 몽고DB 연결 상태를 확인할 수 있도록 설정
  if (process.env.NODE_ENV !== 'production') {
    mongoose.set('debug', true);
  }

  // 몽고DB 연결
  mongoose.connect('mongodb://localhost:27017/admin', { // 몽고DB 연결 주소
    dbName: 'nodejs', // 연결할 DB명
    useNewUrlParser: true, // 연결 옵션(url 구문 분석에 대한 사용 여부)
  }), (error) => {
    if (error) {
      console.log('몽고DB 연결 에러', error);
    } else {
      console.log('몽고DB 연결 성공');
    }
  };
};

// 몽고DB 연결 함수를 외부에서 사용할 수 있도록 export
module.exports = connectDB;