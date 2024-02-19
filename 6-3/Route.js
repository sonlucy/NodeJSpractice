/*
라우트(Route): 클라이언트의 접속 경로에 따를 처리 경로 설정
- 문자열, 문자열 패턴, 정규식을 이용해서 만들 수 있다.
- 문자열 패턴을 이용하는 경우 ?, +, * 및 () 문자는 정규식 문자의 서브세트이고, 
  하이픈(-) 및 점(.)은 문자열 기반 경로에 의해 문자 그대로 해석

# 문자열 예시
'/', '/about', '/about/customer'

# 문자열 패턴 예시
'/ab?cd': 'b?'는 문자 'b'가 0개 혹은 1개 있다는 것을 의미('/acd', '/abcd')
'/ab+cd': 'b+'는 문자 'b'가 1개 이상 있다는 것을 의미('/abcd', '/abbcd', '/abbbcd', ..)
'/ab*cd': 문자 'ab'와 문자 'cd' 사이에 문자가 없거나 혹은 어떤 문자도 올 수 있다는 것을 의미
          ('/abcd', 'abXcd', '/abXYZcd', ..)
'/ab(cd)?e': '(cd)?'는 문자 'cd'가 0번 혹은 1번 있을 수 있다는 것을 의미('/abe', '/abcde')

# 정규식 예시
/a/: 클라이언트에서 요청한 라우트 경로에 'a'가 포함되어 있는 경우
/^insert/: 클라이언트에서 요청한 라우트 경로가 문자 'insert'로 시작하는 경우
/^\/[0-9]+$/: 클라이언트에서 요청한 라우트 경로가 숫자인 경우

*/

// 문자열
app.get('/about', function (req, res) {
  res.send('about');
});

// 문자열 패턴
app.get('/ab?cd', function (req, res) {
  res.send('ab?cd');
});

// 정규식
app.get(/a/, function (req, res) {
  res.send('/a/');
});

// Path Variable
app.get('/user/:userId/item/:itemId', (req, res) => {
  const {
    userId,
    itemId
  } = req.params;
  res.send(`userId: ${userId}, itemId: ${itemId}`);
});

/*
- app.route()를 이용하면 라우트 경로에 대하여 체인 가능한 라우트 핸들러를 작성할 수 있다.
- 경로는 한 곳에 지정되어 있으므로, 모듈식 라우트를 작성하면 중복성이 감소하여 코드를 
  좀 더 효율적으로 관리할 수 있다.
*/

// 라우터 체인 : 하나의 라우트 경로로 각 라우트 메소드 처리
app.route('/customer')
  .get(function (req, res) { // HTTP 메소드 GET 요청에 대한 조회 처리
    res.send('고객 정보 조회');
  })
  .post(function (req, res) { // HTTP 메소드 POST 요청에 대한 저장 처리
    res.send('신규 고객 추가');
  })
  .put(function (req, res) { // HTTP 메소드 PUT 요청에 대한 수정 처리
    res.send('고객 정보 수정');
  })
  .delete(function (req, res) { // HTTP 메소드 DELETE 요청에 대한 삭제 처리
    res.send('고객 정보 삭제');
  });