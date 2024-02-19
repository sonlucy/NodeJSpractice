const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.render('index.html', {title:'Express_html', massage:'Hello, Express!', data:[1,2,3,4]});
});

module.exports = router;
