import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity, Item, SafeAreaView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import { useNavigation } from '@react-navigation/native';
// import PropertyContext from '../../context/PropertyContext';

const url="http://localhost:8080/api/properties"


export default function Autocomplete() {
  const places2 = "AIzaSyCuwsx91BV0hwRswT2UoqbUI_ctTbgkpqM"

  const navigation = useNavigation()

  // const { currentProperty, setCurrentProperty } = useContext(PropertyContext)

  const [predictions, setPredictions] = useState([])
  const [isShowingPredictions, setIsShowingPredictions] = useState(true)
  const [placeId, setPlaceId] = useState()
  const [placeDescription, setPlaceDescription] = useState()
  const [goToAddressButton, setShowGoToAddressButton] = useState(false)
  const [location, setLocation] = useState()

  useEffect(() => {
    setPlaceDescription();
  })

  searchLocation = async (locationInput) => {
    if(locationInput.length < 5) {
      return
    }
    axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${places2}&input=${locationInput}`,
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
        const currentProperty = res.data
        // setCurrentProperty(currentProperty)
      })
      .catch(err => console.log("error: ", err))
    }
  }

  function goToAddress() {
    navigation.navigate("Address")
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
    console.log("clear input")
    setPlaceDescription()
  }

  return (
  <SafeAreaView style={styles.container}>
    <View style={styles.autocompleteContainer}>
      <TextInput
        placeholder="Search For Address"
        placeholderTextColor="#000"
        style={styles.searchBox}
        onChangeText={(locationInput) => searchLocation(locationInput)}
        value={placeDescription}
        clearButton={clearInput}
        clearButtonMode="while-editing"
        />
{
  (isShowingPredictions && predictions) && (
      <FlatList
        data={predictions}
        renderItem={({item}) => {
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
    <Button 
      title="Go to Address"
      onPress={goToAddress}
      style={styles.button}
    />
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    zIndex: 1,
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
    flex: 1,
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 50
  }
})