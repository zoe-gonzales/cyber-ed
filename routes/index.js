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
  router.get('/', loggedInOnly, (req, res) => {
    // Something here
    res.json('hi')
  });
  // Login View
  // router.get("/login", loggedOutOnly, (req, res) => {
  //   Something here    
  // });
  // Login Handler
  router.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true
    })
  );
  // Signup View
  // router.get("/signup", loggedOutOnly, (req, res) => {
  //   Something here
  // });
  // Signup Handler
  router.post("/signup", (req, res, next) => {
    const { username, password } = req.body;
    User.create({ username, password })
      .then(user => {
        req.login(user, err => {
          if (err) next(err);
          else res.redirect("/");
        });
      })
      .catch(err => {
        if (err.name === "ValidationError") {
          req.flash("Sorry, that username is already taken.");
          res.redirect("/signup");
        } else next(err);
      });
  });
  // Logout Handler
  router.all("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
  });

  // Error Handler
  router.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).end(err.stack);
  });
}

router.use((req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router, authenticate;
