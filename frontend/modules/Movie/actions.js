const api = require('./api');
const Constants = require("../../helpers/constants");

export const ActionTypes = {
    INITIALISE_STARTED: 'INITIALISE_STARTED',
    INITIALISE_FAILED: 'INITIALISE_FAILED',
    INITIALISE_RETRIEVED: 'INITIALISE_RETRIEVED', 
}

// Action creators

const actionInitialiseStarted = () => {
    return {
      type: ActionTypes.INITIALISE_STARTED,
    }
}

export const actionInitialiseFailed = (errorMsg) => {
    return {
      type: ActionTypes.INITIALISE_FAILED,
      payload: errorMsg
    }
}

const actionInitialiseRetrieved = (movieDetails) => {
    return {
        type: ActionTypes.INITIALISE_RETRIEVED,
        payload: movieDetails
    }
}

export const actionInitialise = (selectedMovieTId) => {
    return (dispatch => {
    
      if(!selectedMovieTId || selectedMovieTId < 0) {
          dispatch(actionInitialiseFailed("Invalid Movie ID"));
          return;
      }
      dispatch(actionInitialiseStarted())
      //results = [{tId: 3, type: 'person', name: 'Brad Pitt', knownFor: 'Acting', profilePath: '/1.jpg'}];
      
      api.getMovies(selectedMovieTId)
      .then(result => {
            dispatch(actionInitialiseRetrieved(result))
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
        dispatch(actionInitialiseFailed(errorMsg))
      })
    })
  }