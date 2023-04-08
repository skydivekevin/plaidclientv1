import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from "react";
import StackNavigator from "./navigation/StackNavigator";
import BottomNavbar from './src/components/BottomNavbar';

import { useNavigation } from '@react-navigation/native';

import UserContext from './context/UserContext';

const Main = () => {

  const { token } = useContext(UserContext)
  console.log("navigation.state: ")

  const navigation = useNavigation();
  return (
    <>
      <StackNavigator />
      {token ? <BottomNavbar /> : null}
      
    </>
  )
}

export default Main

const styles = StyleSheet.create({})