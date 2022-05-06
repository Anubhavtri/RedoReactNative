import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../containers/Dashboard';
import KYCDocuments from '../containers/KYCDocuments';
import AadharCard from '../containers/AadharCard';
import VideoKYC from '../containers/VideoKYC';
import Signature from '../containers/Signature';
import MERFrom from '../containers/MERFrom';
import HealthMonitor from '../containers/HealthMonitor';








const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="KYCDocuments"
        component={KYCDocuments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AadharCard"
        component={AadharCard}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="VideoKYC"
        component={VideoKYC}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signature"
        component={Signature}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MERFrom"
        component={MERFrom}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HealthMonitor"
        component={HealthMonitor}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};
export default MainStack;
