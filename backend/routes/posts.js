const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

const post = require('../models/Post');
const userModel = require('../models/User');



router.post('/createNewPost', checkAuth, (req, res)  => {
  console.log( 'res.locals.username:', res.locals.username);
  let data = req.body;
  const newPost = new post();
  newPost.username = data.username;
  newPost.content = data.content;
  // todo: chekck if newPost.Tags work.
  for( let tag in data.tags){
    newPost.tags.push(data.tags[tag]);
  }
  newPost.likedByUser = [];
  newPost.numberOfLikes = 0;
  newPost.quoted = false;
  newPost.comment = '';
  newPost.originName = '';
  // console.log(newPost.tags);

  newPost.save(function (err, newPost){
    if (err){
      console.log('Add trans details failed', err);
      return res.status(400).send(err);
    }
    else {
      console.log('Add car detail success!');

      userModel.updateOne({username: res.locals.username}, {$push: {userPosts: newPost._id}},
        (err) => {if (err) {console.log(err); return res.status(500);};});

      return res.status(200).send(newPost);
    }
  });

  console.log('final');

});



module.exports = router;
