import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, ScrollView, FlatList } from 'react-native';

import LiveSearchResult from './pages/LiveSearch/LiveSearchResult'
import FiltersPanel from './pages/LiveSearch/FiltersPanel';
const api = require('./helpers/api');

export default function App() {
  const [liveSearchString, setLiveSearchString] = useState("")
  const [page, setPage] = useState(1)
  const [liveSearchResults, setLiveSearchResults] = useState([])
  const [inLiveSearch, setInLiveSearch] = useState(true)
  const [filters, setFilters] = useState([])

  const search = (liveSearchString, page) => {
    api.liveSearch(liveSearchString, page)
    .then(receivedSearchResults => {
      if(receivedSearchResults && receivedSearchResults.length > 0) {
        setLiveSearchResults(receivedSearchResults);
      }
      else {
        setLiveSearchResults([])
      }
    })
    .catch(error => {
      setLiveSearchResults([])
      console.log("Error: " + error);
    })
  }

  const cancelLiveSeach = () => {
    setLiveSearchString("")
    setLiveSearchResults([])
  }
  
  const touchAction = (selection) => {
    selection = {...selection, key: (selection.type + "." + selection.tId)};
    filters.push(selection);
    cancelLiveSeach();
  }

  const removeFilter = (selectedFilter) => {
    console.log(selectedFilter)
    setFilters(filters.filter((f) => {
      return (f.key !== selectedFilter.key)
    }));
  }
  return (
    <View style={styles.container}>
      <TextInput
        autoFocus
        placeholder="Enter Search String"
        value = {liveSearchString}
        onChangeText = {(liveSearchString) => {
          setLiveSearchString(liveSearchString);
          search(liveSearchString, page);
        }
        }
      />
      <FlatList
        isVisible={liveSearchString && liveSearchString !== "" && liveSearchResults && liveSearchResults.length > 0}
        data={ liveSearchResults }
        keyExtractor={(result) => result.type+"."+String(result.tId)}
        renderItem={ ({item}) => <LiveSearchResult result={item} touchAction={touchAction}  /> }
        initialNumToRender={6}
      />
       <FiltersPanel filters={filters} removeFilter={removeFilter}></FiltersPanel>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  scrollview: {
  },
  filtersPanel: {
  }
});
