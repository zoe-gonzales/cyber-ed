/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('passport');
const db = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (deployed)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(bodyParser.json({ type: 'application/json' }));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local
const LocalStrategy = require('passport-local').Strategy;
const local = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'userPassword'
},
  (username, userPassword, done) => {
  db.User.findOne({ username })
    .then(user => {
      // saving code that completes bcrypt comparison
      // !user || !user.validPassword(userPassword)
      if (!user.username) {
        done(null, false, { message: "Invalid username/password" });
      } else {
        done(null, user);
      }
    })
    .catch(err => done(err));
});

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((userId, done) => {
  db.User.findById(userId, (err, user) => done(err, user));
});
passport.use('local', local);

app.use('/', routes(passport));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cyberdb', { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

module.exports = app;
