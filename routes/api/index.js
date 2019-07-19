const router = require('express').Router();
const userRoutes = require('./users');
const quizRoutes = require('./quizzes');
const answerRoutes = require('./answers');

router.use('/users', userRoutes);
router.use('/quizzes', quizRoutes);
router.use('/answers', answerRoutes);

module.exports = router;
