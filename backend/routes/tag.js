const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth");


router.get('/getTags', checkAuth, (req, res, )  => {

});

module.exports = router;
