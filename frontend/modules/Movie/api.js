const axios = require('axios');

const Constants = require("../../helpers/constants");

module.exports = {
    getMovies: (tId) => {
        if(!tId || tId < 0) {
            return []
        }
        return axios.get(Constants.API_URI + Constants.API_MOVIE_DETAILS + "/" + tId)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw(error);
        });
    }
}


