require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(session({
  secret: process.env.EX_SECRET,
  saveUninitialized: true,
  resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ withCredentials: true, origin: '*' }));
app.options('*', cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

require('./passport');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((userId, done) => {
  db.User.find({ _id: userId }, (err, user) => done(err, user));
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Method', 'POST, GET');
  res.header('Access-Control-Request-Headers', 'Authorization')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', routes(passport));

// Serve up static assets (deployed)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cyberdb', { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

module.exports = app;
