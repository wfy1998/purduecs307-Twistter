const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const post = require('../models/Post');
const userModel = require('../models/User');

router.post('/createNewPost', checkAuth, (req, res)  => {
  console.log( 'res.locals.username:', res.locals.username);
  let data = req.body;

  try {
    if (data.username == null || data.content == null
      || data.content === '' || data.tags == null
      || data.tags.length === 0 ) {
      console.log('null body property');
      res.status(400).send();
      return;
    }
    if (data.username !== res.locals.username) {
      console.log('unmatched username from "request body" and "token"');
      res.status(401).send('unmatched post username compared to token used');
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send();
    return;
  }

  const newPost = new post();
  newPost.username = data.username;
  newPost.content = data.content;
  for( let tag of data.tags){
    newPost.tags.push(tag);
  }
  newPost.likedByUser = [];
  newPost.numberOfLikes = 0;
  newPost.quoted = false;
  newPost.comment = '';
  newPost.originName = '';

  newPost.save(function (err, newPost){
    if (err){
      console.log('Add trans details failed', err);
      return res.status(500).send('Post creation failed');
    }
    else {
      console.log('Add car detail success!');

      userModel.updateOne({username: res.locals.username}, {$push: {userPosts: newPost._id}},
        (err) => {if (err) {console.log(err, 'fatal error!'); return res.status(500).send('fatal error');};});

      return res.status(200).send(newPost);
    }
  });

});

module.exports = router;
