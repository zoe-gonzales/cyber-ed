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
      .find({ _id: req.params.id })
      .then(userData => res.json(userData))
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
        { _id: req.params.id },
        { $set: req.body },
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  deleteUser(req, res) {
    db.User
      .find({ _id: req.params.id })
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
