const  jwt = require("jsonwebtoken");
const userModel = require('../models/User');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secretKey");
    userModel.findOne({token: token}, (err, user) => {
      if (err) {
        res.status(401).send('invalid token user combination');
        return
      }
      res.locals.username = user.username;
      console.log('the username is middleware', res.locals.username);
      next();
    });
  } catch (error) {
    res.status(401).send('Invalid auth');
  }
};
