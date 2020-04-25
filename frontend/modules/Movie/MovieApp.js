import React , { Component } from 'react';
import { StyleSheet, TextInput, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Constants from '../../helpers/constants';

import {
  actionInitialise,
  actionInitialiseFailed,
} from './actions';

class MovieDetailComponent extends Component {


  initialise = () => {
    this.props.initialise(this.props.selectedMovieTId)
  }

  componentDidMount() {
      this.initialise();
  }
  render() {
      return(
          //call initialise()
      <View style={styles.container}>
          {this.props.errorMsg != "" && !this.props.initialising &&
            <Text style={{color: 'red'}}>{this.props.errorMsg}</Text>
          }
          {this.props.initialising &&
            <ActivityIndicator size="large" color="#00ff00" />
          }
          {this.props.errorMsg == "" && this.props.selectedMovie &&
          <Text>{this.props.selectedMovie.title}</Text>
          }
          </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    selectedMovieTId: state.filterSearch.selectedMovieTId,
    selectedMovie: state.movieDetail.selectedMovie,
    initialising: state.movieDetail.initialising,
    errorMsg: state.movieDetail.errorMsg,
  }
}

mapDispatchToProps = dispatch => {
  return {
    initialise: (selectedMovieTId) => dispatch(actionInitialise(selectedMovieTId)),
    initialiseFailed: (errorMsg) => dispatch(actionInitialiseFailed(errorMsg))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 50,
    alignItems: 'center',
  },
});
