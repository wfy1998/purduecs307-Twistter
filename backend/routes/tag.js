const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const userModel = require("../models/User");

router.get('/getTags', checkAuth, (req, res)  => {
  console.log("getting tags");
  let data = req.body;
  userModel.findOne({username: data.username}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send("user not found");
    }
    console.log(user.userTags);
    res.status(200).send(user.userTags)
  });

});

module.exports = router;
