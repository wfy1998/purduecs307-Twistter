const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const userModel = require("../models/User");

router.post('/getTags', checkAuth, (req, res)  => {
  console.log("getting tags");
  userModel.findOne({username: res.locals.username}, (err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send("user not found");
      return;
    }
    if (!user) {
      res.status(403).send("user not found");
      return;
    }
    console.log(user.userTags);
    res.status(200).send(Array.from(user.userTags))
  });

});

module.exports = router;
