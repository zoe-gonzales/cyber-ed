const dotenv = require('dotenv');
dotenv.config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const apiRoutes = require('./api');
const User = require('../models/user');

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
  router.post('/login', loggedOutOnly, async (req, res, next) => {
    passport.authenticate('local', async (err, user, info) => {     
      try {
        if(err || !user){
          const error = new Error('An Error occured');
          return next(error);
        }
        req.login(user, { session : false }, async (error) => {
          if (error) return next(error);
          const body = { username: user.username, userPassword: user.userPassword };
          const token = jwt.sign({ user: body }, process.env.SECRET);
          return res.json({ token });
        });     
      } 
      catch (error) {
        return next(error);
      }
    })(req, res, next);
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
  router.all('/logout', loggedInOnly, function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
}

module.exports = authenticate;
