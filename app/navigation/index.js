import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UnauthorizedStack from '../navigation/stack/UnAuthorized';
import {navigationRef} from '../RootNavigation';
import MainStack from './MainStack';

import {StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();
const Navigation = props => {
  return (
    <>
      <StatusBar backgroundColor="#47A8B2" />
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName={'Unauthorized'}>
          <Stack.Screen
            name="Unauthorized"
            component={UnauthorizedStack}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Authorized"
            component={MainStack}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
