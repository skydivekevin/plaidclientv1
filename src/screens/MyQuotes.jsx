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

  const [noAssociatedProperties, setNoAssociatedProperties] = useState();
  // const [provisional, setProvisional] = useState();
  const [moreQuotes, setMoreQuotes] = useState();
  const [cart, setCart] = useState([]);
  const [groupedQuotes, setGroupedQuotes] = useState([]);
  const [allQuotesCount, setAllQuotesCount] = useState();
  
  useEffect(() => {
    console.log("user: ", user)
    getKeys()
    if (user.currentProperties?.length === 0) {
      console.log("no properties")
      setNoAssociatedProperties(true)
      return
    }
      getQuotes()
  }, [user])

  useEffect(() => {
    groupQuotesByVendor()
  }, [quotes])

  // function getProvisionalQuotes() {
  //   axios({
  //     method: 'GET',
  //     url: `${baseUrl}/quotes/getProvisionalQuotes`,
  //   })
  //   .then(res => {
  //     res.data.moreQuotes ? setMoreQuotes(true) : setMoreQuotes(false)
  //     setQuotes(res.data.provisionalQuotes)
  //   })
  //   .catch(function (error) {
  //     console.log("error: ", error.message)
  //   })
  // }
  function handleQuoteResponse(res) {
    console.log("res: ", res)
    setAllQuotesCount(res.allQuotesCount)
    setMoreQuotes(res.moreQuotes)
    setQuotes(res.provisionalQuotes)

  }
  
  function getQuotes() {
    console.log("getquote")
    // if (user.currentProperties.length >= 1) {
    //   setNoAssociatedProperties(false)
    //   axios({
    //     method: 'GET',
    //     url: `${baseUrl}/quotes/getAllQuotesAtAddress`,
    //   })
    //   .then(res => {
    //     handleQuoteResponse(res.data)
    //     // setQuotes(res.data)
    //   })
    //   .catch(function (error) {
    //     if (error.response) {
    //       if (error.response.data.message === "unverified account") {
    //         console.log("unverified account")
    //       }
    //     }
    //   })
    // }
    // if (user.currentProperties.length === 0 ) {
    //   setNoAssociatedProperties(true)
    // }
  }

  function getKeys() {
    console.log("getKeys")
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
    console.log("no properties")
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
    if (quotes?.length === 0) {

    }

    if (quotes?.length > 0) {
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

  ///////CART IS WORKING; NEXT ORDER OF BUSINESS IS GOING TO BE CATEGORIZING/ORGANIZING THESE QUOTES INTO THE BASIC CATEGORIES OF 'interior services', 'exterior services', 'electrical', 'plumbing'
  function groupQuotesByVendor() {

    // should look like: {vendor1: [{quote1}, {quote2}], vendor2: [{quote1}]}
    //setGroupedQuotes( [{category: exterior, vendors: [vendor1, vendor2, vendor3], quotes: [quote1, quote2, quote3]}, {category: interior, vendors: [...], quotes: [] }, {}]
    let categories = [];
    let vendors = [];
    let groupedQuotes = [];
    quotes?.map(quote => {
      if (quote.vendorCategories.length === 0) {
        return
      }
      if (quote.vendorCategories.length > 0) {
        quote.vendorCategories.map(category => {
          if (!categories.includes(category)) {
            categories.push(category)
            let newObj = {"category": category}
            console.log("newObj: ", newObj)
          }
        })
      }
      if (!categories.includes(quote.vendorCategories)) {
        categories.push(quote.category)

        groupedQuotes.push({"category": quote.category})
      }


      // groupedQuotes.map(item => {
  
      // })


      // if (!vendors.includes(quote.vendorId)) {

      // }


      console.log("vendorId: ", quote)
    })

  }
  // console.log("groupedQuotes: ", groupedQuotes)

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
      <Text>cart: {cart.length}</Text>
      {noAssociatedProperties ? noProperties(): null}
      <ScrollView>
      {/* {provisional ? renderProvisional() : renderFullAccess()} */}


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