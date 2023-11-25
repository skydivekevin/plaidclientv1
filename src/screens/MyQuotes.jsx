import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Quote, Utils, Vendor } from '../../utils/httpUtils';
import QuotesContext from '../../context/QuotesContext';
import UserContext from '../../context/UserContext';
import ApiContext from '../../context/ApiContext';
import Accordion from "../components/Accordion";
import CartContext from '../../context/CartContext';
import DropDownPicker from 'react-native-dropdown-picker';
import VendorTile from '../components/VendorTile';
import { mapEnumToSpecialist } from '../../utils/utils';
import { servicesMyQuotes } from '../../utils/enums';

const MyQuotes = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const { quotesAndVendorsByCategory, setquotesAndVendorsByCategory, verifiedQuotes, quotesByVendor, setQuotesByVendor  } = useContext(QuotesContext);
  const { places, setPlaces } = useContext(ApiContext);
  const { cart } = useContext(CartContext);
  const [noAssociatedProperties, setNoAssociatedProperties] = useState();
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [noCategories, setNoCategories] = useState();
  const [moreQuotesAvailable, setMoreQuotesAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');
  const [servicesList, setServicesList] = useState(servicesMyQuotes);
  const [selectedVendors, setSelectedVendors] = useState(quotesByVendor)

  useEffect(() => {
    if (!places) {
      if (!places) {
        Utils.getJson('fetchGoogle')
          .then(response => setPlaces(response.data.places))
      }
    }

    if (user?.currentProperties?.length === 0) {
      setNoAssociatedProperties(true)
      return
    }
    getQuotes()
  }, [user])

  useEffect(() => {
    filterSelectedServices()
  }, [selectedService])

  const filterSelectedServices = () => {
    console.log("quotes by vendor: ", quotesByVendor);
    if (selectedService === "All") {
      console.log("all");
      setSelectedVendors([...quotesByVendor]); // Copy the quotesByVendor array
    } else {
      console.log("else");
      const filteredVendors = quotesByVendor.filter(vendor =>
        vendor.services.includes(selectedService)
      );
      setSelectedVendors([...filteredVendors]); // Copy the filteredVendors array
      console.log("selectedVendors: ", selectedVendors);
    }
  };

  function getQuotes() {
    if (user?.currentProperties?.length >= 1) {
      setNoAssociatedProperties(false)

      Quote.getJson('getAllUserQuotes')
        .then(response => {
          setMoreQuotesAvailable(response.data.moreQuotesAvailable);
          setQuotesByVendor(response.data.quotes);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.data.message === "unverified account") {
              console.log("unverified account")
            }
          }
        })
    }
    if (user?.currentProperties?.length === 0) {
      setNoAssociatedProperties(true)
    }
  }

  function noProperties() {
    return (
      <View>
        <Text style={styles.noProperties}>You don't have any associated properties to manage, add one by clicking below or learn more about Plaid.</Text>
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
        <Text style={styles.moreQuotes}>
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

  const goToVendorQuotes = (vendor) => {
    navigation.navigate('Company Quotes', vendor)
  }

  return (
    <View style={styles.container}>
      {/* <Text>cart: {cart.length}</Text> */}
      {user?.currentProperties.length === 0 ? (
        <View>
          <Text>You aren't currently registered at your address, but it's easy to do!</Text>
          <Button
          title="Register Address"
          onPress={() => {
            navigation.navigate("Claim Property");
          }}
        />
        </View>
      ) : null}

      {moreQuotesAvailable && (
        <View>
          <Text>You have more quotes on your home, verify your address to see them.</Text>
        </View>
      )}

      {selectedVendors && (
        <View>
            <DropDownPicker
            open={open}
            items={servicesList.map(service => ({ label: mapEnumToSpecialist(service), value: service }))}
            setOpen={setOpen}
            value={selectedService}
            placeholder="Select a service"
            containerStyle={{ height: 40, width: 200, alignSelf: 'center', marginBottom: 20 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{ justifyContent: 'flex-start' }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            setValue={setSelectedService}
            
          />
          {selectedVendors.map(vendor => {
            return (
              <TouchableOpacity onPress={() => goToVendorQuotes(vendor)} style={styles.vendorTile} key={vendor._id}>
                <VendorTile vendor={vendor} />
              </TouchableOpacity>
            )
          })}


        </View>
      )}


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
    backgroundColor: '#f0f0f0',
    marginLeft: 20,
    marginRight: 20
  },
  renderQuotesContainer: {
    alignItems: 'center',
  },
  renderMoreQuotesNotification: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  noQuotes: {
    marginTop: 20,
    // marginLeft: 20,
    // marginRight: 20,
  },
  noProperties: {
    marginTop: 30,
    marginBottom: 30,
    // marginLeft: 20,
    // marginRight: 20,
  },
  accordion: {
    paddingTop: 30
  },
  moreQuotes: {
    textAlign: 'center',
  },
  vendorTile: {
    marginBottom: 5,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
})
