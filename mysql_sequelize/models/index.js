const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];  // config.json 파일에서 development 항목을 가져옴
const db = {}; // db 객체 생성(실제 데이터베이스가 db와 연결됨)

// 데이터베이스 연결 => 시퀄라이즈 ORM 객체 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config); // 시퀄라이즈 객체 생성

db.sequelize = sequelize; // db 객체에 시퀄라이즈 객체를 넣음

module.exports = db;