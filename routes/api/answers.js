const router = require('express').Router();
const answerController = require('../../controllers/answerController');

router.route('/')
  .get(answerController.getAllAnswers)
  .post(answerController.addAnswer);

router.route('/:id')
  .get(answerController.getAnswer)
  .put(answerController.updateAnswer)
  .delete(answerController.deleteAnswer);

module.exports = router;
