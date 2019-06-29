const mongoose = require('mongoose');

// eslint-disable-next-line prefer-destructuring
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  answer: String,
});

const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;
