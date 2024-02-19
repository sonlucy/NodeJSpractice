const {odd, even} = require("./var");

function checkOddEven(num) {
  if (num%2) { //나머지가 1(true)이면 홀수
    return odd;
  }
  return even;
}

// 함수 모듈화
module.exports = checkOddEven;