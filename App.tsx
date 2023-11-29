/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import LaunchScreen from './src/screen/LaunchScreen';
import HomeScreen from './src/screen/HomeScreen';
import { NavigationScreenPropsType } from './src/utils/types';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<NavigationScreenPropsType>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LandingScreen" component={LaunchScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  )
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      {RootNavigator()}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
