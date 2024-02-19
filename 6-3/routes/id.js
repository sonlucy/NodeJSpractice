const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello, Express id page')
})

router.get('/user/:id', (req, res) => {
  console.log(req.params, req.query);
  // res.send(`Hello, ${req.params.id}!`);
  let id = req.params.id;
  let pw = req.query.pw;
  res.send(`req.params: ${id}, req.query:${pw} <br> query: ${req.query.query}, ie:${req.query.ie}`);
})

module.exports = router;
