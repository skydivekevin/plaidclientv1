import React from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity } from 'react-native';

const VendorTile = ({ vendor }) => {
  const screenWidth = Dimensions.get('window').width;
  const tileWidth = screenWidth * 0.9;

  return (
    <View style={[styles.container, { width: tileWidth }]}>
      <Image source={{ uri: vendor.logo }} style={styles.logo} />
      <Text style={styles.companyName} numberOfLines={2} ellipsizeMode="tail">{vendor.companyName}</Text>
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
      marginLeft: 10,
      fontSize: 20,
      flex: 1,
      maxHeight: 60
    }
}
