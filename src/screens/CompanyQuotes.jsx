import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Quote from '../components/Quote';
import QuotesContext from '../../context/QuotesContext';
import CartContext from '../../context/CartContext';

const CompanyQuotes = ({ route, navigation }) => {
  const vendorId = route.params.vendorId
  const companyName = route.params.companyName

  const { quotesAndVendorsByCategory, setquotesAndVendorsByCategory, verifiedQuotes, setVerifiedQuotes } = useContext(QuotesContext);
  const { cart, setCart } = useContext(CartContext);

  const [quotes, setQuotes] = useState([])

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

  return (
    <View style={styles.container}>
      <Text style={styles.companyName}>{companyName}</Text>
      {quotes ? quotes.map(quote => {
        return <Quote quote={quote} handleSelected={handleSelected} key={quote._id} />
      })
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