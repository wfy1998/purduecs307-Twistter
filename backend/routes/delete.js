const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');

router.post('/', checkAuth, (req, res) => {

});

module.exports = router;
