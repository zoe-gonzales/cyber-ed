const dotenv = require('dotenv');
dotenv.config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const apiRoutes = require('./api');
const User = require('../models/user');

router.use('/api', apiRoutes);

const loggedInOnly = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect('/');
};

const loggedOutOnly = (req, res, next) => {
  if (req.isUnauthenticated()) next();
  else res.redirect('/');
};

const authenticate = passport => {
  // Login Handler
  router.post('/login', loggedOutOnly, async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {
      User.find({ username: req.body.username })
        .then(data => {
          if (data.length === 0) {
            res.json("User does not exist");
          } else {
            try {
              const body = { username: req.body.username, userPassword: req.body.userPassword };
              const token = jwt.sign({ user: body }, process.env.SECRET);
              res.header('Authorization', `Bearer ${token}`);
              return res.json({
                token,
                body
              }); 
            } 
            catch (error) {
              return next(error);
            }
          }
        });
    })(req, res, next);
  });
  // Signup Handler
  router.post('/signup', (req, res, next) => {
    let user = new User({
      username: req.body.username,
      nickname: req.body.nickname,
    });
    user.hashPassword(req.body.userPassword, hash => {
      user.userPassword = hash;
      User.create(user)
      .then(user => {
        req.login(user, err => {
          if (err) next(err);
          else res.redirect('/');
        });
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          res.redirect('/signup');
        } else next(err);
      });
    });
  });
  // Logout Handler
  router.get('/logout', loggedInOnly, function(req, res) {
    req.logout();
    res.redirect('/');
  });
  return router;
}

module.exports = authenticate;
