import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import QuotesContext from '../../context/QuotesContext';

import UserContext from '../../context/UserContext';

const baseUrl = 'http://localhost:8080/api';

const MyQuotes = () => {

  const navigation = useNavigation();

  const { user } = useContext(UserContext)
  const { quotes, setQuotes } = useContext(QuotesContext);

  const [ noQuotes, setNoQuotes ] = useState(false);
  

  useEffect(() => {
    getQuotes()
  }, [])

  function getQuotes() {

    if (user.currentProperties.length >= 1) {
      axios({
        method: 'GET',
        url: `${baseUrl}/quotes/getAllQuotesAtAddress`,
      })
      .then(res => {
        console.log("quotes: ", res)
        setQuotes(res)
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error: ", error.response)
          setErrorLoggingIn(true);
        }
      })
    }
    if (!user.currentProperties.length >=1 ) {
      setNoQuotes(true)
    }
  }

  function noProperties() {
    return (    
      <View>
        <Text>You don't have any associated properties to manage, add one by clicking below or learn more about Plaid.</Text>
        <Button 
          title="Add Property"
          onPress={() => {
            navigation.navigate("Add Property")
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

  function renderQuotes() {
    //if only one property, show quotes. If multiple properties, 
  }

  return (
    <View>
      {noQuotes ? noProperties() : <Text>Show Properti</Text>}
    </View>
  )
}

export default MyQuotes

const styles = StyleSheet.create({})