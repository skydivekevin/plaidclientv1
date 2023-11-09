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
  const category = props.category
  const vendors = props.data.vendors
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
      vendorId: vendor._id,
      companyName: vendor.companyName,
      website: vendor.website
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => toggleListItem()}>
        <View style={styles.titleContainer}>

          {/* Title here is going to be category title */}
          <Text style={styles.title}>{props.data.category}</Text>
          <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
            <MaterialIcons name={'keyboard-arrow-right'} style={styles.arrow} />
          </Animated.View>
        </View>
      </TouchableOpacity>


      {/* Body here is going to be the list of vendors */}
      {showContent && (
        <View style={styles.body}>
          {props.data.vendors?.map(vendor => {
            return (
              <TouchableOpacity onPress={() => goToVendorQuotes(vendor)} key={vendor._id} style={styles.listItem}>
                <Text style={styles.companyName}>{vendor.companyName}</Text>
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
    backgroundColor: '#f0f0f0',
    marginBottom: '2%',
    fontWeight: 'bold',
    overflow: 'hidden',
    // borderColor: '#ff5a41',
    borderColor: '#eb642a',
    // borderColor: 'gray',
    borderWidth: 1.5
  },
  title: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  body: {
    paddingHorizontal: '2%',
    paddingVertical: '3%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItem: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'left',
    borderWidth: 1,
    // borderColor: '#ff5a41',
    borderColor: 'gray',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  companyName: {
    color: 'black',
    fontWeight: '500',
    fontSize: 20
  },
  arrow: {
    height: 30,
    fontSize: 30,
    fontWeight: 'bold'
  }
})