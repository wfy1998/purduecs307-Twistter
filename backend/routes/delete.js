const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const userModel = require('../models/User');
const followModel = require('../models/Followed');
const postModel = require('../models/Post');

const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, (req, res) => {

  userModel.findOne({username: res.locals.username}, (err, user) => {
    if (err) {console.log(err); res.status(500).send(); return}
    if (!user) {res.status(403).send(); return}

    let followData = user.userFollowed;
    let postsData = user.userPosts;

    for (let temp of followData) {
      followModel.findByIdAndDelete(temp, (err) => {
        if (err) {
          console.log(err);
          console.log('deletion failed for' + temp)
        }
      });
    }

    for (let temp of postsData) {
      postModel.findByIdAndDelete(temp, (err) => {
        if (err) {
          console.log(err);
          console.log('deletion failed for' + temp)
        }
      })
    }

    console.log('sleeping for 5 seconds!');
    //sleeping and wait for callbacks to finish
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    };
    sleep(5000).then(() => {
      console.log('now hope all callbacks have finished!');
      userModel.deleteOne({username: res.locals.username}, (err) => {
        if (err) {
          console.log('deletion error!');
          res.status(500).send();
          return
        }
        res.status(200);
      })
    });

  });


});

module.exports = router;
