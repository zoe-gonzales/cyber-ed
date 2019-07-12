const router = require('express').Router();
const userController = require('../../controllers/userController');
// const passport = require('passport');

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.addUser)
  .delete(userController.clearUsers);

router.route('/:user')
  .get(userController.getUser)
  // .get(passport.authenticate('jwt', { session: false }), userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
