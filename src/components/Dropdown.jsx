import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Item, SafeAreaView } from 'react-native';
import React from 'react';

export default function Dropdown(props) {
  const { options } = props;

  function handleSelected(location) {
    setIsShowingOptions(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <TextInput
          placeholder="Enter Address"
          placeholderTextColor="#000"
          style={styles.searchBox}
          onChangeText={(text) => handleInput(text)}
          value={placeDescription}
          clearButton={clearInput}
          clearButtonMode="while-editing"
        />
        {
          isShowingOptions && (
            <FlatList
              data={predictions}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.resultItem}
                    onPress={() => handleSelected(item)}>
                    <Text>{item.description}</Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.description}
              style={styles.searchResultsContainer}
            />
          )
        }
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  autocompleteContainer: {
  },
  searchResultsContainer: {
    width: 340,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
  },
  resultItem: {
    width: '100%',
    justifyContent: 'center',
    height: 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingLeft: 15,
  },
  searchBox: {
    width: 340,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: '#aaa',
    color: '#000',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    paddingLeft: 15,
  },
  container: {
    paddingTop: 20,
  },
  button: {
    position: 'absolute',
    bottom: 50
  }
})