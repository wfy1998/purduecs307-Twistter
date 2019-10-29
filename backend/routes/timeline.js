const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const postModel = require('../models/Post');
const userModel = require('../models/User');
const followModel = require('../models/Followed');


router.get('/getMorePosts', checkAuth, (req, res)  => {
  console.log('getting more post');

  var postData = {
    createdAt: '',
    username: '',
    content: '',
    tags: [],
    numberOfLikes: 0,
    highlight: false,
    quoted: false,
    comment: '',
    originName: ''
  };

  var postsToReturn = [];

  // getting all the user that are followed by current user (specified by username)
  userModel.findOne({username: res.locals.username})
    .populate('userFollowed')
    .exec((err, user) => {
      if (err) {
        res.status(500).send('no such user /or query failed');
        return;
      }
      if (!user) {
        console.log('query returned null');
        return;
      }

      console.log(user);

      for (let temp in user.userFollowed) {
        let flusername = user.userFollowed[temp].followedUserName;
        let followedTags = user.userFollowed[temp].followedUserTag;
        let initialTags = user.userFollowed[temp].initialTagsWhenFollowed;

        userModel.findOne({username: flusername})
          .populate({
            path: 'userPosts',
            match: { tags: { $in: Array.from(followedTags)}}
            //sort: { 'createdAt': -1 }
          })
          .exec((err, fluser) => {
            if (err) {console.log(err); return res.status(500);}

            console.log(fluser);

            // for (let tempPost in fluser.userPosts) {
            //
            // }
          });
      }



      res.status(200);
    });
  // followedUsers: list of Followed model document
  // var allPosts = [];
  // for (let tempUser in followedUsers) {
  //   //for each user & tag pair, search all posts
  //   postModel.find({username: tempUser.followedUserName}, (err, posts) => {
  //     if (err) {
  //       console.log('post search error');
  //       return
  //     }
  //     for (let post in posts) {
  //       allPosts.push(post);
  //     }
  //
  //   })
  // }
});

router.get('/likePost', checkAuth, (req, res)  => {
  let data = req.body;
  postModel.findOne( {_id: data.postID}, (err, post) => {
      if (err) {
        console.log(err);
        res.status(500).send('post not found');
        return
      }
      let numberOfLikes = post.numberOfLikes;
      numberOfLikes++;
      console.log(post._id + ' number of likes: ' + post.numberOfLikes);

      postModel.update({_id: data.postID}, {numberOfLikes: numberOfLikes}, (result, err) => {
        if (err) {
          console.log(err);
          res.status(500).send('error update number of likes');
        }
      })

    })
});

router.get('/quote', checkAuth, (req, res)  => {
  let data = req.body;
  let newPost = new postModel();
  postModel.findOne( {_id: data.postID}, (err, post) => {
    if (err) {
      console.log(err);
      return
    }
    newPost.username = res.locals.username;
    newPost.content = post.content;
    newPost.tags = post.tags;
    newPost.quoted = true;
    newPost.comment = data.comment;
    newPost.originName = post.username;
  });
  newPost.save((err) => {
    if (err) {
      console.log(err);
      res.status(500).send('new quote creation failed');
      return
    }
    console.log('new quote created');
  });
});

router.post('/getUserLine', checkAuth, (req, res) => {

});

module.exports = router;
