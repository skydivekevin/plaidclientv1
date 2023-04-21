import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyJobs from '../screens/MyJobs';
import MyQuotes from '../screens/MyQuotes';
import RequestQuote from '../screens/RequestQuote';
import More from '../screens/More';

const Tab = createBottomTabNavigator();

export default function BottomNavbarMain() {

    return (
      <Tab.Navigator>
        <Tab.Screen name="My Quotes" component={MyQuotes}/>
        <Tab.Screen name="My Jobs" component={MyJobs} />
        <Tab.Screen name="Request Quote" component={RequestQuote} />
        <Tab.Screen name="More" component={More} />
      </Tab.Navigator>
    );
}

