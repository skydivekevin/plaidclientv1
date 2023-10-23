import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import QuotesContext from '../../context/QuotesContext';
import UserContext from '../../context/UserContext';
import Autocomplete from '../components/Autocomplete';
import PropertyContext from '../../context/PropertyContext';
import { Property } from '../../utils/httpUtils';

const baseUrl = 'http://localhost:8080/api';

const ClaimProperty = () => {

  const navigation = useNavigation();

  const { user, setUser } = useContext(UserContext)
  const { propertyIdContext, propertyContext } = useContext(PropertyContext)

  const [verificationCode, setVerificationCode] = useState("")

  function claimProperty() {
    let data;
    if (verificationCode) {
      data = {
        propertyId: propertyIdContext,
        verificationCode: verificationCode
      }
    }
    if (!verificationCode) {
      data = {
        propertyId: propertyIdContext,
      }
    }
    console.log("claimProperty data: ", data)
    Property.postJson('claimProperty', data)
      .then(response => {
        console.log("response.data: ", response.data)
        setUser(response.data)
        navigation.navigate("Dashboard")
      })
    // axios({
    //   method: 'POST',
    //   url: `${baseUrl}/properties/claim`,
    //   data
    // })
    //   .then(res => {
    //     setUser(res.data)
    //   })
    //   .catch(function (error) {
    //     if (error.response) {
    //       console.log("error: ", error.response)
    //     }
    //   })


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
      <View style={styles.verificationTextBox}>
        <TextInput
          placeholder="Enter verification code"
          placeholderTextColor="#000"
          autoCapitalize='none'
          style={styles.verificationCode}
          onChangeText={(text) => setVerificationCode(text)}
          clearButtonMode="while-editing"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Claim Property"
          onPress={claimProperty}
          style={styles.button}
        />
        <Button
          title="Request Verification Code"
          onPress={claimProperty}
          style={styles.button}
        />
      </View>
    </View>
  )
}

export default ClaimProperty

const styles = StyleSheet.create({
  appContainer: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1
  },
  inputContainer: {
    marginTop: 25,

  },
  autocomplete: {
    marginTop: 25
  },
  verificationCode: {
    marginTop: 25,
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
  verificationTextBox: {
    zIndex: -1
  },
  buttonContainer: {
    marginTop: 25,
    zIndex: -1
  }
})