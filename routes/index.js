const router = require('express').Router();
const NotFoundError = require('../errors/not-found-err');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const { validationCreateUser, validationLogin } = require('../utils/regex');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

//router.use(auth);
"country": "menshikova.naya@mail.ru",
"director": "password",
"duration": 1000,
"year": "password",
 "description": "password",
 "image": "https://shapka-youtube.ru/wp-content/uploads/2021/03/patsanskaya-kartinka-na-avu.jpg",
 "trailerLink": "https://shapka-youtube.ru/wp-content/uploads/2021/03/patsanskaya-kartinka-na-avu.jpg",
 "nameRU": "password",
 "nameEN": "password",
 "thumbnail": "https://shapka-youtube.ru/wp-content/uploads/2021/03/patsanskaya-kartinka-na-avu.jpg",
 "movieId": 6457567

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Неправильно введен адрес'));
});

module.exports = router;
