const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const followModel = require('../models/Followed');
const postModel = require('../models/Post');
const checkAuth = require('../middleware/check-auth');
const repeatedFollowCheck = require('../middleware/repeatedFollowCheck');

router.post('/getOthers', checkAuth, (req, res) => {
  const data = req.body;
  try {
    if (data.username == null || data.username === '') {
      res.status(400).send();
      return;
    }
  }
  catch (e) {
    res.status(400).send();
    return;
  }

  userModel.findOne({username: req.body.username}, (err, user) =>{
    if (err){
      console.log('the error is: ', err);
      res.status(500).send(err);
    }
    if(!user){
      res.status(403).send('cannot find the user');
    }
    else {
      res.json(user);
    }
  })
});

router.post('/follow', checkAuth, repeatedFollowCheck, (req, res) => {
  console.log('follow');
  const username = res.locals.username;
  const newFollow = new followModel();
  const userToBeFollowed = req.body.username;
  newFollow.followedUserName = userToBeFollowed;
  console.log(userToBeFollowed);

  userModel.findOne({username: username}, (err, user) => {
    if (err) {
      console.log('err query user', username);
      res.status(500).send();
      return;
    }
    if (!user) {
      res.status(403).send('cannot find the user');
      return;
    }

    userModel.findOne({username: userToBeFollowed}, (err, BeFollowedUser) => {
      if (err) {
        console.log(err);
        return;
      }
      if(!BeFollowedUser){
        res.status(403).send('cannot find the user');
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
      res.status(500).send();
      return;
    }
    if(!user){
      res.status(403).send('cannot find the user');
      return;
    }
    let followList = user.userFollowed;
    for (let tempID of followList) {
      followModel.findById(tempID, (err, follow) => {
        if (err) {
          console.log(err);
          res.status(500).send();
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
    res.json(user)
  })
});

router.post('/changeProfile', checkAuth, (req, res) => {
  let data = req.body;
  try {
    if (data.enteredFirstName == null || data.enteredLastName == null
      || data.enteredAge == null || data.enteredSchool == null
      || data.enteredGender == null || data.enteredPhone == null
      || data.enteredAddress == null) {
      res.status(400).send();
      return
    }
  }
  catch (e) {
    res.status(400).send();
    return
  }

  userModel.updateOne(
    {
      username: res.locals.username,
    }, {
      firstName: data.enteredFirstName,
      lastName: data.enteredLastName,
      age: data.enteredAge,
      school: data.enteredSchool,
      gender: data.enteredGender,
      phone: data.enteredPhone,
      address: data.enteredAddress
    },
    function(err, data){
      if(err) {
        console.log('update info failed.', err);
        return res.status(500).send();
      } else {
        console.log('update info success!');
        return res.status(200).send(data);
      }
    })

});

router.post('/addTag', checkAuth, (req, res) => {
  let data = req.body;

  try {
    if (data.tag == null || data.tag === '') {
      res.status(400).send();
      return;
    }
  }
  catch (e) {
    res.status(400).send();
    return;
  }

  let newTag = req.body.tag;
  let tags = [];
  userModel.findOne({username: res.locals.username}, (err, user) =>{
    if (err){
      res.status(500).send();
      return;
    }
    if (!user) {
      res.status(403).send();
      return;
    }
    tags = user.userTags;
    console.log('the old tag array: ', tags);

    //repeated tag check!
    for (let tempTag of tags) {
      if (tempTag === newTag) {
        console.log('repeated tag detected!');
        res.status(406).send();
        return;
      }
    }

    tags.push(newTag);
    console.log('the new tag array: ', tags);
    userModel.updateOne({username: res.locals.username},
      { userTags: tags },  function(err, data){
        if(err){
          console.log('the err is', err)
        }
        else {
          console.log('the tag after add is: ', tags)
        }
      })// end updateOne

  });// end findOne

});// end function

router.post('/checkFollowStatus', checkAuth, (req, res) => {
  console.log('checkFollowStatus');
  try {
    if (req.body.username == null || req.body.username === '') {
      res.status(400).send();
      return
    }
  }
  catch (e) {
    res.status(400).send();
    return
  }

  const username = res.locals.username;
  const userToCheck = req.body.username;
  console.log(userToCheck);

  let followed = false;

  userModel.findOne({username: username})
    .populate('userFollowed')
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send();
        return;
      }
      if (!user) {
        res.status(403).send();
        return;
      }

      for (let tempFollow of user.userFollowed) {
        if (tempFollow.followedUserName === userToCheck) {
          followed = true;
          console.log('the follow status: ', followed);
          res.status(200).send({followed});
          return;
        }
      }
      res.status(200).send({followed});

    });

});

router.post('/reset', checkAuth, (req, res) => {
  console.log('resetting');
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

    userModel.findOneAndUpdate({username: res.locals.username}, { $set: {
        'userPosts': [],
        'userTags': [],
        'userFollowed': []
      }
    } , (err) => {
      if (err) {console.log(err)}
      console.log(done);
    })

  });
});

module.exports = router;
