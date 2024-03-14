const MovieController = require('../controllers/movie.controllers');
const {authenticate} = require('../config/jwt.config')
module.exports = (app) => {
        app.get('/api/movies', authenticate, MovieController.getMovies)
        app.post('/api/movies', authenticate, MovieController.createMovie)
        app.get('/api/movies/:id', authenticate, MovieController.getMovieReviews)
        app.post('/api/movies/:id', authenticate, MovieController.createReview)

}