const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    movieId: {type: Number, required: true},
    movieName: {type: String, required: false},
}, {
    timestamps: true,
});

searchSchema.index({ movieId: 1}, { unique: true });

const Search = mongoose.model('Search', searchSchema);

module.exports = Search;