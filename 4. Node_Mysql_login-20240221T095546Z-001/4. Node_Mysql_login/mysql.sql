use nodesql;

CREATE TABLE users(  
    id VARCHAR(15) NOT NULL PRIMARY KEY COMMENT 'PK',
    pwd VARCHAR(100) NOT NULL COMMENT 'password',
    name VARCHAR(20) NOT NULL COMMENT 'name',
    age INT(3) NOT NULL COMMENT 'age',
    tel VARCHAR(13) NOT NULL COMMENT 'tel',
    email VARCHAR(30) COMMENT 'email'
) COMMENT '';

CREATE TABLE posts(
  no INT NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT 'PK',
  id VARCHAR(15) NOT NULL COMMENT 'FK',
  title VARCHAR(50) NOT NULL COMMENT 'title',
  content TEXT NOT NULL COMMENT 'content',
  date DATETIME NOT NULL DEFAULT now() COMMENT 'date',
  FOREIGN KEY (id) REFERENCES users(id) 
) COMMENT '';

-- 기본 데이터 입력
INSERT INTO users VALUES('admin', '1234', '관리자', 30, '010-1234-5678', 'admin@sql.co.kr');

INSERT INTO posts VALUES(1, 'admin', '첫번째 글', '첫번째 글입니다. 반가워요.', now());

SELECT * FROM users;