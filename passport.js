const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const User = require('./models/user');

const local = new LocalStrategy({
  usernameField: 'username',
  passwordField: 'userPassword'
},
  (username, /* userPassword, */ done) => {
  User.findOne({ username: username })
    .then(user => {
      // saving code that completes bcrypt comparison
      // !user || !user.validPassword(userPassword)
      if (!user) {
        done(null, false, { message: "Invalid username/password" });
      } else {
        done(null, user);
      }
    })
    .catch(err => done(err));
});

const localJWT = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
},
  function(jwtPayload, done) {
    console.log(jwtPayload);
    return User.findOne({id: jwt_payload.sub}, function(err, user) {
      if (err) {
          return done(err, false);
      }
      if (user) {
          return done(null, user);
      } else {
          return done(null, false);
      }
  });
  }
);

passport.use('local', local);
// passport.use(localJWT);

module.export = passport;
