const router = require('express').Router();
const userController = require('../../controllers/userController');

router.route('/')
  .get(userController.getAllUsers)
  .post(userController.addUser)
  .delete(userController.clearUsers);

router.route('/:user')
  .get(userController.getUser)
  .put(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
