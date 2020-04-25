const axios = require('axios');

const API_URI = "https://api.themoviedb.org/3"
const API_SEARCH_PERSON = "/search/person"
const API_DISCOVER_MOVIE = "/discover/movie"
const API_GENRE_MOVIE = "/genre/movie/list"
const Constants = require("../helpers/constants");

const STD_PARAMS = {
    api_key: '1dd386ab15a98a02925126ecfdb3086a',
    language: 'EN_AU',
    include_adult: false,
    region: 'AU',
}
module.exports = {

    refreshGenresFromAPI: () =>  {
        return axios.get(API_URI + API_GENRE_MOVIE,
            {
                params: {...STD_PARAMS, 
                }
            }
        )
        .then(response => {
            genres = response.data.genres;
            newGenres = [];
            genres.forEach(genre => {
                newGenres.push({
                    tId: genre.id,
                    name: genre.name
                });
            });
            return newGenres;
        })
        .catch(error => {
            throw error;
        }); 
    },

    filterSearch: (filterSearchString, filterPage, filterType = Constants.FILTER_TYPE_PERSON) => {
        switch(filterType) {
            case Constants.FILTER_TYPE_PERSON: 
            if(!page) { page = 1;}
            if(!filterSearchString || filterSearchString === "") { throw("Empty filter search");}

            return axios.get(API_URI + API_SEARCH_PERSON,
                {
                    params: {...STD_PARAMS, 
                        query: encodeURI(filterSearchString),
                        page: filterPage,
                    }
                }
            )
            .then(response => {
                results = response.data.results;
                newResults = [];
                results.forEach(result => {
                    newResults.push({
                        type: filterType,
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
                console.error(error);
                return [];
            });  
        }
    },

    discoverSearch: (personIds, genreIds, page) => {
        console.log("personIds: " + personIds + "; genreIds: " + genreIds + "; page: " + page, )
        if(!page) { page = 1;}
        const apiParams = {...STD_PARAMS, page: page};
        if(personIds) apiParams.with_people = encodeURI(personIds);
        if(genreIds) apiParams.with_genres = encodeURI(genreIds);
        return axios.get(API_URI + API_DISCOVER_MOVIE,
            {
                params: apiParams
            }
        )
        .then(response => {
            results = response.data.results;
            newResults = [];
            results.forEach(result => {
                newResults.push({
                    type: "movie",
                    tId: result.id,
                    title: result.title,
                    popularity: result.popularity,
                    voteCount: result.vote_count,
                    posterPath: result.poster_path,
                });
            });
            return newResults;
          })
          .catch(error => {
            console.error(error);
          });  
    }
}


