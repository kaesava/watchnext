const axios = require('axios');

const Constants = require("../../helpers/constants");

module.exports = {
    filterSearch: (filterType, searchString, page) => {
        switch(filterType) {
        case Constants.FILTER_TYPE_GENRE:
        case Constants.FILTER_TYPE_PERSON:
            return axios.get(Constants.API_URI + Constants.API_SEARCH,
            {
                params: {
                filterType: filterType,
                searchString: searchString,
                page: page
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
                throw(error);
            });
            break;
        }
    },

    discoverSearch: (personIds, genreIds, page) => {
        const filterParams = {page: page}
        if(personIds && personIds.length > 0) filterParams.personIds = personIds.join();
        if(genreIds && genreIds.length > 0) filterParams.genreIds = genreIds.join();

        return axios.get(Constants.API_URI + Constants.API_DISCOVER,
        {
            params: filterParams
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            throw(error);
        });
    }
}


