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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./passport');

passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((userId, done) => {
  db.User.find({ _id: userId }, (err, user) => done(err, user));
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
