const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const checkAuth = require('../middleware/check-auth');

router.post('/findUser', checkAuth, (req, res) => {
  userModel.findOne({username: req.body}, (err, user) => {
    if(err) {
      res.status(500).send(err);
    }
    if(!user){
      res.status(200).send('User not found');
    }
    else {
      console.log('in the find User, the User is: ', user);
      res.status(200).send(user)
    }
  })

});

module.exports = router;
