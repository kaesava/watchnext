const api = require('./api');
const Constants = require("../../helpers/constants");

export const ActionTypes = {
    FILTER_SEARCH_STRING_CHANGED: 'FILTER_SEARCH_STRING_CHANGED',
    FILTER_SEARCH_STARTED: 'FILTER_SEARCH_STARTED',
    FILTER_SEARCH_RETRIEVED: 'FILTER_SEARCH_RETRIEVED',
    FILTER_SEARCH_FAILED: 'FILTER_SEARCH_FAILED',
    FILTER_SEARCH_TYPE_CHANGED: 'FILTER_SEARCH_TYPE_CHANGED',
    FILTER_SEARCH_PAGE_CHANGED: 'FILTER_SEARCH_PAGE_CHANGED',
    FILTER_ADDED: 'FILTER_ADDED',
    FILTER_REMOVED: 'FILTER_REMOVED',
    DISCOVER_SEARCH_PAGE_CHANGED: 'DISCOVER_SEARCH_PAGE_CHANGED',
    DISCOVER_SEARCH_STARTED: 'DISCOVER_SEARCH_STARTED',
    DISCOVER_SEARCH_RETRIEVED: 'DISCOVER_SEARCH_RETRIEVED',
    DISCOVER_SEARCH_FAILED: 'DISCOVER_SEARCH_FAILED',
    MOVIE_SELECTED: 'MOVIE_SELECTED',
}

// Action creators

export const actionFilterSearchStringChanged = (filterSearchString) => {
    return {
      type: ActionTypes.FILTER_SEARCH_STRING_CHANGED,
      payload: filterSearchString
    }
}

const actionFilterSearchStarted = () => {
    return {
      type: ActionTypes.FILTER_SEARCH_STARTED,
    }
}

const actionFilterSearchRetrieved = (filterSearchResults) => {
    return {
        type: ActionTypes.FILTER_SEARCH_RETRIEVED,
        payload: filterSearchResults
    }
}

const actionFilterSearchFailed = (error) => {
    return {
        type: ActionTypes.FILTER_SEARCH_FAILED,
        payload: error
    }
}

const actionDiscoverSearchStarted = () => {
    return {
      type: ActionTypes.DISCOVER_SEARCH_STARTED,
    }
}

const actionDiscoverSearchRetrieved = (discoverSearchResults) => {
    return {
        type: ActionTypes.DISCOVER_SEARCH_RETRIEVED,
        payload: discoverSearchResults
    }
}

const actionDiscoverSearchFailed = (error) => {
    return {
        type: ActionTypes.DISCOVER_SEARCH_FAILED,
        payload: error
    }
}

export const actionFilterSearchChangeType = (filterSearchType) => {
    return {
        type: ActionTypes.FILTER_SEARCH_TYPE_CHANGED,
        payload: filterSearchType
    }    
}

export const actionFilterSearchChangePage = (filterSearchPage) => {
    return {
        type: ActionTypes.FILTER_SEARCH_PAGE_CHANGED,
        payload: filterSearchPage
    }
}

export const actionFilterAdded = (filterSearchResult) => {
    return {
        type: ActionTypes.FILTER_ADDED,
        payload: filterSearchResult
    }
}

export const actionFilterRemoved = (filterKey) => {
    return {
        type: ActionTypes.FILTER_REMOVED,
        payload: filterKey
    }
}

export const actionFetchFilterSearch = (filterSearchType, filterSearchString, filterPage) => {
    return (dispatch => {
    
      dispatch(actionFilterSearchStarted())
      //results = [{tId: 3, type: 'person', name: 'Brad Pitt', knownFor: 'Acting', profilePath: '/1.jpg'}];
      
      api.filterSearch(filterSearchType, filterSearchString, filterPage)
      .then(results => {
            dispatch(actionFilterSearchRetrieved(results))
      })
      .catch(error => {
        var errorMsg = "";
        if(error) { 
            errorMsg = ""
            if (error.response) {
                errorMsg = Constants.API_NETWORK_ERROR_MSG
            } else if (error.request) {
                errorMsg = error.request
            } else 
                errorMsg = error.message
        }
        dispatch(actionFilterSearchFailed(errorMsg))
      })
    })
  }

  export const actionDiscoverSearchChangePage = (discoverSearchPage) => {
    return {
        type: ActionTypes.DISCOVER_SEARCH_PAGE_CHANGED,
        payload: discoverSearchPage
    }
  }

  export const actionFetchDiscoverSearch = (filters, discoverPage) => {
    return (dispatch => {
          
      if(filters.length == 0) {
        return;
      }
      
      dispatch(actionDiscoverSearchStarted());

      const personIds = []
      const genreIds = []
      
      if(filters && filters.length > 0) {
        filters.forEach(filter => {
            switch(filter.type) {
                case Constants.FILTER_TYPE_GENRE: genreIds.push(filter.tId); break;
                case Constants.FILTER_TYPE_PERSON: personIds.push(filter.tId); break;
            }
        });
        api.discoverSearch(personIds, genreIds, discoverPage)
        .then(results => {
            dispatch(actionDiscoverSearchRetrieved(results))
        })
        .catch(error => {
            dispatch(actionDiscoverSearchFailed(error))
        })
    }
    })
  }

  export const actionMovieSelected = (selectedMovieId) => {
    return {
        type: ActionTypes.MOVIE_SELECTED,
        payload: selectedMovieId
    }
  }