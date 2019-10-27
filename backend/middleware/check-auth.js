const  jwt = require("jsonwebtoken");
const userModel = require('../models/User');

module.exports = (req, res, next) => {
  try {
    console.log(1);
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secretKey");
    console.log(1);

    userModel.findOne({token: token}, (err, user) => {
      if (err) {
        res.status(401).send('invalid token user combination');
        return
      }
      res.locals.username = user.username;
      console.log(res.locals.username);
      next();
    });
    console.log('end mid')
  } catch (error) {
    res.status(401).send('Invalid auth');
  }
};
