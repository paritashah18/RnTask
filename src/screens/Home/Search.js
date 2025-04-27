import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Search = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Work in progress!!</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
     fontWeight: '600',
  },
});
