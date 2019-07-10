const db = require('../models');

module.exports = {
  getAllQuizzes(req, res) {
    db.Quiz
      .find({})
      .then(quizData => res.json(quizData))
      .catch(err => res.status(422).json(err));
  },
  getQuiz(req, res) {
    db.Quiz
      .find({ _id: req.params.id })
      .then(quizData => res.json(quizData))
      .catch(err => res.status(422).json(err));
  },
  addQuiz(req, res) {
    const answers = { answers: req.body };
    db.Quiz
      .create(answers)
      .then(quizData => {
        return db.User
          .findOneAndUpdate(
            { username: req.params.user },
            { $push: { quizzes: quizData } },
            { new: true }
          );
      })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  updateQuiz(req, res) {
    db.Quiz
      .updateOne(
        { _id: req.params.id },
        { $set: req.body },
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  deleteQuiz(req, res) {
    db.Quiz
      .find({ _id: req.params.id })
      .then(quizData => quizData.remove())
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
};
