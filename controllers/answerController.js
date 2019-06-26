const db = require('../models');

module.exports = {
  getAllAnswers(req, res) {
    db.Answer
      .find({})
      .then(quizData => res.json(quizData))
      .catch(err => res.status(422).json(err));
  },
  getAnswer(req, res) {
    db.Answer
      .find({ _id: req.params.id })
      .then(answerData => res.json(answerData))
      .catch(err => res.status(422).json(err));
  },
  addAnswer(req, res) {
    db.Answer
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  updateAnswer(req, res) {
    db.Answer
      .updateOne(
        { _id: req.params.id },
        { $set: req.body },
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  deleteAnswer(req, res) {
    db.Answer
      .find({ _id: req.params.id })
      .then(answerData => answerData.remove())
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
};
