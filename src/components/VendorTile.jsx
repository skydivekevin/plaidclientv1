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
    padding: 10,
    marginBottom: 8,
        shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  companyName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
}

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#F5F5F5',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 16,
//   },
//   companyName: {
//     flex: 1,
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//   },
