const userModel = require('../models/User');

module.exports = (req, res, next) => {
  console.log('repeated follow check');
  const username = res.locals.username;

  try {
    if (req.body.username == null || req.body.username === '') {
      res.status(400).send();
      return
    }
  }
  catch (e) {
    res.status(400).send();
    return
  }

  const userToCheck = req.body.username;

  userModel.findOne({username: username})
    .populate('userFollowed')
    .exec((err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send();
        return;
      }
      if (!user) {
        res.status(403).send();
        return;
      }

      for (let tempFollow of user.userFollowed) {
        if (tempFollow.followedUserName === userToCheck) {
          console.log('repeated follow detected!');
          res.status(406).send();
          return;
        }
      }
      console.log('no repeated follow, continue');
      next();
    });
};
