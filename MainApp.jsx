import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from "react";
import StackNavigator from "./navigation/StackNavigator";
import BottomNavbarMain from "./src/components/BottomNavbarMain"
import MyAccount from './src/screens/MyAccount';


import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useNavigation } from '@react-navigation/native';

import UserContext from './context/UserContext';

export default function MainApp() {

  const { token } = useContext(UserContext)

  const navigation = useNavigation();
  const Tab = createMaterialBottomTabNavigator();

  return (
    <>
      <StackNavigator />

      {token ? <BottomNavbarMain /> : null}
    </>
  )
}



const styles = StyleSheet.create({})