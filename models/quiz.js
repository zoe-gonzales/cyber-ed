const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const quizSchema = new Schema({
  answers: Array
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
