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

module.exports = router;
