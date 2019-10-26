const express = require('express');
const router = express.Router();
const userModel = require('../models/User');
const checkAuth = require("../middleware/check-auth")



router.get('/getMorePosts', checkAuth, (req, res, )  => {

});

router.get('/likePost', checkAuth, (req, res, )  => {

});

router.get('/quote', checkAuth, (req, res, )  => {

});




module.exports = router;

