import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

import QuotesContext from '../../context/QuotesContext';
import UserContext from '../../context/UserContext';
import ApiContext from '../../context/ApiContext';

import Accordion from "../components/Accordion";

import Quote from '../components/Quote'

const baseUrl = 'http://localhost:8080/api';

const MyQuotes = () => {
  const navigation = useNavigation();

  const { user } = useContext(UserContext);
  // const { quotes, setQuotes, provisionalQuotesContext, setProvisionalQuotesContext } = useContext(QuotesContext);
  const { setPlaces } = useContext(ApiContext);

  const [noAssociatedProperties, setNoAssociatedProperties] = useState();
  const [cart, setCart] = useState([]);
  const [groupedQuotes, setGroupedQuotes] = useState([]);
  const [verifiedQuotes, setVerifiedQuotes] = useState([]);
  const [unverifiedQuotesCount, setUnverifiedQuotesCount] = useState();
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendorsByCategory, setVendorsByCategory] = useState()

  useEffect(() => {
    getKeys()
    if (user.currentProperties?.length === 0) {
      setNoAssociatedProperties(true)
      return
    }
    getQuotes()
  }, [user])

  useEffect(() => {
    if (verifiedQuotes) {
      groupQuotesByVendor();
    }
  }, [verifiedQuotes])

  useEffect(() => {
    collectCategories();
  }, [vendors])

  useEffect(() => {
    groupVendorsByCategory()
  }, [categories])

  function getQuotes() {
    if (user.currentProperties?.length >= 1) {
      setNoAssociatedProperties(false)
      axios({
        method: 'GET',
        url: `${baseUrl}/quotes/getAllUserQuotes`,
      })
        .then(res => {
          setUnverifiedQuotesCount(res.data.unverifiedQuotesCount)
          setVerifiedQuotes(res.data.verifiedQuotes)
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.data.message === "unverified account") {
              console.log("unverified account")
            }
          }
        })
    }
    if (user.currentProperties?.length === 0) {
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
    // setGroupedQuotes( [{category: exterior, vendors: [vendor1, vendor2, vendor3], quotes: [quote1, quote2, quote3]}, {category: interior, vendors: [...], quotes: [] }, {}]
    // vendor categories: ['interior services', 'exterior services', 'electrical', 'plumbing']
    let categories = [];
    let vendorIds = [];
    let groupedQuotesArr = [];
    let quotesByCompany = [];
    verifiedQuotes?.map(quote => {

      // group quotes by vendor
      if (!vendorIds.includes(quote.vendorId)) {
        vendorIds.push(quote.vendorId)
        const vendor = {
          vendorId: quote.vendorId,
          quotes: [
            quote
          ]
        }
        groupedQuotesArr.push(vendor)
      }

      if (vendorIds.includes(quote.vendorId)) {
        const index = groupedQuotesArr.findIndex(vendor => vendor.id === quote.vendorId)
        groupedQuotesArr[index]?.quotes?.push(quote)
        // console.log("groupedQuotesArr: ", groupedQuotesArr)
      }
    })
    // console.log("groupedQuotes: ", groupedQuotesArr)
    setGroupedQuotes(groupedQuotesArr)
    getVendorInformation(vendorIds)

  }

  function getVendorInformation(vendorIds) {
    axios({
      method: 'POST',
      url: `${baseUrl}/vendors/getVendorInformation`,
      data: vendorIds
    })
      .then(res => {
        const vendorInfo = res.data;

        let data = []
        vendorInfo.map(vendor => {
          const index = groupedQuotes.findIndex(quote => quote.vendorId === vendor._id)
          const quotes = groupedQuotes[index]?.quotes
          vendor.quotes = quotes;
          data.push(vendor)
          setVendors(data)
        })
      })
      .catch(err => console.log("err: ", err))
  }

  function collectCategories() {
    let newCategories = [];
    vendors.map(vendor => {
      if (vendor.categories.length <= 1) {
        if (newCategories.includes(vendor.categories[0])) {
          return
        }
        if (!newCategories.includes(vendor.categories[0])) {
          newCategories.push(vendor.categories[0])

        }
      }
      if (vendor.categories.length > 1) {
        vendor.categories.map(category => {
          if (newCategories.includes(category)) {
            return
          }
          if (!newCategories.includes(category)) {
            newCategories.push(category)
          }
        })
      }
    })
    setCategories(newCategories)
  }

  function groupVendorsByCategory() {
    let newVendorsByCategory = [];
    categories.map(category => {
      let obj = { category: category, vendors: [] }
      vendors.map(vendor => {
        if (!vendor.categories.includes(category)) {
          return
        }
        if (vendor.categories.includes(category)) {
          obj.vendors.push(vendor)
        }
      })
      newVendorsByCategory.push(obj)
    })
    console.log("newVendors: ", newVendorsByCategory[0].vendors[0].quotes)
    setVendorsByCategory(newVendorsByCategory)
  }

  function renderQuotes() {
    return (
      <View style={styles.renderQuotesContainer}>
        <Text>Click on a quote to add it to your cart</Text>
        <ScrollView>
          {verifiedQuotes.map(quote => {
            return (
              <Quote quote={quote} handleSelected={handleSelected} key={quote._id} />
            )
          })}
        </ScrollView>
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

  // function renderCategories() {
  //   categories.map(category => {
  //     return <Text key={category}>Category: {category}</Text>
  //   })
  // }

  return (
    <View style={styles.container}>
      <Text>cart: {cart.length}</Text>
      {vendorsByCategory?.map(category => {
        console.log("category: ", category.vendors.quotes)
        return <Accordion data={category} key={category.category} />
      })}

      {noAssociatedProperties ? noProperties() : null}
      {unverifiedQuotesCount ? renderMoreQuotesNotification() : null}
      {/* {verifiedQuotes ? renderQuotes() : null} */}
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


      // if (quote.vendorCategories.length > 0) {
      //   quote.vendorCategories.map(category => {
      //     if (!categories.includes(category)) {
      //       categories.push(category)
      //       let newObj = { "category": category }
      //     }
      //   })
      // }
      // if (!categories.includes(quote.vendorCategories)) {
      //   categories.push(quote.category)

      //   groupedQuotes.push({ "category": quote.category })
      // }


      // groupedQuotes.map(item => {

      // })


      // if (!vendors.includes(quote.vendorId)) {

      // }


      // console.log("vendorId: ", quote)