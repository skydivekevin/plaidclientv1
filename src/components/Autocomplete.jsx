import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Item, SafeAreaView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';

import ApiContext, { places } from '../../context/ApiContext';
import PropertyContext from '../../context/PropertyContext';

const url = "http://localhost:8080/api/properties"

export default function Autocomplete() {

  const navigation = useNavigation()

  const { places, setPlaces } = useContext(ApiContext)
  const { property, setProperty } = useContext(PropertyContext)

  const [predictions, setPredictions] = useState([])
  const [isShowingPredictions, setIsShowingPredictions] = useState(true)
  const [placeId, setPlaceId] = useState()
  const [placeDescription, setPlaceDescription] = useState()
  const [goToAddressButton, setShowGoToAddressButton] = useState(false)
  const [location, setLocation] = useState()
  const [verificationCode, setVerificationCode] = useState()

  const baseUrl = 'http://localhost:8080/api';

  useEffect(() => {
    setPlaceDescription();
  }, [isShowingPredictions])

  useEffect(() => {
    if (!places) {
      getPlaces()
    }
  })

  function getPlaces() {

    axios({
      method: 'GET',
      url: `${baseUrl}/utils/fetchGoogle`,
    })
      .then(res => {
        const places = res.data.places
        setPlaces(places)
      })
      .catch(err => console.log("err: ", err))
  }

  searchLocation = async (locationInput) => {
    // Trying to optomize calls to google; currently it only starts reaching out if the user types in at least 5 characters
    if (locationInput.length < 5) {
      return
    }
    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${places}&input=${locationInput}`,
    })
      .then((res) => {
        setPredictions(res.data.predictions)
        setIsShowingPredictions(true)
      })
      .catch((err) => {
        console.log("error: ", err)
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
      axios({
        method: 'POST',
        url: url,
        data: address
      })
        .then(res => {
          const property = res.data
          setProperty(property)
        })
        .catch(err => console.log("error: ", err))
    }
  }

  function claimProperty() {
    //axios POST to person, claiming property


    //if successful, navigation.navigate("Dashboard")

    //for property claiming, there are two methods:
    // 1: We send out a mailer to each address with quotes (or maybe even without?) with a code that the user can enter to create an account
    // 2: A vender does a quote on a house, gets a link to send to the homeowner, which gives the homeowner access to the quotes just from that vendor. The homeowner can purchase the service 
    // through the provided link, and maybe once they purchase a service (maybe $50 min service? Not sure about that yet...) the homeowner can then register for an account.

    // Another possibility: The vendor sends a link to the homeowner, link requires the homeowner to create a "provisional" account, which gives them a login to access the app etc. but only allows them 
    // to see quotes from their referring vendor

    // Verification code should be a one time use code, generated when someone wants to claim a property, and is removed from the property when it is used
  }

  function buildAddress(location) {
    return address = {
      number: location.terms[0].value,
      apt: "",
      street: location.terms[1].value,
      city: location.terms[2].value,
      state: location.terms[3].value,
      country: location.terms[4].value,
    }
  }

  function clearInput() {
    // that clear button isn't able to actually call this function...hence why the flatlist doesn't go away on clearInput...
    setIsShowingPredictions(false)
    console.log("clear input")
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