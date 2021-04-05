const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { notFoundError, internalServerError, getError } = require('../errors/errors');

const { NODE_ENV, JWT_SECRET } = process.env;
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

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
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
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => {
          res.status(200).send(user);
        })
        .catch((err) => {
          getError(res, err, notFoundMessage);
        });
    })
    .catch((err) => {
      res.status(500).send(err);
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

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  getCurrentUser,
  createUser,
  updateUser,
  updateAvatar,
  login,
};
