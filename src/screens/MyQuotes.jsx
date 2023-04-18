import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import axios from 'axios';

import QuotesContext from '../../context/QuotesContext';

import UserContext from '../../context/UserContext';

const baseUrl = 'http://localhost:8080/api';

const MyQuotes = () => {

  const { user } = useContext(UserContext)

  const { quotes, setQuotes } = useContext(QuotesContext);

  const { noQuotes, setNoQuotes } = useState(false);

  useEffect(() => {
    getQuotes()
  }, [])

  function checkIfProperties() {
    if (user.currentProperties.length === 0) {
      setNoQuotes(true)
    }
  }



  function getQuotes() {

    checkIfProperties()

    if (user.currentProperties.length >= 1) {
      axios({
        method: 'GET',
        url: `${baseUrl}/quotes/getAllQuotesAtAddress`,
      })
      .then(res => {
        console.log("response; quotes: ", res)
        // setQuotes(res)
      })
      .catch(function (error) {
        if (error.response) {
          console.log("error: ", error.response)
          setErrorLoggingIn(true);
        }
      })

    }
  }

  return (
    <View>
      <Text>MyQuotes</Text>
    </View>
  )
}

export default MyQuotes

const styles = StyleSheet.create({})