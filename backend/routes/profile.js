const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const followModel = require('../models/Followed');
const checkAuth = require('../middleware/check-auth');

router.post('/getOthers', checkAuth, (req, res) => {
    userModel.findOne({username: req.body.username}, (err, user) =>{
      if (err){
        console.log('the error is: ', err);
        res.status(500).send(err);
      }
      if(!user){
        res.status(500).send('cannot find the user');
      }
      else {
        res.send(json(user));
      }
    })
});

router.post('/follow', checkAuth, (req, res) => {
  console.log('follow');
  const username = res.locals.username;
  const newFollow = new followModel();
  const userToBeFollowed = req.body.username;
  newFollow.followedUserName = userToBeFollowed;
  console.log(userToBeFollowed);

  userModel.findOne({username: username}, (err, user) => {
    if (err) {
      console.log('err query user', username);
      return;
    }
    if (!user) {
      return;
    }

    userModel.findOne({username: userToBeFollowed}, (err, BeFollowedUser) => {
      if (err) {
        console.log(err);
        return;
      }
      //reading tags of userToBeFollowed
      let tagsOfUser = BeFollowedUser.userTags;
      console.log(tagsOfUser);

      //assigning tags
      newFollow.followedUserTag = tagsOfUser;
      newFollow.initialTagsWhenFollowed = tagsOfUser;

      //saving follow model
      newFollow.save((err, follow) => {
        if (err) {
          console.log(err);
          console.log('save follow error');
          return
        }
        let followID = follow._id;
        userModel.updateOne({username: username}, {$push: {userFollowed: followID}}, (err) => {
          if (err) {
            console.log(err);
            return
          }
          console.log('success');
          return res.status(200);
        }); //end update current user follow list

      }); //end saving new follow model

    }); //end finding user tobefollowed

  }); //end find initial user

});

router.post('/unfollow', checkAuth, (req, res) => {
  console.log('unfollow');
  const username = res.locals.username;
  const userToBeUnfollowed = req.body.username;
  console.log(userToBeUnfollowed);

  userModel.findOne({username: username}, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }

    let followList = user.userFollowed;
    for (let tempID in followList) {
      followModel.findById(followList[tempID], (err, follow) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!follow) {
          return;
        }
        if (follow.followedUserName === userToBeUnfollowed) {
          followModel.findByIdAndRemove(followList[tempID], (err) => {
            if (err) {
              console.log(err);
            }
          });
          userModel.updateOne({username: username}, {$pull: {userFollowed: followList[tempID]}}, (err) => {
            if (err) {console.log(err); return}
            console.log('removed');
            return res.status(200);
          });
        }
      }); //end find follow model by id
    }

  });

});

router.post('/changeFollowedTag', checkAuth, (req, res) => {
  //todo assuming input tag list is in string array
  const followedUser = req.body.username;
  const username = res.locals.username;
  const tags = req.body.taglist;
  console.log('changing followed tags', followedUser, tags);

  userModel.findOne({username: username})
    .populate('userFollowed')
    .exec((err, user) => {
      if (err) {console.log(err); return res.status(500)}
      if (!user) {console.log('no such user'); return res.status(500)}

      for (let temp of user.userFollowed) {
        if (temp.followedUserName === followedUser) {
          followModel.findByIdAndUpdate(temp._id, {followedUserTag: tags}, (err) => {
            if (err) {console.log(err); res.status(500);}
          });
          res.status(200);
          return;
        }
      }

    })

});

router.post('/', checkAuth, (req, res) => {
  console.log('getting own profile');
  userModel.findOne({username: res.locals.username}, (err, user) => {
    if (err) {console.log(err); return res.status(500)}
    res.status(200).send(json(user));
  })
});

router.post('/changeProfile', checkAuth, (req, res) => {

  userModel.updateOne(
    {
      username: res.locals.username,
    }, {

      firstName: req.body.enteredFirstName,
      lastName: req.body.enteredLastName,
      age: req.body.enteredAge,
      gender: req.body.enteredGender,
      address: req.body.enteredAddress,
      phone: req.body.enteredPhone

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
            console.log('the tag after add is: ', tags)
          }
        })// end updateOne

    }// end else

  });// end findOne

});// end function

router.post('/checkFollowStatus', checkAuth, (req, res) => {
  console.log('checkFollowStatus');
  const username = res.locals.username;
  const userToCheck = req.body.username;
  console.log(userToCheck);

  let followed = false;

  userModel.findOne({username: username}, (err, user) => {
    if (err) {
      console.log(err);
      return;
    }
    if (!user) {
      return;
    }

    let followList = user.userFollowed;
    for (let tempID in followList) {
      followModel.findById(followList[tempID], (err, follow) => {
        if (err) {
          console.log(err);
          return;
        }
        if (!follow) {
          return;
        }
        if (follow.followedUserName === userToBeUnfollowed) {
          follow = true;
          res.status(200).send({follow});
        }
      }); //end find follow model by id

      if (followed) { //async: no need to check further
        return;
      }
    }

  });

});

router.post('/reset', checkAuth, (req, res) => {
  console.log('resetting');
  userModel.findOneAndUpdate({username: res.locals.username}, { $set: {
      'userPosts': [],
      'userTags': [],
      'userFollowed': []
    }
  } , (err, user) => {
    if (err) {console.log(err)}
    console.log(user);
  })
});

module.exports = router;
