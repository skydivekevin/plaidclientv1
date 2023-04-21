import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../src/screens/Login';
import Dashboard from '../src/screens/Dashboard';
import CreateAccount from '../src/screens/CreateAccount';
import ClaimProperty from '../src/screens/ClaimProperty';
import LearnMore from '../src/screens/LearnMore';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
        }}
      >
        <Stack.Group>
          <Stack.Screen
            name='Plaid'
            component={Login}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
              headerShown: false
            }}
          />
           <Stack.Screen
            name='Create Account'
            component={CreateAccount}
          />
          <Stack.Screen
            name='Claim Property'
            component={ClaimProperty}
            options={{
              headerBackVisible: true
            }}
          />
          <Stack.Screen
            name='Learn More'
            component={LearnMore}
            options={{
              headerBackVisible: true
            }}
          />
         
        </Stack.Group>
      </Stack.Navigator>
  )
}

export default StackNavigator