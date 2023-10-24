import { ScrollView, StyleSheet, Text, View, Button } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Quote from '../components/Quote';
import QuotesContext from '../../context/QuotesContext';
import CartContext from '../../context/CartContext';
import JobsContext from '../../context/JobsContext';
import { Job } from '../../utils/httpUtils';

const CompanyQuotes = ({ route, navigation }) => {
  const vendorId = route.params.vendorId
  const companyName = route.params.companyName
  const website = route.params.website

  const { verifiedQuotes } = useContext(QuotesContext);
  const { cart, setCart, setCartTotal } = useContext(CartContext);
  const { setJobs } = useContext(JobsContext);
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    renderQuotes()
  }, [quotes, verifiedQuotes]);

  useEffect(() => {
    getQuotes()
  }, [vendorId]);

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
    calculateCart()
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
      data.push(item._id)
    })
    requestServices(data)
  }

  function requestServices(data) {
    Job.postJson('createJob', data)
      .then(response => {
        setJobs(response.data)
        navigation.navigate("My Jobs")
      })
  }

  function calculateCart() {
    let total = 0;
    cart.map(item => {
      total += item.price
    })
    setCartTotal(total)
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