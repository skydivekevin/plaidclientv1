import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import BottomNavbarMain from '../components/BottomNavbarMain';

const Dashboard = () => {

  return (
    <View style={styles.dashboard}>
      <BottomNavbarMain />
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  dashboard: {
    height: "100%"
  }
})