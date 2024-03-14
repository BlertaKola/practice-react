const Movie = require('../models/movie.model');
const Review = require('../models/review.model')

module.exports.createMovie = (req, res) => {
    let createdMovie;
    Movie.create({
        title: req.body.title,
        user: req.body.user
    })
        .then(async rez => {
            createdMovie = rez;
            const initial = new Review({
                name: req.body.reviews[0].name,
                rating: req.body.reviews[0].rating,
                user: req.body.user,
                movie: rez._id
            })
            await initial.save();
            createdMovie.reviews.push(initial);
            return createdMovie.save();
        })
        .then(rez => res.json(rez))
        .catch(err => res.json(err));

    console.log(req.body)

}


module.exports.getMovies = (req, res) => {
    Movie.find()
        .populate('reviews')
        .populate('user')
        .then(movies => {
            res.json(movies)
        })
        .catch(err => res.status(400).json({message: "unable to get all movies", err}));
}

module.exports.getMovieReviews = (req, res) => {
    Review.find({movie: req.params.id})
        .populate('user')
        .populate('movie')
        .then(rez => res.json(rez))
        .catch(err => res.json(err))
}



module.exports.createReview = (req, res) => {
    Movie.findById(req.params.id)
        .populate('reviews')
        .then(movie => {
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            const newReview = new Review({
                name: req.body.name,
                rating: req.body.rating,
                user: req.body.user,
                movie: movie._id
            });
            return newReview.save()
                .then(review => {
                    movie.reviews.push(review);
                    return movie.save();
                })
                .then(updatedMovie => res.json(updatedMovie))
                .catch(err => res.status(500).json({ error: 'Failed to create review', err }));
        })
        .catch(err => res.status(500).json({ error: 'Failed to find movie', err }));
}