const router = require('express').Router();
const { validationCreateMovie, validationGetMovieById } = require('../utils/regex');

const { deleteMovie, createMovie, getMovies } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validationCreateMovie, createMovie);
router.delete('/movies/:_id', validationGetMovieById, deleteMovie);

module.exports = router;
