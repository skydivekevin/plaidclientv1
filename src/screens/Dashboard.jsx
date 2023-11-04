import { StyleSheet, View } from 'react-native'
import React, { useEffect, useContext } from 'react';
import BottomNavbarMain from '../components/BottomNavbarMain';
import ApiContext from '../../context/ApiContext';
import { Utils } from '../../utils/httpUtils';

const Dashboard = () => {
  const { places, setPlaces } = useContext(ApiContext)

  useEffect(() => {
    if (!places) {
      Utils.getJson('fetchGoogle')
        .then(response => setPlaces(response.data.places))
    }
  })

  return (
    <View style={styles.dashboard}>
      <BottomNavbarMain />
    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  dashboard: {
    height: "100%",
  }
})