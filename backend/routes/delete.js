const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../models/User');

const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, (req, res) => {
  userModel.deleteOne({username: req.body.username}, (err) => {
    if (err) {
      res.status(500).send('no such user')
    }
  })
});

module.exports = router;
