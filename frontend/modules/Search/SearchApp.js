import React , { Component } from 'react';
import { StyleSheet, TextInput, View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RadioButton } from 'react-native-paper';

import Constants from '../../helpers/constants';

import {
  actionFilterSearchStringChanged,
  actionFetchFilterSearch,
  actionFilterSearchChangeType,
  actionFilterSearchChangePage,
  actionFilterAdded,
  actionFilterRemoved,
  actionDiscoverSearchChangePage,
  actionMovieSelected,
  actionFetchDiscoverSearch,
} from './actions';

import FilterSearchResult from './components/FilterSearchResult'
import DiscoverResultsPanel from './components/DiscoverResultsPanel'
import FiltersPanel from './components/FiltersPanel';

const MAX_NUM_PAGES = 10;

class SearchComponent extends Component {

  retrieveFilterSearchResults = (filterSearchString) =>  {
    this.props.filterSearchStringChanged(filterSearchString);
    if(filterSearchString !== "") {
      this.refreshFilterSearch(this.props.filterSearchType, filterSearchString, this.props.filterSearchPage)
    }
  }

  changeFilterType = filterSearchType => {
      this.props.filterSearchChangeType(filterSearchType);
      this.refreshFilterSearch(filterSearchType, this.props.filterSearchString, this.props.filterSearchPage)
      this.refs.filterSearchTextInput.focus();
  }

  changeFilterPage = (filterSearchPage) => {
    if(filterSearchPage >= 1 && filterSearchPage <= MAX_NUM_PAGES) {
      this.props.filterSearchChangePage(filterSearchPage);
      this.refreshFilterSearch(this.props.filterSearchType, this.props.filterSearchString, filterSearchPage)
    }
  }
  
  addFilter = (selectedFilter) => {
    if(selectedFilter) {
      this.props.filterAdded(selectedFilter);
      this.refreshDiscoverSearch(this.props.filters, this.props.filterSearchPage);
    }
  }
  
  removeFilter = (filterKey) => {
    if(filterKey) {
      this.props.filterRemoved(filterKey);
      this.refreshDiscoverSearch(this.props.filters, this.props.filterSearchPage);
    }
  }

  refreshFilterSearch = (filterSearchType, filterSearchString, filterSearchPage) => {
    if(filterSearchString == "" && filterSearchType !== Constants.FILTER_TYPE_GENRE) {
      return;
    }
    this.props.fetchFilterSearch(filterSearchType, filterSearchString, filterSearchPage)
  }

  changeDiscoverPage = (discoverSearchPage) => {
    if(discoverSearchPage >= 1 && discoverSearchPage <= MAX_NUM_PAGES) {
      this.props.discoverSearchChangePage(discoverSearchPage);
      this.refreshDiscoverSearch(this.props.filters, discoverSearchPage)
    }
  }

  refreshDiscoverSearch = (filters, discoverSearchPage) => {
    this.props.fetchDiscoverSearch(filters, discoverSearchPage)
  }

  loadMovieDetails = (selectedMovieTId) => {
    this.props.movieSelected(selectedMovieTId)
    this.props.navigation.navigate('Movie')
  }

