const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const checkAuth = require('../middleware/check-auth');

router.get('/getOthers', checkAuth, (req, res) => {

});

router.post('/follow', checkAuth, (req, res) => {

});

router.post('/unfollow', checkAuth, (req, res) => {

});

router.post('/changeFollowedTag', checkAuth, (req, res) => {

});

router.get('/', checkAuth, (req, res) => {

});

router.post('/changeProfile', checkAuth, (req, res) => {

  userModel.updateOne(
    {
      username: req.body.username,
    }, {
      username: req.body.newUserName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      // password: req.body.email,

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
  console.log('the user name', res.locals.username);
  console.log('the new tag is: ', req.body.tag);
  let tag = req.body.tag;
  userModel.updateOne({username: res.locals.username},
    {
      $push:{userTags: tag }
    });

});

module.exports = router;
