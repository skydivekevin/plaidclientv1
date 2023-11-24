import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';

const VendorTile = ({ vendor }) => {
  const screenWidth = Dimensions.get('window').width;
  const tileWidth = screenWidth * 0.8;
  return (
    <View style={[styles.container, { width: tileWidth }]}>
      <Image source={{ uri: vendor.logo }} style={styles.logo} />
      <Text style={styles.companyName}>{vendor.companyName}</Text>
    </View>
  );
};

export default VendorTile;

const styles = {
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10

    },
    logo: {
      width: 150,
      height: 50,
    },
    companyName: {
      marginLeft: 50,
      fontSize: 30
    }
}
