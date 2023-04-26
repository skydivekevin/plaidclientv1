import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import QuotesContext from '../../context/QuotesContext';

import UserContext from '../../context/UserContext';
import ApiContext from '../../context/ApiContext';

const baseUrl = 'http://localhost:8080/api';

const MyQuotes = () => {
  const navigation = useNavigation();

  const { user } = useContext(UserContext)
  const { quotes, setQuotes } = useContext(QuotesContext);
  const { setPlaces } = useContext(ApiContext)

  const [ noQuotes, setNoQuotes ] = useState(false);
  const [noAssociatedProperties, setNoAssociatedProperties] = useState(true);
  const [provisional, setProvisional] = useState();
  const [hasProvisionalCodes, setHasProvisionalCodes] = useState(false);
  const [provisionalCodes, setProvisionalCodes] = useState([]);
  
  useEffect(() => {
    if (user.accountStatus === "provisional") {
      setProvisional(true)
      if (user.provisionalCodes.length > 0) {
        console.log("asdf")
        getProvisionalQuotes()
      }
    }
    if (user.accountStatus != "provisional") {
      setProvisional(false)
      getQuotes()
      getKeys()
      if (user.currentProperties.length > 0) {
        console.log("setNoAssociatedProperties")
        setNoAssociatedProperties(false)
      }
    }
  }, [user])

  function getProvisionalQuotes() {
    console.log("provisional")
    axios({
      method: 'GET',
      url: `${baseUrl}/quotes/getProvisionalQuotes`,
    })
    .then(res => {
      console.log("provisionalCodes: ", res.data)
    })
    .catch(function (error) {
      console.log("error: ", error)
    })

  }
  
  function getQuotes() {
    if (user.currentProperties.length >= 1) {
      axios({
        method: 'GET',
        url: `${baseUrl}/quotes/getAllQuotesAtAddress`,
      })
      .then(res => {
        setQuotes(res.data)
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error: ", error.response.data.message)
          if (error.response.data.message === "unverified account") {
            console.log("unverified account")
          }
        }
      })
    }
    if (!user.currentProperties.length >= 1 ) {
      setNoAssociatedProperties(true)
    }
  }

  function getKeys() {
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

  function noProperties() {
    return (    
      <View>
        <Text>You don't have any associated properties to manage, add one by clicking below or learn more about Plaid.</Text>
        <Button 
          title="Add property"
          onPress={() => {
            navigation.navigate("Claim Property")
          }}
        />
        <Button 
          title="Learn More"
          onPress={() => {
            navigation.navigate("Learn More")
          }}
        />
    </View>  
    )
  }

  function renderProvisional() {
    if (user.provisionalCodes.length)
    return (
      <Text>Verify your address to see all of your quotes</Text>
    )
  }

  function renderQuotes() {
    //if only one property, show quotes. If multiple properties, show
    //check for provisional codes or if account is full then good to go
    return (
      <Text>Show Properties Here</Text>
    )
  }

  return (
    <View>
      {provisional ? 
      renderProvisional() 
      : noAssociatedProperties ? noProperties() : renderQuotes()}
    </View>
  )
}

export default MyQuotes

const styles = StyleSheet.create({})