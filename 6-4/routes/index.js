const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('test', {title:'hey', message:'Hello there!'});
});

module.exports = router;
