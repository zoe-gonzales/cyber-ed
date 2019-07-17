const router = require('express').Router();
const userController = require('../../controllers/userController');
const auth = require('../auth');

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.addUser)
  .delete(userController.clearUsers);

router.route('/:user')
  .get(auth, userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
