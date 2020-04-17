import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
const axios = require('axios');

const api = require('./helpers/api');

export default function App() {
  const [movieId, setMovieId] = useState(550)
  const [movieName, setMovieName] = useState('Unknown')

  const fetchMovieName = () => {
    api.getMovieName(setMovieName, movieId);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Movie Id"
        value = {String(movieId)}
        onChangeText = {(enteredMovieId) => setMovieId(Number(enteredMovieId))}
      />
      <Text>{movieName}</Text>
      <Button title="Get Movie Name" onPress={fetchMovieName} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
