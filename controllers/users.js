const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      res.send(user);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      res.send(user);
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
