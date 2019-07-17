require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const db = require('./models');
const userRoutes = require('./routes/api/users');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(session({
  secret: process.env.EX_SECRET,
  saveUninitialized: true,
  resave: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ withCredentials: true, origin: 'localhost:3001' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./passport');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((userId, done) => {
  db.User.find({ _id: userId }, (err, user) => done(err, user));
});

app.use(function(req, res, next) {
  let token = req.rawHeaders[9].split('').slice(49, req.rawHeaders[9].length).join('');
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Request-Method', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Authorization', 'Bearer ' + token);
  next();
});

app.use('/', routes(passport));

app.use('/api/users', passport.authenticate('jwt', { session : false }), userRoutes);

// Serve up static assets (deployed)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cyberdb', { useNewUrlParser: true });

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});

module.exports = app;
