const Constants = require("../../helpers/constants");

const initialFilterSearchState = {
    selectedMovie: {},
    initialising: false,
    errorMsg: ""
}
import {ActionTypes} from './actions';

export default movieDetailReducer = (state = initialFilterSearchState, action) => {
    var returnState = state;
    switch (action.type) {
        case ActionTypes.INITIALISE_STARTED:
            returnState = {...state,  selectedMovie: {}, errorMsg: "", initialising: true};
            break;
        case ActionTypes.INITIALISE_FAILED:
            returnState = {...state,  selectedMovie: {}, errorMsg: action.payload, initialising: false};
            break;
        case ActionTypes.INITIALISE_RETRIEVED:
            returnState = {...state,  selectedMovie: action.payload, errorMsg: "", initialising: false};
            break;
        default:
            returnState = state;
        }
        return returnState;
}