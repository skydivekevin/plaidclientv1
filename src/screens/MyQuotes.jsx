import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import QuotesContext from '../../context/QuotesContext';

import UserContext from '../../context/UserContext';
import ApiContext from '../../context/ApiContext';

import Quote from '../components/Quote'

const baseUrl = 'http://localhost:8080/api';

const MyQuotes = () => {
  const navigation = useNavigation();

  const { user } = useContext(UserContext)
  const { quotes, setQuotes, provisionalQuotesContext, setProvisionalQuotesContext } = useContext(QuotesContext);
  const { setPlaces } = useContext(ApiContext)

  const [noAssociatedProperties, setNoAssociatedProperties] = useState();
  const [provisional, setProvisional] = useState();
  const [hasProvisionalCodes, setHasProvisionalCodes] = useState(false);
  const [provisionalCodes, setProvisionalCodes] = useState([]);
  const [provisionalQuotes, setProvisionalQuotes] = useState([]);
  const [moreQuotes, setMoreQuotes] = useState();
  
  useEffect(() => {
    if (user.accountStatus === "provisional") {
      setProvisional(true)
      if (user.provisionalCodes.length > 0) {
        getProvisionalQuotes()
      }
    }
    if (user.accountStatus != "provisional") {
      setProvisional(false)
      getQuotes()
      getKeys()
      if (user.currentProperties.length > 0) {
        setNoAssociatedProperties(false)
      }
    }
  }, [user])

  function getProvisionalQuotes() {
    axios({
      method: 'GET',
      url: `${baseUrl}/quotes/getProvisionalQuotes`,
    })
    .then(res => {
      res.data.moreQuotes ? setMoreQuotes(true) : false
      setQuotes(res.data.provisionalQuotes)
    })
    .catch(function (error) {
      console.log("error: ", error.message)
    })
  }
  
  function getQuotes() {
    if (user.currentProperties.length >= 1) {
      setNoAssociatedProperties(false)
      axios({
        method: 'GET',
        url: `${baseUrl}/quotes/getAllQuotesAtAddress`,
      })
      .then(res => {
        setQuotes(res.data)
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data.message === "unverified account") {
            console.log("unverified account")
          }
        }
      })
    }
    if (user.currentProperties.length === 0 ) {
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
    console.log("moreQuotes: ", moreQuotes)
    
    return (
      <Text>Verify your address to see all of your quotes</Text>
    )
  }

  function renderQuotes() {
    // if (provisional) {renderProvisional()}
    return (
      <>
      <Text>Quotes available for immediate booking</Text>
      {console.log("quotes: ", quotes)}
      {quotes.map(quote => {
        return (
          <Quote quote={quote} key={quote._id}/>
        )
      })}
      </>
    )
  }

  function renderMoreQuotesNotification() {
    return (
      <View style={styles.renderMoreQuotesNotification}>
        <Text>
          There are more quotes available on your property. Verify property to see them!
        </Text>
          <Button 
          title="Verify Property"
          onPress={() => {
            navigation.navigate("Claim Property")
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      {moreQuotes ? renderMoreQuotesNotification() : null}
      {noAssociatedProperties ? noProperties() : renderQuotes()}
      </ScrollView>
    </View>
  )
}

export default MyQuotes

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',

  },
  renderMoreQuotesNotification: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})