const axios = require('axios');

const API_URI = "https://api.themoviedb.org/3"
const API_MOVIE = "/movie/"
const API_SEARCH_PERSON = "/search/person"
const API_KEY = "?api_key=1dd386ab15a98a02925126ecfdb3086a"
const API_TRAIL = "&language=EN_AU&include_adult=false&region=AU";
module.exports = {

    searchPerson: (query, page) => {
        if(!page) { page = 1;}
        encodedquery = "&query="+encodeURI(query) + "&page=" + page;
        return axios.get(API_URI + API_SEARCH_PERSON + API_KEY + encodedquery + API_TRAIL)
        .then(response => {
            results = response.data.results;
            newResults = [];
            results.forEach(result => {
                newResults.push({
                    type: "person",
                    tId: result.id,
                    name: result.name,
                    popularity: result.popularity,
                    knownFor: result.known_for_department,
                    profilePath: result.profile_path,
                });
            });
            return newResults;
          })
          .catch(error => {
            console.log("Error: " + error);
          });  
    },

    getMovieName: (id) => {
        // return the whole response, which when resolved, returns the movie id and name
        return axios.get(API_URI + API_MOVIE + id + API_KEY)
        .then((response) => {
            responseObject = {
                movieId: id,
                movieName: response.data.title
            }
            return responseObject;
        })
        .catch(error => {
            // TODO: determine type of error - manage timeouts differently from "resource not found"
            responseObject = {
                movieId: id,
                movieName: null
            }
            return responseObject;
        });
    }
}


