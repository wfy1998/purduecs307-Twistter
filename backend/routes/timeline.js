const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const postModel = require('../models/Post');
const userModel = require('../models/User');

router.get('/getMorePosts', checkAuth, (req, res)  => {

});

router.get('/likePost', checkAuth, (req, res)  => {
  let data = req.body;
  postModel.findOne( {_id: data.postID}, (err, post) => {
      if (err) {
        console.log(err);
        res.status(500).send('post not found')
      }
      let numberOfLikes = post.numberOfLikes;
      numberOfLikes++;
      console.log(post._id + ' number of likes: ' + post.numberOfLikes);

      //postModel.update({_id: data.postID}, )

    })
});

router.get('/quote', checkAuth, (req, res)  => {

});

module.exports = router;
