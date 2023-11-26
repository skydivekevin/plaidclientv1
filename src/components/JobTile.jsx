import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const JobTile = (props) => {
  const navigation = useNavigation()
  const screenWidth = Dimensions.get('window').width;
  const tileWidth = screenWidth * 0.8;

  function navigateToJob() {
    navigation.navigate("Job", {
      jobId: props.job._id
    })
  }

  return (
    <TouchableOpacity onPress={navigateToJob} style={[styles.container, { width: tileWidth }]}>
      <View style={styles.jobTile}>
        <Text>{props.job.vendorName} for ${props.job.totalPrice}</Text>
        {/* <Text>Job Price: {props.job.totalPrice}</Text> */}
        {/* <Text>Status: {props.job.totalPrice}</Text> */}
      </View>
    </TouchableOpacity>
  )
}

export default JobTile

const styles = StyleSheet.create({
  // jobTile: {
  //   borderColor: 'gray',
  //   borderWidth: 2,
  //   borderRadius: 5,
  //   padding: 10,
  //   margin: 10,
  // },
  // jobButton: {
  //   width: '80%',
  // }
  container: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10
    },
  jobButton: {
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