  render() {
      return(
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <RadioButton
            value={Constants.FILTER_TYPE_PERSON}
            status={this.props.filterSearchType == Constants.FILTER_TYPE_PERSON ? 'checked' : 'unchecked'}
            onPress={() => { this.changeFilterType(Constants.FILTER_TYPE_PERSON) }}
          />
          <Text style={{alignSelf: 'center'}}>{Constants.FILTER_TYPE_PERSON}</Text>
          <RadioButton
            value={Constants.FILTER_TYPE_GENRE}
            status={this.props.filterSearchType == Constants.FILTER_TYPE_GENRE ? 'checked' : 'unchecked'}
            onPress={() => { this.changeFilterType(Constants.FILTER_TYPE_GENRE) }}
          />
          <Text style={{alignSelf: 'center'}}>{Constants.FILTER_TYPE_GENRE}</Text>
        </View>
      <TextInput
        autoFocus
        ref="filterSearchTextInput"
        placeholder="Enter Search String"
        value = {this.props.filterSearchString}
        onChangeText = {(filterSearchString) => { this.retrieveFilterSearchResults(filterSearchString) }}
      />
      <View style={styles.prevNextButtons}>
        {this.props.filterSearchType !== Constants.FILTER_TYPE_GENRE && !this.props.filterRetrieveInProgress && this.props.filterSearchString != "" && this.props.filterSearchPage > 1 && 
          <TouchableOpacity onPress={() => {this.changeFilterPage(this.props.filterSearchPage - 1)}}>
            <Ionicons name="md-arrow-back" size={20} style={{color: '#de9595'}} />
          </TouchableOpacity>
        }
        {this.props.filterSearchType !== Constants.FILTER_TYPE_GENRE && !this.props.filterRetrieveInProgress && this.props.filterSearchString != "" && this.props.filterSearchPage < MAX_NUM_PAGES && 
          <TouchableOpacity onPress={() => {this.changeFilterPage(this.props.filterSearchPage + 1)}}>
            <Ionicons name="md-arrow-forward" size={20} style={{color: '#de9595'}} />
          </TouchableOpacity>
        }
      </View>
      { this.props.filterSearchString != "" && this.props.filterRetrieveInProgress &&
        <ActivityIndicator size="large" color="#00ff00" />
      }
      { this.props.filterSearchError != "" &&
        <Text style={{color: 'red'}}>{this.props.filterSearchError}</Text>
      }
      { this.props.filterSearchResults.length > 0 &&
        <FlatList
          data={ this.props.filterSearchResults }
          renderItem={ ({item}) => <FilterSearchResult result={item} touchAction={(item)=> this.addFilter(item)}  /> }
        />
      }
        <FiltersPanel style={styles.filtersPanel} filters={this.props.filters} filterRemoved={(filterKey) => this.removeFilter(filterKey)} />
        { this.props.discoverRetrieveInProgress &&
        <ActivityIndicator size="large" color="#00ff00" />
        }
        { this.props.filters.length > 0 && this.props.filterSearchResults.length == 0 && !this.props.filterRetrieveInProgress && !this.props.discoverRetrieveInProgress && this.props.discoverSearchResults.length == 0 &&
            <View style={styles.noResultsContainer}><Text>No movies found</Text></View>
        }
        <View style={styles.discoverPanel}>
          <View style={styles.prevNextButtons}>
            {!this.props.discoverRetrieveInProgress && this.props.discoverSearchPage > 1 && 
              <TouchableOpacity onPress={() => {this.changeDiscoverPage(this.props.discoverSearchPage - 1)}}>
                <Ionicons name="md-arrow-back" size={20} style={{color: '#de9595'}} />
              </TouchableOpacity>
            }
            {!this.props.discoverRetrieveInProgress && this.props.discoverSearchPage < MAX_NUM_PAGES && 
              <TouchableOpacity onPress={() => {this.changeDiscoverPage(this.props.discoverSearchPage + 1)}}>
                <Ionicons name="md-arrow-forward" size={20} style={{color: '#de9595'}} />
              </TouchableOpacity>
            }
          </View>
          { this.props.filterSearchResults.length == 0 && !this.props.discoverRetrieveInProgress && this.props.discoverSearchResults.length > 0 &&
          <DiscoverResultsPanel results={this.props.discoverSearchResults} touchAction={(selectedMovieId)=>{this.loadMovieDetails(selectedMovieId)}} />
          }
        </View>
      </View>
    )
  }
}

mapStateToProps = (state) => {
  return {
    filterSearchString: state.filterSearch.filterSearchString,
    filterSearchType: state.filterSearch.filterSearchType,
    filterRetrieveInProgress: state.filterSearch.filterRetrieveInProgress,
    filterSearchResults: state.filterSearch.filterSearchResults,
    filterSearchPage: state.filterSearch.filterSearchPage,
    filterSearchError: state.filterSearch.filterSearchError,
    filters: state.filterSearch.filters,
    discoverSearchPage: state.filterSearch.discoverSearchPage,
    discoverRetrieveInProgress: state.filterSearch.discoverRetrieveInProgress,
    discoverSearchResults: state.filterSearch.discoverSearchResults,
    discoverSearchError: state.filterSearch.discoverSearchError,
  }
}

mapDispatchToProps = dispatch => {
  return {
    filterSearchStringChanged: (filterSearchString) => dispatch(actionFilterSearchStringChanged(filterSearchString)),
    fetchFilterSearch: (filterSearchType, filterSearchString, filterPage) => dispatch(actionFetchFilterSearch(filterSearchType, filterSearchString, filterPage)),
    filterSearchChangeType: (filterSearchType) => dispatch(actionFilterSearchChangeType(filterSearchType)),
    filterSearchChangePage: (filterPage) => dispatch(actionFilterSearchChangePage(filterPage)),
    filterAdded: (filterSearchResult) => dispatch(actionFilterAdded(filterSearchResult)),
    filterRemoved: (filterSearchKey) => dispatch(actionFilterRemoved(filterSearchKey)),
    discoverSearchChangePage: (discoverPage) => dispatch(actionDiscoverSearchChangePage(discoverPage)),
    movieSelected: (selectedMovieTId) => dispatch(actionMovieSelected(selectedMovieTId)),
    fetchDiscoverSearch: (filters, discoverPage) => dispatch(actionFetchDiscoverSearch(filters, discoverPage)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120
  },
  filtersPanel: {
    marginTop: 10,
  },
  discoverPanel: {
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-around'
  },  
  prevNextButtons: {
    flexDirection: 'row',
    width: 80,
    marginTop: 20,
    marginBottom: 20,
    justifyContent: 'space-around'
  },
  noResultsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  scrollview: {
  },
  filtersPanel: {
  }
});
