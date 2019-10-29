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

  userModel.updateOne(
    {
      username: res.locals.username,
    }, {
      username: req.body.newUserName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    },
    function(err, data){
      if(err) {
        console.log('update info failed.', err);
        return res.status(400).send(err);
      } else {
        console.log('update info success!');
        return res.status(200).send(data);
      }
    })

});

router.post('/addTag', checkAuth, (req, res) => {
  let newTag = req.body.tag;
  let tags = {
    tags:String
  };
  userModel.findOne({username: res.locals.username}, (err, user) =>{
    if(err){
      res.status(404).send(err)
    }
    else {
      tags = user.userTags;
      console.log('the old tag array: ', tags);
      tags.push(newTag);
      console.log('the new tag array: ', tags);
      userModel.updateOne({username: res.locals.username},
        {
          userTags: tags
        },
        function(err, data){
          if(err){
            console.log('the err is', err)
          }
          else {
            console.log('the data is', data);
            console.log('the tag after add is: ', tags)
          }
        }
        )
    }

  });



});

router.post('/checkFollowStatus', checkAuth, (req, res) => {

});

module.exports = router;
