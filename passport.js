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
  async (username, userPassword, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message : 'User not found'});
      }
      await user.validatePassword(userPassword, passwordsMatch => {
        if (!passwordsMatch) {
          return done(null, false, { message : 'Wrong Password'});
        }
      });
      return done(null, user, { message : 'Logged in Successfully'});
    } 
    catch (error) {
      return done(error);
    }
});

const localJWT = new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET
}, async (token, done) => {
    try {
      return done(null, token.user);
    } 
    catch (error) {
      done(error);
    }
}
);

passport.use('local', local);
passport.use(localJWT);

module.export = passport;
