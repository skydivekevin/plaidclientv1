import { StyleSheet, Text } from 'react-native'
import React, { useContext } from "react";
import StackNavigator from "./navigation/StackNavigator";




import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { useNavigation } from '@react-navigation/native';

import UserContext from './context/UserContext';

export default function MainApp() {

  return (
    <>
      <StackNavigator />
    </>
  )
}



const styles = StyleSheet.create({
  // container: {
  //   height: "100%",
  //   alignItems: "center"
  // }

})

//There will be Dashboard, Jobs and Quotes, and More tabs in the bottom tab navigation
//More will open up another menu with Account, 


//Dashboard:
    //Stack navigator: Reports, Misc Notes? {stain color for flooring, tile reference, paint colors by room etc.}

//Jobs:
    //Stack navigator: Upcoming Jobs, Past Jobs

//Quotes:
    //Existing quotes
    //Request a quote

//Account:
    //Stack navigator: Reset Password
