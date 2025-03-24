import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingScreen from '../screens/SettingScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const route = useRoute();
    const userID = route.params?.userID; // Extract userID
    const paramUserID = route.params?.params?.userID;
    console.log(paramUserID);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: '#343541' },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#888',
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ color, size = 24 }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = "home";
                        return <Icon name={iconName} color={color} size={size} />;
                    } else if (route.name === "Search") {
                        iconName = "search";
                        return <Icon name={iconName} color={color} size={size} />;
                    } else if (route.name === "Settings") {
                        iconName = "settings-outline";
                        return <Ionicons name={iconName} color={color} size={size} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" initialParams={{ loggedID: paramUserID }}>
                {(props) => <HomeScreen {...props} />}
            </Tab.Screen>

            <Tab.Screen name="Search" initialParams={{ loggedID: paramUserID }}>
                {(props) => <SearchScreen {...props} />}
            </Tab.Screen>

            <Tab.Screen name="Settings" initialParams={{ loggedID: paramUserID }}>
                {(props) => <SettingScreen {...props} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}