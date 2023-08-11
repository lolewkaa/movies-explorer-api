const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const { NODE_ENV, JWT_SECRET } = process.env;

const ErrorAuth = require('../errors/auth-error');
const ErrorConflict = require('../errors/conflict-error');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send(user.toJSON()))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданные данные некорректны'));
        return;
      } if (err.code === 11000) {
        next(new ErrorConflict('При регистрации указан email, который уже существует'));
        return;
      }
      next(err);
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new ErrorAuth('Пользователь не найден'))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((validUser) => {
          if (validUser) {
            const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key', { expiresIn: '7d' });
            res.send({ token });
          } else {
            throw new ErrorAuth('Передан неверный логин или пароль');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.send(user))
    .catch((err) => next(err));
};

module.exports = {
  updateUser,
  getUserInfo,
  createUser,
  login,
};
