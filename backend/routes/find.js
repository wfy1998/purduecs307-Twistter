const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const auth = require('../middleware/check-auth');

router.post('/findUser', auth, (req, res) => {
  userModel.findOne({username: req.body}, (err, user) => {
    if(err) {
      res.status(500)
    }
  })

});

module.exports = router;
