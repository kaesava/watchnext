const mongoose = require('mongoose');

const liveSearchSchema = new mongoose.Schema({
    searchStringURIEncoded: {type: String, required: true},
    pageNumber: {type: Number, required: true},
    adult: {type: String, required: false},
}, {
    timestamps: true,
});

liveSearchSchema.index({ searchString: 1, pageNumber: 1}, { unique: true });

const LiveSearch = mongoose.model('LiveSearch', liveSearchSchema);

module.exports = LiveSearch;