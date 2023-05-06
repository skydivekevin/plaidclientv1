import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Quote from '../components/Quote';
import QuotesContext from '../../context/QuotesContext';

const CompanyQuotes = ({ route, navigation }) => {
  const vendorId = route.params.vendorId
  const companyName = route.params.companyName

  const { quotesAndVendorsByCategory, setquotesAndVendorsByCategory, verifiedQuotes, setVerifiedQuotes } = useContext(QuotesContext);

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
      console.log("nada")
      return <Text>Quotes Loading</Text>
    }
    if (quotes) {
      quotes.map(quote => {
        return <Quote quote={quote} key={quote._id} />
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
        return <Quote quote={quote} key={quote._id} />
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