import { StyleSheet, Text } from 'react-native'
import React, { useContext } from "react";
import StackNavigator from "./navigation/StackNavigator";

import UserContext from './context/UserContext';

export default function MainApp() {

  return (
    <>
      <StackNavigator />
    </>
  )
}


// Bottom Navigation: Dashboard, Jobs, Quotes, More

//Dashboard:
    //Stack navigator: Reports, Misc Notes? {stain color for flooring, tile reference, paint colors by room etc.}

//Jobs:
    //Stack navigator: Upcoming Jobs, Past Jobs

//Quotes:
    //Existing quotes
    //Request a quote

//More: Account, Notes? (stain color for floors, paint colors for walls, etc.), Learn more about Plaid

//Account:
    // Logout
    // Profile (name, email, address, reset password, payment info?)
