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

  const { user } = useContext(UserContext);
  const { quotes, setQuotes, provisionalQuotesContext, setProvisionalQuotesContext } = useContext(QuotesContext);
  const { setPlaces } = useContext(ApiContext);
  // const { cart, setCart, updateCart } = useContext(CartContext);

  const [noAssociatedProperties, setNoAssociatedProperties] = useState();
  const [provisional, setProvisional] = useState();
  const [moreQuotes, setMoreQuotes] = useState();
  const [cart, setCart] = useState([]);
  
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
    if (quotes) {
      return renderQuotes()
    }
  }

  function handleSelected(quote, selected) {
    if (selected) {
      setCart([...cart, quote])
    }
    if (!selected) {
      cart.map((item) => {
        if (item._id === quote._id) {
          const newCart = cart.filter(function (letter) {
            return letter !== item
          })
          setCart(newCart)
        }
      })
    }
  }

  function renderQuotes() {
    return (
      <View style={styles.renderQuotesContainer}>
      <Text>Quotes available for immediate booking</Text>
      <Text>Click on a quote to add it to your cart</Text>
      {quotes.map(quote => {
        return (
            <Quote quote={quote} handleSelected={handleSelected} key={quote._id} />
        )
      })}
      </View>
    )
  }

  function renderMoreQuotesNotification() {
    return (
      <View style={styles.renderMoreQuotesNotification}>
        <Text>
          There are more quotes available on your property. Verify property to see them and add more!
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

  function renderFullAccess() {
    return renderQuotes()
  }

  return (
    <View style={styles.container}>
      <Text>{cart.length}</Text>
      <ScrollView>
      {provisional ? renderProvisional() : renderFullAccess()}
      {/* {moreQuotes ? renderMoreQuotesNotification() : null}
      {noAssociatedProperties ? noProperties() : renderQuotes()} */}
      </ScrollView>
    </View>
  )
}

export default MyQuotes

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10

  },
  renderQuotesContainer: {
    alignItems: 'center'
  },
  renderMoreQuotesNotification: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})