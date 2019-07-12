const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('passport');
const cors = require('cors');
const db = require('./models');
require('./passport');

const PORT = process.env.PORT || 3001;
const app = express();

// Serve up static assets (deployed)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((userId, done) => {
  db.User.findById(userId, (err, user) => done(err, user));
});

app.use('/', routes(passport));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cyberdb', { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

module.exports = app;
