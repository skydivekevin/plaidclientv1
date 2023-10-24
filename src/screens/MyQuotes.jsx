import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Quote, Utils, Vendor } from '../../utils/httpUtils';

import QuotesContext from '../../context/QuotesContext';
import UserContext from '../../context/UserContext';
import ApiContext from '../../context/ApiContext';

import Accordion from "../components/Accordion";
import CartContext from '../../context/CartContext';

const MyQuotes = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { quotesAndVendorsByCategory, setquotesAndVendorsByCategory, verifiedQuotes, setVerifiedQuotes } = useContext(QuotesContext);
  const { places, setPlaces } = useContext(ApiContext);
  const { cart } = useContext(CartContext);
  const [noAssociatedProperties, setNoAssociatedProperties] = useState();
  // const [cart, setCart] = useState([]);
  const [groupedQuotes, setGroupedQuotes] = useState([]);
  // const [verifiedQuotes, setVerifiedQuotes] = useState([]);
  const [unverifiedQuotesCount, setUnverifiedQuotesCount] = useState();
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendorsByCategory, setVendorsByCategory] = useState([]);
  const [noCategories, setNoCategories] = useState();

  useEffect(() => {
    if (!places) {
      if (!places) {
        Utils.getJson('fetchGoogle')
          .then(res => setPlaces(res.data.places))
      }
    }
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

      Quote.getJson('getAllUserQuotes')
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

  function noProperties() {
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

  // function handleSelected(quote, selected) {
  //   if (selected) {
  //     setCart([...cart, quote])
  //   }
  //   if (!selected) {
  //     cart.map((item) => {
  //       if (item._id === quote._id) {
  //         const newCart = cart.filter(function (letter) {
  //           return letter !== item
  //         })
  //         setCart(newCart)
  //       }
  //     })
  //   }
  // }

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
        groupedQuotesArr[index]?.quotes.push(quote)
      }
    })
    setGroupedQuotes(groupedQuotesArr)
    getVendorInformation(vendorIds)

  }

  function getVendorInformation(vendorIds) {

    const data = {
      vendorIds
    }
    Vendor.getJson('getVendorInformation', data)
      .then(response => {
        const vendorInfo = response.data;

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
      if (vendor.categories.length === 0) {
        setNoCategories(true)
        return
      }
      if (vendor.categories.length === 1) {
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
    setquotesAndVendorsByCategory(newVendorsByCategory)
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

  function renderNoQuotes() {
    return (
      <Text>There aren't any current quotes on your property. Request a quote from your favorite contractor here.</Text>
    )
  }

  // function renderAccordions() {
  //   // console.log("quotesAndVendors: ", quotesAndVendorsByCategory)
  //   quotesAndVendorsByCategory.map(category => {
  //     console.log("category: ", category)
  //     return <Accordion data={category} key={category.category} />
  //   })

  // }

  return (
    <View style={styles.container}>
      <Text>cart: {cart.length}</Text>
      {verifiedQuotes.length > 0 ?
        quotesAndVendorsByCategory.map(category => {
          return <Accordion data={category} key={category.category} />
        })
        :
        renderNoQuotes()
      }




      {noAssociatedProperties ? noProperties() : null}
      {unverifiedQuotesCount ? renderMoreQuotesNotification() : null}
      {/* {unverifiedQuotesCount ? renderMoreQuotesNotification() : null} */}
      {/* {verifiedQuotes ? renderQuotes() : null} */}
    </View>
  )
}

export default MyQuotes

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    height: '100%',
    backgroundColor: '#f0f0f0'
  },
  renderQuotesContainer: {
    alignItems: 'center'
  },
  renderMoreQuotesNotification: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})
