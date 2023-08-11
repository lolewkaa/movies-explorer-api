const Movie = require('../models/movies');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ErrorForbidden = require('../errors/forbidden-error');

const getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .populate(['owner', '_id'])
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: _id,
    })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .then((movie) => {
      if (!movie) throw new NotFoundError('Карточка не найдена');
      if (req.user._id !== movie.owner.toString()) {
        throw new ErrorForbidden('Попытка удалить чужую карточку');
      }
      movie.deleteOne()
        .then(() => res.send(movie))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  deleteMovie,
  createMovie,
  getMovies,
};
