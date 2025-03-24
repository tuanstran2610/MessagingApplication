import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import AboutScreen from '../screens/AboutScreen';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';



import BottomTabNavigator from './BottomTabNavigator';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LoginScreen' screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
                <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
                <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen name="ChatScreen" component={ChatScreen} />
                <Stack.Screen name="AboutScreen" component={AboutScreen} />
                <Stack.Screen name="UpdateProfileScreen" component={UpdateProfileScreen} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

