const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    title: { type: String ,
        required: [
            true,
            "Movie title is required!"
        ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]

}, { timestamps: true });
module.exports = mongoose.model('Movie', MovieSchema);