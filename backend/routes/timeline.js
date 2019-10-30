const express = require('express');
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const postModel = require('../models/Post');
const userModel = require('../models/User');

router.get('/getMorePosts', checkAuth, (req, res)  => {
  console.log('getting more post');
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

      for (let temp of user.userFollowed) {
        let flusername = temp.followedUserName;
        let followedTags = temp.followedUserTag;

        userModel.findOne({username: flusername})
          .populate({
            path: 'userPosts',
            match: { tags: { $in: Array.from(followedTags)}},
          })
          .exec((err, fluser) => {
            if (err) {console.log(err); return res.status(500);}

            for (let tempPost of fluser.userPosts) {
              let postData = {
                postID: tempPost._id,
                createdAt: tempPost.createdAt,
                username: tempPost.username,
                content: tempPost.content,
                tags: tempPost.tags,
                numberOfLikes: tempPost.numberOfLikes,
                quoted: tempPost.quoted,
                comment: tempPost.comment,
                originName: tempPost.originName
              };
              postsToReturn.push(postData);
            }
          });
      }

      //sleeping and wait for callbacks to finish
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      };
      sleep(2000).then(() => {
        console.log('the return post', postsToReturn);
        res.status(200).send(postsToReturn);
      });

    });

});

router.get('/getHighlight', checkAuth, (req, res)  => {
  console.log('getting highlighted posts');

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

      for (let temp of user.userFollowed) {
        let flusername = temp.followedUserName;
        let initialTags = temp.initialTagsWhenFollowed;

        userModel.findOne({username: flusername})
          .populate({
            path: 'userPosts',
            match: {tags: { $elemMatch: { $nin: Array.from(initialTags)} } },
          })
          .exec((err, fluser) => {
            if (err) {console.log(err); return res.status(500);}

              for (let tempPost of fluser.userPosts) {
                let postData = {
                  postID:tempPost._id,
                  createdAt: tempPost.createdAt,
                  username: tempPost.username,
                  content: tempPost.content,
                  tags: tempPost.tags,
                  numberOfLikes: tempPost.numberOfLikes,
                  quoted: tempPost.quoted,
                  comment: tempPost.comment,
                  originName: tempPost.originName
                };
              postsToReturn.push(postData);
            }
          });
      }

      //sleeping and wait for callbacks to finish
      const sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
      };
      sleep(2000).then(() => {
        console.log(postsToReturn);
        res.status(200).send(postsToReturn);
      });

    });

});

router.post('/likePost', checkAuth, (req, res)  => {
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

router.post('/quote', checkAuth, (req, res)  => {
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
  const username = req.body.username;
  console.log('getting userline', username);
  userModel.findOne({username: username})
    .populate('userPosts')
    .exec((err, user) => {
      if (err) {console.log(err); return res.status(500);}

      var postsToReturn = [];

      for (let tempPost of user.userPosts) {
        let postData = {
          postID: tempPost._id,
          createdAt: tempPost.createdAt,
          username: tempPost.username,
          content: tempPost.content,
          tags: tempPost.tags,
          numberOfLikes: tempPost.numberOfLikes,
          quoted: tempPost.quoted,
          comment: tempPost.comment,
          originName: tempPost.originName
        };
        postsToReturn.push(postData);
      }

      console.log(postsToReturn);
      res.status(200).send(postsToReturn);
    })

});

module.exports = router;
