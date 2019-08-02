const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  userPassword: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  quizzes: [{
    type: Schema.Types.ObjectId,
    ref: 'Quiz',
  }],
});

userSchema.plugin(uniqueValidator);

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.userPassword);
};

userSchema.methods.hashPassword = (plainTextPass, cb) => {
  bcrypt.hash(plainTextPass, saltRounds, function(err, hash) {
    if (err) throw err;
    cb(hash);
  });
}

const User = mongoose.model('User', userSchema);
module.exports = User;
