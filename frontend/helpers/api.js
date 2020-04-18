const axios = require('axios');

const API_URI = "http://192.168.0.64:5000"
const API_SEARCH = "/search"

module.exports = {
    liveSearch: (searchString, page) => {
        return axios.get(API_URI + API_SEARCH,
        {
            params: {
              searchString: searchString,
              page: page
            }
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log("Error: " + error);
        });
    }
}


