const axios = require('axios');


const Constants = require("../helpers/constants");

const STD_PARAMS = {
    api_key: '1dd386ab15a98a02925126ecfdb3086a',
    language: 'EN_AU',
    include_adult: false,
    region: 'AU',
}
module.exports = {

    refreshGenresFromAPI: () =>  {
        return axios.get(Constants.API_URI + Constants.API_GENRE_MOVIE,
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
                    key: Constants.FILTER_TYPE_GENRE + "." + genre.id,
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

            return axios.get(Constants.API_URI + Constants.API_SEARCH_PERSON,
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
                        key: filterType + "." + result.id,
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
        if(!page) { page = 1;}
        const apiParams = {...STD_PARAMS, page: page};
        if(personIds) apiParams.with_people = encodeURI(personIds);
        if(genreIds) apiParams.with_genres = encodeURI(genreIds);
        return axios.get(Constants.API_URI + Constants.API_DISCOVER_MOVIE,
            {
                params: apiParams
            }
        )
        .then(response => {
            results = response.data.results;
            newResults = [];
            results.forEach(result => {
                newResults.push({
                    key: Constants.DISCOVER_TYPE_MOVIE + "." + result.id,
                    type: Constants.DISCOVER_TYPE_MOVIE,
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
    },

    getMovieDetails : (tId) => {

        const apiParams = {...STD_PARAMS};
        return axios.get(Constants.API_URI + Constants.API_MOVIE_DETAILS + "/" + tId,
            {
                params: apiParams
            }
        )
        .then(response => {
            result = response.data;
            if(result && result.id) {
                return {
                    key: Constants.DISCOVER_TYPE_MOVIE + "." + result.id,
                    tId: result.id,
                    title: result.title,
                    tagline: result.tagline,
                    overview: result.overview,
                    originalTitle: result.original_title,
                    originalLanguage: result.original_language,
                    voteAverage: Number(result.vote_average),
                    voteCount: Number(result.vote_count),
                    backdropPath: result.backdrop_path,
                    posterPath: result.poster_path,
                    releaseDate: Date(result.release_date),
                    revenue: Number(result.revenue),
                    runTime: Number(result.runtime),
                }
            } else {
                throw "Invalid Movie Id"
            }
          })
          .catch(error => {
            console.error(error);
            throw error
          });  


        
    }
}


