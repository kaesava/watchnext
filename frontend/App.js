import React from 'react';
import { rootReducer } from './reducer'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import SearchComponent from './modules/Search/SearchApp';
import thunk from 'redux-thunk';

export default function App() {

  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    //middlewares.push(logger);
  }
  const store = createStore(rootReducer,applyMiddleware(...middlewares));

  return (
    <Provider store={store}>
      <SearchComponent />
    </Provider>    
  );
}
