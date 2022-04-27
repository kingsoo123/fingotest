
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer,useNavigation,NavigationContext } from '@react-navigation/native';
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';

import FlashScreen from './screens/flash';
import LoginScreen from './screens/login';
import SignupScreen from './screens/signup';
import ClaimedReferralsScreen  from './screens/claimed_referals'
import DashboardScreen  from './screens/dashboard'
const Stack = createStackNavigator();

const App = ()=>{
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen
        options={{
          headerTintColor: 'limegreen',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black'
          },
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
         name="Flash" component={FlashScreen} />
        <Stack.Screen
        options={{
          headerTintColor: 'orange',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black'
          },
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
         name="Login" component={LoginScreen} />
        <Stack.Screen 
        options={{
          headerTintColor: 'orange',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black'
          },
          cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
        }}
        name="Register" component={SignupScreen} />
      <Stack.Screen 
        options={{
          headerTintColor: 'orange',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black'
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
        name="ClaimedReferal" component={ClaimedReferralsScreen} />
       <Stack.Screen 
        options={{
          headerTintColor: 'orange',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'black'
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="dashboard" component={DashboardScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
