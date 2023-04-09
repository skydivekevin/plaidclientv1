import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../src/screens/Login';
import Dashboard from '../src/screens/Dashboard';
import MyProperty from '../src/screens/MyProperty';
import MyJobs from '../src/screens/MyJobs';
import MyQuotes from '../src/screens/MyQuotes';
import CreateAccount from '../src/screens/CreateAccount';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
      <Stack.Navigator
        screenOptions={{
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: { backgroundColor: 'tomato' },
          headerBackVisible: false,
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
          {/* <Stack.Screen
            name='My Property'
            component={MyProperty}
          />
          <Stack.Screen
            name='My Jobs'
            component={MyJobs}
          />
          <Stack.Screen
            name='My Quotes'
            component={MyQuotes}
          />
          */}
        </Stack.Group>
      </Stack.Navigator>
  )
}

export default StackNavigator