// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './assets/components/Home';
import InvoiceFormScreen from './assets/components/screens/InvoiceFormScreen/InvoiceFormScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="InvoiceForm" 
          component={InvoiceFormScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




