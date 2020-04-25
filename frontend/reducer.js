import { combineReducers } from 'redux';

import filterSearchReducer from './modules/Search/reducer';
import movieDetailReducer from './modules/Movie/reducer';

export default rootReducer = combineReducers({
    filterSearch: filterSearchReducer,
    movieDetail: movieDetailReducer
});


//export const rootReducer = combineReducers({filterSearchReducer});//, movieDetailReducer);