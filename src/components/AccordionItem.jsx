import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, { useState, useRef } from 'react';
import { toggleAnimation } from '../animations/toggleAnimation';

import { useNavigation } from '@react-navigation/native';

const AccordionItem = (props) => {
  console.log("props: ", props)
  const category = props.category
  const vendors = props.vendors
  const [showContent, setShowContent] = useState(false);
  const animationController = useRef(new Animated.Value(0)).current;

  const navigation = useNavigation()

  const toggleListItem = () => {
    const config = {
      duration: 200,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true
    };
    Animated.timing(animationController, config).start()
    LayoutAnimation.configureNext(toggleAnimation)
    setShowContent(!showContent)
  };

  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg']
  })

  function goToVendorQuotes(vendor) {
    navigation.navigate("Company Quotes", {
      vendorInfo: vendor
    })

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleListItem()}>
        <View style={styles.titleContainer}>



          {/* Title here is going to be category title */}
          <Text style={styles.title}>{props.data.category}</Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
            <MaterialIcons name={'keyboard-arrow-right'} />
          </Animated.View>
        </View>
      </TouchableOpacity>


      {/* Body here is going to be the list of vendors */}
      {showContent && (
        <View style={styles.body}>
          {props.data.vendors.map(vendor => {
            return (
              <TouchableOpacity onPress={() => goToVendorQuotes(vendor)} key={vendor._id}>
                <Text>{vendor.companyName}</Text>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
    </View>
  )
}

export default AccordionItem

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: '2%',
    borderRadius: 12,
    backgroundColor: 'blue',
    marginBottom: '2%',
    fontWeight: 'bold',
    overflow: 'hidden'
  },
  title: {
    fontSize: 16,
    color: 'yellow',
    fontWeight: 'bold',
  },
  body: {
    paddingBorizontal: '2%',
    paddingVertical: '3%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
})