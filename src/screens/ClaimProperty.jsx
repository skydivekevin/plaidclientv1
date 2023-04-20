import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import QuotesContext from '../../context/QuotesContext';
import UserContext from '../../context/UserContext';
import Autocomplete from '../components/Autocomplete';
import PropertyContext from '../../context/PropertyContext';

const baseUrl = 'http://localhost:8080/api';

const ClaimProperty = () => {

  const navigation = useNavigation();

  const { user } = useContext(UserContext)
  const { property } = useContext(PropertyContext)

  console.log("property: ", property)


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

  return (
    <View style={styles.appContainer}>
      <View style={styles.autocomplete}>
      <Autocomplete />
      </View>
      <View style={styles.claim}>
      <TextInput
        placeholder="Enter verification code"
        placeholderTextColor="#000"
        autoCapitalize='none'
        style={styles.searchBox}
        onChangeText={(text) => setVerificationCode(text)}
        // clearButton={clearInput}
        clearButtonMode="while-editing"
        />
        </View>
    <View style={styles.buttonContainer}>
    <Button 
      title="Claim Property"
      onPress={claimProperty}
      style={styles.button}
    />
    </View>
    </View>
  )
}

export default ClaimProperty
////////////////////////////// This css is garbage; just here for a representation. It's not dynamic, all fixed positions...not sure how it'll work out  //////////////////////////////

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 30,
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  autocomplete: {

  },
  claim: {
    position: 'absolute',
    top: 100
  }, 
  buttonContainer: {
    position: 'absolute',
    top: 175
  },
  container: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'center',
  },
  // button: {
  //   position: 'absolute',
  //   bottom: 50
  // },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    width: '100%'
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: '80%',
    marginRight: 8,
    padding: 8
  },
  screenTitle: {
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 50
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
})