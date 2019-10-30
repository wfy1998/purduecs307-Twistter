const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/User');

const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, (req, res) => {
  userModel.deleteOne({username: res.locals.username}, (err) => {
    if (err) {
      res.status(500).send('no such user')
    }
    res.status(200);
  })
});

module.exports = router;
