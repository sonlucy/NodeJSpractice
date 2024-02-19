// MySQL 에서 정의한 테이블을 시퀄라이즈에서도 정의(테이블 연결)
const Sqeulize = reqire('sequlize');

// module.exports = class User extends Sqeulize.Model {}
class User extends Sqeulize.Model {
  static init(sequlize) {
    return super.init

    


  }
}

module.exports = User;