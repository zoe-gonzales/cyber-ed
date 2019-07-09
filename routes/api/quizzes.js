const router = require('express').Router();
const quizController = require('../../controllers/quizController');

router.route('/:user')
  .get(quizController.getAllQuizzes)
  .post(quizController.addQuiz);

router.route('/:id')
  .get(quizController.getQuiz)
  .put(quizController.updateQuiz)
  .delete(quizController.deleteQuiz);

module.exports = router;
