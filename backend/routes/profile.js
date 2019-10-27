const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const followModel = require('../models/Followed');
const checkAuth = require('../middleware/check-auth');

router.get('/getOthers', checkAuth, (req, res) => {

});

router.post('/follow', checkAuth, (req, res) => {
  const username = res.locals.username;
  const newFollow = new followModel();
  newFollow.followedUserName = req.body.username;

  userModel.findOne({username: username}, (err, user) => {
    if (err) {
      console.log('err query user', username);
    }
    let allFollowed = user.userFollowed;

    //reading user tags
    let tagsOfUser = [];
    for (let tempTag in user.userTags) {
      tagsOfUser.push(tempTag);
    }
    //assigning tags
    newFollow.followedUserTag = tagsOfUser;
    newFollow.initialTagsWhenFollowed = tagsOfUser;

    //saving follow model
    followModel.save((err, follow) => {
      if (err) {
        console.log(err);
        console.log('save follow error');
        return
      }
      let followID = follow._id;
      userModel.updateOne({username: username}, {$push: {userFollowed: followID}}, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });

  });
});

router.post('/unfollow', checkAuth, (req, res) => {
  // const username = res.locals.username;
  // userModel.update({username: username})
});

router.post('/changeFollowedTag', checkAuth, (req, res) => {

});

router.get('/', checkAuth, (req, res) => {

});

router.post('/changeProfile', checkAuth, (req, res) => {

});

router.post('/addTag', checkAuth, (req, res) => {
  userModel.findOne({username: req.body.username}, (err, user) =>{
    if(err){
      res.status(500).send(err);
    }
    if(!user){
      res.status(500).send('user not found');
    }
    else {
      user.tags.push(req.body.tag);
      res.status(200).send('add new tag');
    }
  })
});

router.post('/checkFollowStatus', checkAuth, (req, res) => {

});

module.exports = router;
