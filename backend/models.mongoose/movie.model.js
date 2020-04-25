const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    key: {type: String, required: true, unique: true, trim: true},
    tId: {type: Number, required: true},
    title: {type: String, required: false},
    tagline: {type: String, required: false},
    overview: {type: String, required: false},
    originalTitle: {type: String, required: false},
    originalLanguage: {type: String, required: false},
    voteAverage: {type: Number, required: false},
    voteCount: {type: Number, required: false},
    backdropPath: {type: String, required: false},
    posterPath: {type: String, required: false},
    releaseDate: {type: Date, required: false},
    revenue: {type: Number, required: false},
    runTime: {type: Number, required: false},
}, {
    timestamps: true,
});

movieSchema.index({ key: 1}, { unique: true });

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;