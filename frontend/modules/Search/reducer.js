import {arrayRemoveAllWithKey} from '../../helpers/functions';

const Constants = require("../../helpers/constants");

const initialFilterSearchState = {
    filterSearchType: Constants.FILTER_TYPE_PERSON,
    filterSearchString: "",
    filterSearchPage: 1,
    filterRetrieveInProgress: false,
    filterSearchResults: [],
    filterSearchError: '',
    filters: [],
    discoverSearchPage: 1,
    discoverRetrieveInProgress: false,
    discoverSearchResults: [],
    discoverSearchError: '',
}
import {ActionTypes} from './actions';

export const filterSearchReducer = (state = initialFilterSearchState, action) => {
    var returnState = state;
    switch (action.type) {
        case ActionTypes.FILTER_SEARCH_STRING_CHANGED:
            returnState = {...state,  filterSearchString: action.payload, filterSearchPage: 1, filterSearchResults: []};
            break;
        case ActionTypes.FILTER_SEARCH_STARTED: 
            returnState = { ...state, filterRetrieveInProgress: true, filterSearchError: '', filterSearchResults: [] };
            break;
        case ActionTypes.FILTER_SEARCH_RETRIEVED: 
            returnState = { ...state, filterRetrieveInProgress: false, filterSearchResults: action.payload, filterSearchError: '' };
            break;
        case ActionTypes.FILTER_SEARCH_FAILED:
            returnState = {...state, filterRetrieveInProgress: false, filterSearchResults: [], filterSearchError: action.payload}
            break;
        case ActionTypes.FILTER_SEARCH_TYPE_CHANGED:
            returnState = {... state, filterSearchType: action.payload, filterSearchPage: 1, filterSearchResults: []}
            break;
        case ActionTypes.FILTER_SEARCH_PAGE_CHANGED:
            returnState = {... state, filterSearchPage: action.payload, filterSearchResults: []}
            break;
        case ActionTypes.FILTER_ADDED:
            if(state.filters.filter((f) => { return f.key === action.payload.key }).length == 0) {
                state.filters.push(action.payload);
            }
            returnState = {...state, filterSearchString: "", filterSearchPage: 1, filterRetrieveInProgress: false, filterSearchResults: []}
            break;
        case ActionTypes.FILTER_REMOVED:
            const newFilters = arrayRemoveAllWithKey(state.filters, action.payload)
            returnState = {...state, filters: newFilters, discoverSearchResults: [], discoverSearchError: ''}
            break;
        case ActionTypes.DISCOVER_SEARCH_STARTED: 
            returnState = { ...state, discoverRetrieveInProgress: true, discoverSearchError: '' };
            break;
        case ActionTypes.DISCOVER_SEARCH_RETRIEVED: 
            returnState = { ...state, discoverRetrieveInProgress: false, discoverSearchResults: action.payload, discoverSearchError: '' };
            break;
        case ActionTypes.DISCOVER_SEARCH_FAILED:
            returnState = {...state, discoverRetrieveInProgress: false, discoverSearchResults: [], discoverSearchError: action.payload}
            break;
        default:
            returnState = state;
        }
        //showFilterPanel = false;
        //showDiscoverPanel = false;
        //if(returnState)
        return returnState;
}