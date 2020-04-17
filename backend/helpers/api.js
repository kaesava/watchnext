const axios = require('axios');

const API_URI = "https://api.themoviedb.org/3"
const API_MOVIE = "/movie/"
const API_KEY = "?api_key=1dd386ab15a98a02925126ecfdb3086a"

module.exports = {
    getMovieName: (id) => {
        return axios.get(API_URI + API_MOVIE + id + API_KEY);
        //axios.get(API_URI + API_MOVIE + id + API_KEY)
        //.then((response) => {
        //    responseObject = {
        //        movieId: id,
        //        movieName: response.data.title
        //    }
            //res.json(responseObject);
            //return responseObject;
        //})
        //.catch(error => {
        //    console.log(error);
        //});
    }
}


