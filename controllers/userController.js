const dotenv = require('dotenv');
dotenv.config();
const db = require('../models');
const jwt = require('jsonwebtoken');

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
      .then(user => res.json(user))
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
      .deleteOne({ username: req.params.user })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  clearUsers(req, res) {
    db.User
      .deleteMany({})
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};
