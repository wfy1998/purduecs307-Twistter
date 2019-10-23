const express = require('express');
const router = express.Router();

// GET /logout logout page
router.get('/', function (req, res, next) {
  //todo logout
  res.redirect('/posts')
});

module.exports = router;
