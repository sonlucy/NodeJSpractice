// 모듈 연결하기
const {odd, even} = require("./test/var");
const checkNum = require("./test/func");

function checkStrOddEven(str) {
  if (str.length % 2) {
    return odd;
  }
  return even;
}

console.log(checkNum(10));
console.log(checkStrOddEven('안녕하세요'));