const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const post = require('../models/Post');
const tag = require('../models/Tag');
const user = require('../models/User');



router.get('/createNewPost', checkAuth, (req, res)  => {
  let data = req.body;
  const newPost = new post();

});



module.exports = router;
