import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Item, SafeAreaView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import ApiContext from '../../context/ApiContext';
import PropertyContext from '../../context/PropertyContext';
import { GoogleAutocomplete, Property } from '../../utils/httpUtils';

const url = "http://localhost:8080/api/properties"

export default function Autocomplete() {

  const navigation = useNavigation()

  const { places } = useContext(ApiContext)
  const { setPropertyContext, setPropertyIdContext } = useContext(PropertyContext)

  const [predictions, setPredictions] = useState([])
  const [isShowingPredictions, setIsShowingPredictions] = useState(true)
  const [placeId, setPlaceId] = useState()
  const [placeDescription, setPlaceDescription] = useState()
  const [goToAddressButton, setShowGoToAddressButton] = useState(false)
  const [location, setLocation] = useState()
  const [verificationCode, setVerificationCode] = useState()

  useEffect(() => {
    setPlaceDescription();
  }, [isShowingPredictions])

  searchLocation = async (locationInput) => {
    // Trying to optomize calls to google; currently it only starts reaching out if the user types in at least 5 characters
    if (locationInput.length < 5) {
      return
    }
    GoogleAutocomplete.getJson(places, locationInput)
      .then((response) => {
        setPredictions(response.data.predictions)
        setIsShowingPredictions(true)
      })
  }

  function handleSelected(location) {
    setLocation(location)
    setPlaceId(location.place_id)
    setPlaceDescription(location.description)
    setIsShowingPredictions(false)
    setShowGoToAddressButton(true)
    postAddress(location)
  }

  function postAddress(location) {
    const address = buildAddress(location)
    if (address) {
      Property.postJson('createProperty', address)
        .then((response) => {
          if (response.error) {
            console.error("API Error: ", response.error)
          }
          else {
            setPropertyContext(response.data)
            setPropertyIdContext(response.data._id)
          }
        })
    }
  }

  function buildAddress(location) {
    return address = {
      number: location.terms[0].value,
      apt: "",
      street: location.terms[1].value,
      city: location.terms[2].value,
      state: location.terms[3].value,
      country: location.terms[4].value,
      placeId: location.place_id
    }
  }

  function clearInput() {
    // that clear button isn't able to actually call this function...hence why the flatlist doesn't go away on clearInput...
    setIsShowingPredictions(false)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.autocompleteContainer}>
        <TextInput
          placeholder="Enter Address"
          placeholderTextColor="#000"
          style={styles.searchBox}
          onChangeText={(locationInput) => searchLocation(locationInput)}
          value={placeDescription}
          clearButton={clearInput}
          clearButtonMode="while-editing"
        />
        {
          // (isShowingPredictions && predictions) && (
          isShowingPredictions && (
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