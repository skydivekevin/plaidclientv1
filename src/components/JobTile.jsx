import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const JobTile = (props) => {
  const navigation = useNavigation()

  function navigateToJob() {
    navigation.navigate("Job", {
      jobId: props.job._id
    })
    // navigation.navigate("Company Quotes", {
    //   vendorId: vendor._id,
    //   companyName: vendor.companyName,
    //   website: vendor.website
    // })
  }

  return (
    <TouchableOpacity onPress={navigateToJob} style={styles.jobButton}>
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
  jobTile: {
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  jobButton: {
    width: '80%',
  }
})