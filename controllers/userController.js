const db = require('../models');

module.exports = {
  getAllUsers(req, res) {
    db.User
      .find({})
      .then(userData => res.json(userData))
      .catch(err => res.status(422).json(err));
  },
  getUser(req, res) {
    db.User
      .find({ username: req.params.user })
      .then(user => {
        res.json({
          message: 'Secure route accessed',
          user: user,
          token: req.query.secret_token
        });
      })
      .catch(err => res.status(422).json(err));
  },
  addUser(req, res) {
    db.User
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  updateUser(req, res) {
    db.User
      .updateOne(
        { username: req.params.user },
        { $set: req.body },
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  deleteUser(req, res) {
    db.User
      .find({ username: req.params.user })
      .then(userData => userData.remove())
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  clearUsers(req, res) {
    db.User
      .remove({})
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};
