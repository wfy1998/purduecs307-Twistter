const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const checkAuth = require('../middleware/check-auth');

router.post('/findUser', checkAuth, (req, res) => {
  const data = req.body;
  try {
    if (data.username == null || data.username === '') {
      console.log('null body property');
      res.status(400).send();
      return;
    }
  }
  catch (e) {
    console.log('bad request');
    res.status(400).send();
    return;
  }

  userModel.findOne({username: req.body}, (err, user) => {
    if(err) {
      res.status(500).send('query error');
    }
    if(!user){
      res.status(403).send('User not found');
    }
    else {
      console.log('in the find User, the User is: ', user);
      res.status(200).send(user);
    }
  })

});

module.exports = router;
