const express = require("express");
const router = express.Router();
const User = require('../models/user');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const db = "mongodb+srv://feiyang:feiyang@cluster0-is36o.mongodb.net/test?retryWrites=true&w=majority";
const email = require("emailjs");



mongoose.set('useCreateIndex', true);
mongoose.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true  });
mongoose.connection.on("error", function (error) {
  console.log("Fail to connect to mongoDB.", error);
});
mongoose.connection.on("open", function () {
  console.log("Connected to mongoDB!");
});


// router.get('/events', (req,res) => {
//   res.send('From API route')
// });

router.post('/register', (req, res) => {
  const user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save((err) => {
    if (err) {
      console.log(err)
      console,log("fail to creat")
    } else {
      console.log('user created')
      res.status(201).json({
        message: "user created",

      });

    }
  })
});

router.post('/login', (req, res) => {
  let userData = req.body;
  User.findOne({username: userData.username}, (err, user) => {
    console.log(userData)
    console.log(user)
    if (err) {
      console.log(err)
    } else {
      if (!user) {
        res.status(401).send('Invalid Username')
      } else
      if ( user.password !== userData.password) {
        console.log('invalid password')
        console.log(user.password)
        console.log(userData.password)
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id};
        let token = jwt.sign(payload, 'secretKey');
        res.status(200).send({token})
      }
    }
  })
});
// empty email now
const server = email.server.connect({
  user: "",
  password: "",
  host: "smtp.gmail.com",
  ssl: true
});

router.post('/findPassword', (req, res)=>{
  console.log('in the post');
  let userEmail = req.body;
  console.log('the userEmail in the req is', req.body.email);

  User.findOne({email: userEmail.email},(err, user) =>{
    if(err){
      console.log(err)
    }
    else if (!user) {
      res.status(401).send('Cannot find user');
    }
    else {

      server.send({
        text:    "your password is...",
        from:    "you <feiyangwang980616@gmail.com>",
        to:      "me <13922712696@163.com>",
        cc:      "",
        subject: "testing emailjs"
      }, function(err, message) { console.log(err || message); });
      res.status(201).json({
        message: "user found",
      });
    }
  })

});


module.exports = router;
