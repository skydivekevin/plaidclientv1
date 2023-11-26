import { ScrollView, StyleSheet, Text, View, Button, Image } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import Quote from '../components/Quote';
import CartContext from '../../context/CartContext';
import JobsContext from '../../context/JobsContext';
import { Job } from '../../utils/httpUtils';
import { useFocusEffect } from '@react-navigation/native';
import UserContext from '../../context/UserContext';

const CompanyQuotes = ({ route, navigation }) => {
  const vendorId = route.params.vendorId
  const companyName = route.params.companyName
  const website = route.params.website
  const logo = route.params.logo
  const quotes = route.params.quotes[0].quotes

  // const { setCartTotal } = useContext(CartContext);
  const { setJobs } = useContext(JobsContext);
  const { token } = useContext(UserContext);
  const [cart, setCart] = useState([]);
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

  function checkout() {
    let data = []
    cart?.map(item => {
      data.push(item._id)
    })
    requestServices(data)
  }

  function requestServices(data) {
    Job(token).postJson('createJob', data)
      .then(response => {
        setJobs(response.data)
        navigation.navigate("My Jobs")
      })
  }

  function calculateCart() {
    let total = 0;
    cart?.map(item => {
      total += item.price
    })
    // setCartTotal(total)
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {logo ? <Image source={{ uri: `${logo}`, }} style={styles.image} /> : <Text>No Logo</Text>}
      </View>
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
  },
  imageContainer: {
    alignItems: 'center',
    maxWidth: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 100,
  },
})