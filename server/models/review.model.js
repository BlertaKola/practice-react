const mongoose = require('mongoose');
const ReviewSchema = new mongoose.Schema({
    name: { type: String ,
        required: [
            true,
            "Movie review is required!"
        ]
    },
    rating: {
        type: Number
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie"

    }

}, { timestamps: true });
module.exports = mongoose.model('Review', ReviewSchema);