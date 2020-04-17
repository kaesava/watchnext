
function LiveSearchModel(searchString) {
    this.searchString = searchString || null;
}

LiveSearchModel.prototype.getSearchString = () => {
    return this.searchString;
}

LiveSearchModel.prototype.setSearchString = (searchString) => {
    this.searchString = searchString;
}

module.exports = liveSearchModel;