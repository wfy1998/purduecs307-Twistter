const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const post = require('../models/Post');
const tag = require('../models/Tag');
const user = require('../models/User');



router.post('/createNewPost', checkAuth, (req, res)  => {
  console.log( 'res.locals.username:', res.locals.username);
  let data = req.body;
  const newPost = new post();
  newPost.username = data.username;
  newPost.content = data.content;
  // todo: chekck if newPost.Tags work.
  for( var tag in data.tags){
  newPost.tags.push(data.tags[tag]);
  }
  // console.log(newPost.tags);

  post.insertMany(newPost, function (err, newPost){
    if (err){
      console.log('Add trans details failed', err);
      return res.status(400).send(err);
    }
    else {
      console.log('Add car detail success!');
      return res.status(200).send(newPost);
    }
  });

  console.log('final');

});



module.exports = router;
