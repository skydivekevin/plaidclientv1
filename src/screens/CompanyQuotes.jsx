import { ScrollView, StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import Quote from '../components/Quote';
import QuotesContext from '../../context/QuotesContext';
import CartContext from '../../context/CartContext';

const baseUrl = 'http://localhost:8080/api';

const CompanyQuotes = ({ route, navigation }) => {
  const vendorId = route.params.vendorId
  const companyName = route.params.companyName
  const website = route.params.website

  const { quotesAndVendorsByCategory, setquotesAndVendorsByCategory, verifiedQuotes, setVerifiedQuotes } = useContext(QuotesContext);
  const { cart, setCart } = useContext(CartContext);

  const [quotes, setQuotes] = useState([]);
  const [cartTotal, setCartTotal] = useState();
  const [checkoutData, setCheckoutData] = useState([]);

  useEffect(() => {
    renderQuotes()
  }, [quotes, verifiedQuotes])

  useEffect(() => {
    getQuotes()
  }, [vendorId])

  function getQuotes() {
    let allQuotes = [];
    verifiedQuotes.map(quote => {
      if (quote.vendorId === vendorId) {
        allQuotes.push(quote)
      }
    })
    setQuotes(allQuotes)
  }

  function renderQuotes() {
    if (!quotes) {
      return <Text>Quotes Loading</Text>
    }
    if (quotes) {
      quotes.map(quote => {
        return <Quote quote={quote} key={quote._id} />
      })
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

  function renderQuote(quote) {
    return (
      <ScrollView>
        <Quote quote={quote} key={quote._id} />
      </ScrollView>

    )
  }

  function checkout() {
    let data = []
    cart.map(item => {
      // console.log("item: ", item)
      data.push(item._id)
    })
    // let vendorIds = []
    // cart.map(item => {
    // data.push(item._id)
    // let obj = {};
    //   if (!vendorIds.includes(item.vendorId)) {
    //     vendorIds.push(item.vendorId)
    //     obj.quotes = [item._id]
    //     obj.vendorId = item.vendorId
    //     // console.log("obj: ", obj)
    //     data.push(obj)
    //     return
    //   }

    //   if (vendorIds.includes(item.vendorId)) {
    //     const index = data.findIndex((obj) => obj.vendorId === item.vendorId)
    //     if (data[index].quotes.includes(item._id)) {
    //       return
    //     }
    //     if (!data[index].quotes.includes(item._id)) {
    //       data[index].quotes.push(item._id)
    //       return
    //     }
    //     return
    //   }
    // })
    console.log("data: ", data)
    postInfoToVendor(data)
  }

  function postInfoToVendor(data) {
    axios({
      method: 'POST',
      url: `${baseUrl}/jobs/jobRequest`,
      data
    })
      .then((res) => {
        console.log("res: ", res)
      })
      .catch((err) => {
        console.log("error: ", err)
      })
  }

  function calculateCart() {

  }

  return (
    <View style={styles.container}>
      <Text style={styles.companyName}>{companyName}</Text>
      <Text>{website}</Text>
      {quotes ?
        <>
          <Button
            title="Request Services"
            onPress={checkout}
            style={styles.button}
          />
          <ScrollView>
            {quotes.map(quote => {
              return <Quote quote={quote} handleSelected={handleSelected} key={quote._id} />
            })}
          </ScrollView>
        </>
        :
        <Text>Quotes Loading</Text>

      }

    </View>
  )
}

export default CompanyQuotes

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: 'center',
    paddingTop: 15
  },
  companyName: {
    fontSize: 30
  }
})