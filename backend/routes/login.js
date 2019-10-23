const express = require('express');
const router = express.Router();
const utils = require('utility');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');

// GET /login login page
// router.get('/', (req, res, next) => {
//   res.status(200).send('OK')
// });

// POST /login login request
router.post('/', (req, res, next) => {
  console.log('login request');
  const userData = req.body;
  userModel.findOne({username: userData.username}, (err, user) => {
    console.log(user);
    if (err) {
      console.log('query err occurred');
      res.status(500);
      return
    }

    if (!user) {
      console.log('No matching username');
      res.status(401).send('Invalid username entered!');
      return
    }

    if (utils.md5(user.password, 'base64') !== userData.password) {
      console.log('Unmatched password');
      res.status(401).send('Invalid password entered!')
    } else {
      let payload = {subject: user._id};
      let token = jwt.sign(payload, 'secretKey');
      res.status(200).send({token})
    }

  }); //end User.findOne()

});

module.exports = router;
