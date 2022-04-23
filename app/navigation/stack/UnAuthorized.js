import React from 'react';
import splash from '../../containers/Splash'



import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const UnauthorizedStack = () => {
    return (
        <Stack.Navigator initialRouteName='Splash' >

            <Stack.Screen
                name="Splash"
                component={splash}
                screenOptions={{ headerShown: false }}
                header={{ headerShown: false }}
                options={{ headerShown: false }}
            >
            </Stack.Screen>
            {/* <Stack.Screen name="SelectType" component={SelectUserType} options={{ headerShown: false }} /> */}
             
        </Stack.Navigator>
    )
}

export default UnauthorizedStack;