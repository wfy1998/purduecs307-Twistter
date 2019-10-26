const express = require("express");
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const db = "mongodb+srv://feiyang:feiyang@cluster0-is36o.mongodb.net/test?retryWrites=true&w=majority";
const email = require("emailjs");
const checkAuth = require("../middleware/check-auth")


mongoose.set('useCreateIndex', true);
mongoose.connect(db,{ useNewUrlParser: true,  useUnifiedTopology: true  });
mongoose.connection.on("error", function (error) {
  console.log("Fail to connect to mongoDB.", error);
});
mongoose.connection.on("open", function () {
  console.log("Connected to mongoDB!");
});

/* -------------------- authentication part ----------------- */

/* ---- /api/login ---- */
router.use('/login', require('./authentication '));
/* ---- /api/register ---- */
router.use('/register', require('./register'));
/* ---- /api/logout ---- */
/* -------------------- profile part ------------------------ */

/* ---- /api/ ---- */
//todo

/* -------------------- timeline part ----------------------- */



/* -------------------- posts part -------------------------- */

router.use('/posts', require('./posts'));

/* ---------------------- tag part -------------------------- */






// empty email now
// const server = email.server.connect({
//   user: "",
//   password: "",
//   host: "smtp.gmail.com",
//   ssl: true
// });
//
// router.post('/findPassword', (req, res)=>{
//   console.log('in the post');
//   let userEmail = req.body;
//   console.log('the userEmail in the req is', req.body.email);
//
//   User.findOne({email: userEmail.email},(err, user) =>{
//     if(err){
//       console.log(err)
//     }
//     else if (!user) {
//       res.status(401).send('Cannot find user');
//     }
//     else {
//
//       server.send({
//         text:    "your password is...",
//         from:    "you <feiyangwang980616@gmail.com>",
//         to:      "me <13922712696@163.com>",
//         cc:      "",
//         subject: "testing emailjs"
//       }, function(err, message) { console.log(err || message); });
//       res.status(201).json({
//         message: "user found",
//       });
//     }
//   })
//
// });

module.exports = router;
