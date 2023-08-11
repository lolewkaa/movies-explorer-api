const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { validationCreateUser, validationLogin } = require('../utils/regex');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильно введен адрес'));
});

module.exports = router;
