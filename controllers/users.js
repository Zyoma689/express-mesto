const User = require('../models/user');
const { notFoundError, internalServerError, getError } = require('../errors/errors');

const notFoundMessage = { message: 'Запрашиваемый пользователь не найден' };

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(() => {
      internalServerError(res);
    });
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        notFoundError(res, notFoundMessage);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      getError(res, err, notFoundMessage);
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      getError(res, err, notFoundMessage);
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        notFoundError(res, notFoundMessage);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      getError(res, err, notFoundMessage);
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        notFoundError(res, notFoundMessage);
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      getError(res, err, notFoundMessage);
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
