const express = require('express');
const router = express.Router();

const userModel = require('../models/User');
const auth = require('../middleware/check-auth');

router.post('/findUser', auth, (req, res) => {

});

module.exports = router;
