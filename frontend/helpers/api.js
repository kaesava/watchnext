const axios = require('axios');

const API_URI = "http://192.168.0.64:5000"
const API_MOVIE = "/search/"
//const API_KEY = "?api_key=1dd386ab15a98a02925126ecfdb3086a"

module.exports = {
    getMovieName: (f, id) => {
        axios.get(API_URI + API_MOVIE + id ) // + API_KEY
        .then(response => {
            f(response.data.movieName);
        })
        .catch(error => {
            console.log(error);
        });
    }
}


