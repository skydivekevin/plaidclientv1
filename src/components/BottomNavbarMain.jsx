import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function BottomNavbarMain() {
  return (
    <View>
      <Text>BottomNavbarMain</Text>
    </View>
  )
}






// import * as React from 'react';
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';

// export default function BottomNavbarMain() {
//   const [value, setValue] = React.useState(0);

//   return (
//     <Box sx={{ width: 500 }}>
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//       >
//         <BottomNavigationAction label="Recents" />
//         <BottomNavigationAction label="Favorites" />
//         <BottomNavigationAction label="Nearby" />
//       </BottomNavigation>
//     </Box>
//   );
// }





// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// export default function BottomNavbarMain() {


//   function HomeScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Home!</Text>
//       </View>
//     );
//   }
  
//   function SettingsScreen() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Settings!</Text>
//       </View>
//     );
//   }
  
//   // const Tab = createBottomTabNavigator();

// }
