const dotenv = require('dotenv');
dotenv.config();
const router = require('express').Router();
// const jwt = require('jsonwebtoken');
const apiRoutes = require('./api');
const User = require('../models/user');
require('../passport');

router.use('/api', apiRoutes);

const loggedInOnly = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect('/login');
};

const loggedOutOnly = (req, res, next) => {
  if (req.isUnauthenticated()) next();
  else res.redirect('/');
};

const authenticate = passport => {
  // Main
  router.get('/', (req, res) => {
    console.log(req.user);
    res.json('success');
  });
  // Login View
  router.get('/login', (req, res) => {
    res.json('logged in');
  });
  // Login Handler
  router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, function (err, user, info) {
      if (err || !user) {
        res.status(400).json({
          message: 'User not found',
          user: user
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) res.send(err);
        // const token = jwt.sign(user.toJSON(), process.env.SECRET, { expiresIn: 86400 * 70 });
        // jwt.verify(token, process.env.SECRET, function(err, data){
        console.log(user);
        res.send({
          message: 'Logged in Successfully',
          redirect: `/user/${user.username}`,
          // jwtToken: `JWT ${token}`,
          success: true,
          user: user,
          // token: 'Bearer ' + token
        });
      //  })
      })(req, res);
    // next();
  })
});

  // Signup View
  router.get('/signup', (req, res) => {
    res.json('signed up');
  });
  // Signup Handler
  router.post('/signup', (req, res, next) => {
    User.create(req.body)
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
  // Logout Handler
  router.all('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
}

module.exports = authenticate;
