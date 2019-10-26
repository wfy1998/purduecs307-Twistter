const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const post = require('../models/Post');



router.get('/createNewPost', checkAuth, (req, res, )  => {
  const newPost = new post();
  newPost.username = req.username;
  newPost.content = req.content;
  newPost.tags = req.tags;
  newPost.quoted = req.quoted;
  newPost.originName = req.originName;
  newPost.save((err) => {
    if (err) {
      console.log('Add post failed.', err)
    } else {
      console.log('Add trans detail success!', newPost);
      res.status(201).send('post created success');
    }
  })
});



module.exports = router;
