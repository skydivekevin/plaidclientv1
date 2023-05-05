import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Quote from '../components/Quote'

const CompanyQuotes = ({ route, navigation }) => {
  const quotes = route.params.vendorInfo.quotes

  console.log("quotes: ", quotes)
  const vendor = route.params



  return (
    <View>
      <Text>{vendor.vendorInfo.companyName}</Text>
      {quotes.map(quote => {
        return <Quote quote={quote} key={quote._id} />

      })}

    </View>
  )
}

export default CompanyQuotes

const styles = StyleSheet.create({})