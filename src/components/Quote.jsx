import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Quote = (props) => {

  const { quote, property } = props
  const [currentQuote, setCurrentQuote] = useState()
  const navigation = useNavigation()

  // useEffect(() => {
  //   if (!currentQuote) {
  //     setCurrentQuote(quote)
  //   }
  // }, [currentQuote])
  
  // function goToQuote(id) {
  //   const params = {
  //     quote: quote,
  //     property: property
  //   }
  //   navigation.navigate("Modify Quote", params)
  // }

  return (
    <View>
      <View style={styles.appContainer}>
        <TouchableOpacity
          onPress={() => console.log(quote._id)}>
          <View style={styles.card} >
            <View>
              <Text style={styles.title}>{quote.title}</Text>
            </View>
            <View>
              <Text style={styles.description}>{quote.description}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.price}>{quote.price}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Quote

const styles = StyleSheet.create({

  appContainer: {
    paddingTop: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'column',
    // justifyContent: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize:25,
    marginTop: 5
  },
  description: {
    fontSize: 15
  },
  price: {
    fontSize: 20,
    marginBottom: 15
  },
  card: {
    // height: 110,
    width: 300,
    borderWidth: 2,
    borderColor: "#8A9A5B",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: "cccccc",
  }
});