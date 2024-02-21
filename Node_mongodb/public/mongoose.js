// 사용자 이름을 클릭시 댓글이 로딩되도록 하는 함수
document.querySelectorAll('#user-list tr').forEach((el) => {
  el.addEventListener('click', () => {
    const id = el.querySelector('td').textContent;
    getComment(id);
  });
});

// const comments = require("../module/comments");

// 사용자 데이터를 가져와 화면에 출력
async function getUser() {
  try {
    const res = await axios.get('/users');
    const users = res.data;
    const tbody = document.querySelector('#user-list tbody');
    tbody.innerHTML = '';
    users.map(function (user) {
      const row = document.createElement('tr');
      row.addEventListener('click', () => {
        getComment(user._id);
      });
      // });

      let td = document.createElement('td');
      td.textContent = user._id;
      row.appendChild(td);

      td = document.createElement('td');
      td.textContent = user.name;
      row.appendChild(td);

      td = document.createElement('td');
      td.textContent = user.age;
      row.appendChild(td);

      td = document.createElement('td');
      td.textContent = user.married ? '기혼' : '미혼';
      row.appendChild(td);

      tbody.appendChild(row);
    });
  } catch {
    console.log(err);
  }
}

// 3. 사용자의 이름을 클릭했을 때 댓글을 가져오는 함수
async function getComment(id) {
  // fetch를 통해 서버에 요청을 보내고 응답을 받음
  try {
    const res = await axios.get(`/users/${id}/comments`);
    const comments = res.data;
    const tbody = document.querySelector('#comment-list tbody');
    tbody.innerHTML = ''; // tbody 태그의 내용을 초기화

    comments.map((comment) => {
      // tr 태그를 생성하여 tbody 태그에 추가
      const row = document.createElement('tr');
      let td = document.createElement('td');
      td.textContent = comment._id; //td태그에 co
      row.appendChild(td); // tr 태그에 td 태그를 추가(_id)

      td = document.createElement('td');
      td.textContent = comment.name; //td태그에 co
      row.appendChild(td); // tr 태그에 td 태그를 추가(이름)

      td = document.createElement('td');
      td.textContent = comment.comment; //td태그에 co
      row.appendChild(td); // tr 태그에 td 태그를 추가(댓글)

      // 수정 버튼 생성
      const edit = document.createElement('button');
      edit.textContent = '수정';
      edit.addEventListener('click', async () => {
        const newComment = prompt('바꿀 내용을 입력하세요');
        if (!newComment) {
          return alert('내용을 반드시 입력하셔야 합니다');
        }
        try {
          // 서버에 PATCH /comments/:id 요청을 보내고 응답을 받음
          await axios.patch(`/comments/${comment._id}`, {
            comment: newComment
          });
          getComment(id); // 콜백 함수를 이용한 댓글을 다시 가져옴
        } catch (err) {
          console.error(err);
        }
      });
      //  });

      // 삭제 버튼 생성
      const remove = document.createElement('button');
      remove.textContent = '삭제';
      remove.addEventListener('click', async () => {
        try {
          //
          await axios.delete(`/comments/${comment._id}`);
          getComment(id);
        } catch (err) {
          console.error(err);
        }
      });

      // 버튼을 td 태그에 추가
      td = document.createElement('td');
      td.appendChild(edit);
      row.appendChild(td);

      td = document.createElement('td');
      td.appendChild(remove);
      row.appendChild(td);

      // tbody 태그에 tr 태그 추가
      tbody.appendChild(row); // tbody 태그에 tr 태그 추가

    });

  } catch (err) {
    console.error(err);
  }
}

// 사용자 등록 시
document.getElementById('user-form').addEventListener('submit', async (e) => {
  e.preventDefault(); // 기본 동작을 중단
  const name = e.target.username.value; // 사용자 이름을 가져옴
  const age = e.target.age.value; // 나이를 가져옴
  const married = e.target.married.checked; // 결혼 여부를 가져옴

  // 데이터 입력 여부 확인
  if (!name) { // 사용자 이름이 없을 경우
    return alert('이름을 입력하세요'); // 경고창을 띄움
  }

  if (!age) { // 나이가 없을 경우
    return alert('나이를 입력하세요'); // 경고창을 띄움
  }

  // 서버에 POST /users 요청을 보내고 응답을 받음
  try {
    await axios.post('/users', {
      name,
      age,
      married
    });
    getUser(); // 콜백 함수를 이용하여 사용자를 다시 가져옴
  } catch (err) {
    console.error(err);
  }

  // 입력창 초기화
  e.target.username.value = ''; // 사용자 이름 초기화
  e.target.age.value = ''; // 나이 초기화
  e.target.married.checked = false; // 결혼 여부 초기화
});

// 댓글 등록 시
document.getElementById('comment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = e.target.userid.value;
  const comment = e.target.comment.value;
  // 아이디 입력 체크
  if (!id) {
    return alert('아이디를 입력하세요');
  }

  // 댓글 입력 체크
  if (!comment) {
    return alert('댓글을 입력하세요');
  }

  // 서버에 POST /comments 요청을 보내고 응답을 받음
  try {
    await axios.post('/comments', {
      id,
      comment
    });
    getComment(id);
  } catch (err) {
    console.error(err);
  }
  e.target.userid.value = '';
  e.target.comment.value = '';
});