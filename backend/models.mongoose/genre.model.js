const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    key: {type: Number, required: true},
    lastRefreshDatetime: {type: Number, required: true},
    genres: [{
        tId: {type: Number, required: true},
        name: {type: String, required: true}
    }]
}, {
    timestamps: false,
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;