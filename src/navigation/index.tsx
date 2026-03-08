/**
 * ROBOT BRAIN - Navigation Setup
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainControllerScreen from '../screens/MainController';
import {CyberpunkColors} from '../theme/colors';

export type RootStackParamList = {
  MainController: undefined;
  CodeLab: undefined;
  Sequences: undefined;
  VoiceStudio: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainController"
        screenOptions={{
          headerStyle: {
            backgroundColor: CyberpunkColors.deepCharcoal,
          },
          headerTintColor: CyberpunkColors.electricCyan,
          headerTitleStyle: {
            fontFamily: 'Orbitron-Regular',
            fontWeight: '700',
          },
          contentStyle: {
            backgroundColor: CyberpunkColors.deepCharcoal,
          },
        }}>
        <Stack.Screen
          name="MainController"
          component={MainControllerScreen}
          options={{
            title: 'ROBOT BRAIN',
            headerShown: false, // Full screen controller
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

