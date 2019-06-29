const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
});

userSchema.plugin(uniqueValidator);

userSchema.methods.validPassword = password => {
  return bcrypt.compareSync(password, this.password);
};

userSchema.virtual('password').set(value => {
  this.password = bcrypt.hashSync(value, 12);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
