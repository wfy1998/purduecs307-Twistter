const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const auth = require('../middleware/check-auth');

router.get('/', auth, (req, res, )  => {
  console.log('profile request from', req.body.username);

});
