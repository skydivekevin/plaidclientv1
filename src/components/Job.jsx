import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Job = (props) => {

  return (
    <View>
      <Text>Job Status: {props.job.jobStatus}</Text>
      <Text>Job Price: {props.job.totalPrice}</Text>
    </View>
  )
}

export default Job

const styles = StyleSheet.create({})