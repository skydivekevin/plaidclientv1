import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MyJobs () {
  return (
    <View style={styles.container}>
      <Text>You don't currently have any jobs scheduled, view your quotes and schedule a service to book a job.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})