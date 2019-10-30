const utility = require('utility');
const express = require('express');
const router = express.Router();

const userModel = require('../models/User');

router.post('/', (req, res, next) => {
  console.log('register request');
  /* validation */
  try {
    if (!(req.body.username.length >= 1 &&
          req.body.username.length <= 64)) {
      console.log('register request exception 1');
      throw new Error('name length exception')
    }
  } catch (exception) {
    console.log('register request exception redirect');
    console.log(exception);
    res.status(400).redirect('/register');
    return
  }

  console.log('register request verification');
  //todo validation of http request body
  const newUser = new userModel();
  newUser.firstName = req.body.firstName;
  newUser.lastName = req.body.lastName;
  newUser.email = req.body.email;
  newUser.username = req.body.username;
  newUser.password = utility.md5(req.body.password, 'base64');

  newUser.userTags = [];

  newUser.age = '-1';
  newUser.school = '';
  newUser.gender = '';
  newUser.phone = '';
  newUser.address = '';

  newUser.save((err) => {
    if (err) {
      console.log(err);
      res.status(500);
      return
    }

    console.log('new user created');
    res.status(201).redirect('/')
  })
});

module.exports = router;
