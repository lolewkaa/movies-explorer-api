const router = require('express').Router();
const { validationCreateMovie, validationGetMovieById } = require('../utils/regex');

const { deleteMovie, createMovie, getMovies } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:movieId', validationGetMovieById, deleteMovie);

module.exports = router;
