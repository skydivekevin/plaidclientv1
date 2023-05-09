import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import CartContext from '../../context/CartContext';

const Quote = (props) => {

  const { quote, property } = props
  const navigation = useNavigation()
  const [selected, setSelected] = useState(false)

  const { cart } = useContext(CartContext);



  useEffect(() => {
    something()
  })

  function something() {
    cart.map(cartItem => {
      if (cartItem._id === quote._id) {
        setSelected(true)
      }
    })
  }

  function handleSelection(quote) {

    if (selected) {
      setSelected(false)
      props.handleSelected(quote, false)
    }
    else {
      setSelected(true)
      props.handleSelected(quote, true)
    }
  }

  return (
    <View>
      <View style={styles.appContainer}>
        <TouchableOpacity
          onPress={() => handleSelection(quote)}>
          <View style={selected ? styles.cardSelected : styles.cardNotSelected} >
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
    fontSize: 25,
    marginTop: 5
  },
  description: {
    fontSize: 15
  },
  price: {
    fontSize: 20,
    marginBottom: 15
  },
  cardNotSelected: {
    width: 300,
    borderWidth: 2,
    borderColor: "gray",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  cardSelected: {
    width: 300,
    borderWidth: 2,
    borderColor: "green",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    // backgroundColor: "blue",
  }
});