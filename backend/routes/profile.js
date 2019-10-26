const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const auth = require('../middleware/check-auth');

router.get('/getOthers', auth, (req, res) => {

});

router.post('/follow', auth, (req, res) => {

});

router.post('/unfollow', auth, (req, res) => {

});

router.post('/changeFollowedTag', auth, (req, res) => {

});

router.get('/', auth, (req, res) => {

});

router.post('/changeProfile', auth, (req, res) => {

});

router.post('/addTag', auth, (req, res) => {

});

module.exports = router;
