const  jwt = require("jsonwebtoken");
const userModel = require('../models/User');

module.exports = (req, res, next) =>{
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secretKey");

    userModel.findOne({token: token}, (err, user) => {
      if (err) {
        throw new Error('invalid token user combination')
      }
      res.locals.username = user.username;
    });
    next();
  } catch (error) {
    res.status(401).send('Invalid auth');
  }
};
