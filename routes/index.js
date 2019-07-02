const path = require('path');
const router = require('express').Router();
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
  router.post('/login', 
    passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
    })
  );
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

  // Error Handler
  // router.use((err, req, res) => {
  //   console.error(err.stack);
  //   res.status(500);
  // });

  return router;
}

// router.use((req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

module.exports = authenticate;
