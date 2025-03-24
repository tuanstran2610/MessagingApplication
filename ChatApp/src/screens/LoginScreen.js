import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userLoginAPI, checkAuthAPI } from '../api/loginApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [validation, setValidation] = useState(true);

    useEffect(() => {
        console.log('check auth 1');
        const checkAuthUser = async () => {
            try {
                const response = await checkAuthAPI();
                console.log(response._id);
                if (response) {
                    storeUserData(response._id, response);
                    navigateToHome(response._id);
                }
            } catch (error) {
                console.log('Auth check failed:', error);
            }
        };
        checkAuthUser();
    }, []);


    const storeUserData = async (userID, userData) => {
        try {
            await AsyncStorage.setItem(userID, JSON.stringify(userData));
            console.log("User data saved!");
        } catch (error) {
            console.error("Error saving user data:", error);
        }
    };


    const navigateToHome = (userID) => {
        console.log('move to home', userID);
        //const id = JSON.stringify(userID);
        navigation.navigate('BottomTabNavigator', {
            screen: 'Home',
            params: { userID }
        });
    };


    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setError('Please fill in your information')
            return;
        }
        setLoading(true);
        try {
            const responseData = await userLoginAPI(username, password);
            console.log('after login')
            console.log(responseData.user._id);
            if (responseData.message) {
                storeUserData(responseData.user._id, responseData.user);
                navigateToHome(responseData.user._id);
            } else {
                setError(responseData.message || 'Login failed');
                setValidation(false);
            }
        } catch (error) {
            console.log('error')
            console.error("Login error:", error.message);
            setError(error.message);
            setValidation(false);
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder='Username'
                placeholderTextColor="#ccc"
                value={username}
                onChangeText={setUsername}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text style={styles.registerText}>Not a member? Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20
    },
    input: {
        width: '80%',
        height: 45,
        backgroundColor: '#222',
        borderRadius: 8,
        paddingHorizontal: 12,
        color: 'white',
        marginBottom: 10
    },
    error: {
        color: 'white',
        fontSize: 14,
        marginBottom: 10
    },
    loginButton: {
        width: '80%',
        backgroundColor: 'white',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold'
    },
    registerText: {
        color: '#ccc',
        fontSize: 14
    }
});
