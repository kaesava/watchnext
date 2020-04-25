import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';
import rootReducer from './reducer'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import SearchComponent from './modules/Search/SearchApp';
import MovieDetailComponent from './modules/Movie/MovieApp';
import thunk from 'redux-thunk';

const Stack = createStackNavigator();

export default function App() {

  const middlewares = [thunk];

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
  }
  const store = createStore(rootReducer,applyMiddleware(...middlewares));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={SearchComponent}
            options={{ title: 'WatchNext?' }}
           />
          <Stack.Screen name="Movie" component={MovieDetailComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>    
  );
}
