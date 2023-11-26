import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Quote, Utils, Vendor, Property } from "../../utils/httpUtils";
import QuotesContext from "../../context/QuotesContext";
import UserContext from "../../context/UserContext";
import ApiContext from "../../context/ApiContext";
import CartContext from "../../context/CartContext";
import DropDownPicker from "react-native-dropdown-picker";
import VendorTile from "../components/VendorTile";
import { mapEnumToSpecialist } from "../../utils/utils";
import { servicesMyQuotes } from "../../utils/enums";

const MyQuotes = () => {
  const navigation = useNavigation();
  const { user, token } = useContext(UserContext);
  const {
    quotesAndVendorsByCategory,
    setquotesAndVendorsByCategory,
    verifiedQuotes,
    quotesByVendor,
    setQuotesByVendor,
  } = useContext(QuotesContext);
  const { places, setPlaces } = useContext(ApiContext);
  const { cart } = useContext(CartContext);
  const [noAssociatedProperties, setNoAssociatedProperties] = useState();
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [noCategories, setNoCategories] = useState();
  const [moreQuotesAvailable, setMoreQuotesAvailable] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [servicesList, setServicesList] = useState(servicesMyQuotes);
  const [selectedVendors, setSelectedVendors] = useState(quotesByVendor);
  const [address, setAddress] = useState({})

  // useEffect(() => {
  //   setUserState(user)
  // }, [user])

  useEffect(() => {
    if (!places) {
      if (!places) {
        Utils.getJson("fetchGoogle").then((response) =>
          setPlaces(response.data.places)
        );
      }
    }

    if (user?.currentProperties?.length === 0) {
      setNoAssociatedProperties(true);
      return;
    }
    if (user?.currentProperties[0]) {
      getQuotes();
      getProperty();
    }
  }, [user]);

  useEffect(() => {
    setSelectedService("All");
  }, []);

  useEffect(() => {
    setSelectedVendors(quotesByVendor);
  }, [quotesByVendor]);

  useEffect(() => {
    filterSelectedServices();
  }, [selectedService]);
  
  const getProperty = () => {
    Property(token).getJson('getProperty')
    .then(response => {
      setAddress(response.data.address)
    })
  }

  const filterSelectedServices = () => {
    if (selectedService === "All") {
      setSelectedVendors(quotesByVendor);
    } else {
      const filteredVendors = quotesByVendor.filter((vendor) =>
        vendor.services.includes(selectedService)
      );
      setSelectedVendors([...filteredVendors]);
    }
  };

  function getQuotes() {
    if (user?.currentProperties?.length >= 1) {
      setNoAssociatedProperties(false);

      Quote(token)
        .getJson("getAllUserQuotes")
        .then((response) => {
          setMoreQuotesAvailable(response.data.moreQuotesAvailable);
          setQuotesByVendor(response.data.quotes);
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.data.message === "unverified account") {
              console.log("unverified account");
            }
          }
        });
    }
    if (user?.currentProperties?.length === 0) {
      setNoAssociatedProperties(true);
    }
  }

  // function noProperties() {
  //   return (
  //     <View>
  //       <Text style={styles.noProperties}>You don't have any associated properties to manage, add one by clicking below or learn more about Plaid.</Text>
  //       <Button
  //         title="Add property"
  //         onPress={() => {
  //           navigation.navigate("Claim Property")
  //         }}
  //       />
  //       <Button
  //         title="Learn More"
  //         onPress={() => {
  //           navigation.navigate("Learn More")
  //         }}
  //       />
  //     </View>
  //   )
  // }

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
    vendors.map((vendor) => {
      if (vendor.categories.length === 0) {
        setNoCategories(true);
        return;
      }
      if (vendor.categories.length === 1) {
        if (newCategories.includes(vendor.categories[0])) {
          return;
        }
        if (!newCategories.includes(vendor.categories[0])) {
          newCategories.push(vendor.categories[0]);
        }
      }
      if (vendor.categories.length > 1) {
        vendor.categories.map((category) => {
          if (newCategories.includes(category)) {
            return;
          }
          if (!newCategories.includes(category)) {
            newCategories.push(category);
          }
        });
      }
    });
    setCategories(newCategories);
  }

  function groupVendorsByCategory() {
    let newVendorsByCategory = [];
    categories.map((category) => {
      let obj = { category: category, vendors: [] };
      vendors.map((vendor) => {
        if (!vendor.categories.includes(category)) {
          return;
        }
        if (vendor.categories.includes(category)) {
          obj.vendors.push(vendor);
        }
      });
      newVendorsByCategory.push(obj);
    });
    setquotesAndVendorsByCategory(newVendorsByCategory);
  }

  // function renderMoreQuotesNotification() {
  //   return (
  //     <View style={styles.renderMoreQuotesNotification}>
  //       <Text style={styles.moreQuotes}>
  //         There are more quotes available on your property. Verify property to see them and add more!
  //       </Text>
  //       <Button
  //         title="Verify Property"
  //         onPress={() => {
  //           navigation.navigate("Claim Property")
  //         }}
  //       />
  //     </View>
  //   )
  // }

  const goToVendorQuotes = (vendor) => {
    navigation.navigate("Company Quotes", vendor);
  };

  return (
    <View style={styles.container}>
      {/* <Text>cart: {cart.length}</Text> */}
      {address ? (
        <Text style={styles.address}>{address.number} {address.street}</Text>

      ) : null}
      {user && user.currentProperties[0] ? (
                  <Text style={styles.notification}>
                  {user.currentProperties[0].street}
                </Text>

      ) : null}
      {user &&
      user.currentProperties &&
      user.currentProperties?.length === 0 ? (
        <View>
          <Text style={styles.notification}>
            You aren't currently registered at your address, but it's easy to
            do!
          </Text>
          <Button
            title="Register Address"
            onPress={() => {
              navigation.navigate("Claim Property");
            }}
          />
        </View>
      ) : null}

      {user &&
      user.currentProperties &&
      user.currentProperties[0] &&
      !moreQuotesAvailable &&
      quotesByVendor?.length === 0 ? (
        <View>
          <Text style={styles.notification}>
            You don't have any quotes on your property, but they're easy to
            request here!
          </Text>
          <Button
            title="Request Quote"
            onPress={() => {
              navigation.navigate("Request Quote");
            }}
          />
        </View>
      ) : null}

      {moreQuotesAvailable && (
        <View>
          <Text style={styles.notification}>
            You have more quotes on your home, verify your address to see them.
          </Text>
          <Button
            title="Verify Address"
            onPress={() => {
              navigation.navigate("Claim Property");
            }}
          />
        </View>
      )}

      {quotesByVendor.length > 0 && (
        <View>
          {user.currentProperties[0] && user.currentProperties[0].verified && (
            <DropDownPicker
              open={open}
              items={servicesList.map((service) => ({
                label: mapEnumToSpecialist(service),
                value: service,
              }))}
              setOpen={setOpen}
              value={selectedService}
              placeholder="All"
              containerStyle={{
                height: 40,
                width: 200,
                alignSelf: "center",
                marginBottom: 20,
              }}
              style={{ backgroundColor: "#fafafa" }}
              itemStyle={{ justifyContent: "flex-start" }}
              dropDownStyle={{ backgroundColor: "#fafafa" }}
              setValue={setSelectedService}
            />
          )}
          {selectedVendors?.map((vendor) => {
            return (
              <TouchableOpacity
                onPress={() => goToVendorQuotes(vendor)}
                style={styles.vendorTile}
                key={vendor._id}
              >
                <VendorTile vendor={vendor} />
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default MyQuotes;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
    height: "100%",
    backgroundColor: "#f0f0f0",
    marginLeft: 20,
    marginRight: 20,
  },
  renderQuotesContainer: {
    alignItems: "center",
  },
  renderMoreQuotesNotification: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  noQuotes: {
    marginTop: 20,
  },
  noProperties: {
    marginTop: 30,
    marginBottom: 30,
  },
  accordion: {
    paddingTop: 30,
  },
  moreQuotes: {
    textAlign: "center",
  },
  vendorTile: {
    marginBottom: 5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 10,
  },
  notification: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  address: {
    fontSize: 20
  }
});
