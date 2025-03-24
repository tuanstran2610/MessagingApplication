import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { checkAuthAPI } from '../api/loginApi'; // Import your API functions
import { updateUserAPI } from '../api/updateUserApi'; // Import your API functions

const UpdateProfileScreen = () => {
    const navigation = useNavigation();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        age: '',
        gender: '',
        email: '',
        currentPassword: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await checkAuthAPI();
                if (userData) {
                    setUser(userData);
                    setFormData({
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        age: String(userData.age),
                        gender: userData.gender,
                        email: userData.email,
                        currentPassword: ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleUpdate = async () => {
        if (!formData.currentPassword) {
            Alert.alert("Error", "Please enter your current password.");
            return;
        }

        try {
            const result = await updateUserAPI(
                {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    age: Number(formData.age),
                    gender: formData.gender,
                    email: formData.email
                },
                formData.currentPassword
            );

            navigation.goBack(); // Navigate back after update

        } catch (error) {
            console.error("Update error:", error);
            Alert.alert("Error", "An unexpected error occurred. Please try again.");
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="white" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <Text style={styles.header}>Update Profile</Text>

            {/* Input Fields */}
            <TextInput style={styles.input} placeholder="First Name" placeholderTextColor="white" value={formData.firstName} onChangeText={(text) => handleInputChange("firstName", text)} />
            <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor="white" value={formData.lastName} onChangeText={(text) => handleInputChange("lastName", text)} />
            <TextInput style={styles.input} placeholder="Age" placeholderTextColor="white" value={formData.age} keyboardType="numeric" onChangeText={(text) => handleInputChange("age", text)} />
            <TextInput style={styles.input} placeholder="Gender" placeholderTextColor="white" value={formData.gender} onChangeText={(text) => handleInputChange("gender", text)} />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="white" value={formData.email} keyboardType="email-address" onChangeText={(text) => handleInputChange("email", text)} />
            <TextInput style={styles.input} placeholder="Current Password" placeholderTextColor="gray" secureTextEntry value={formData.currentPassword} onChangeText={(text) => handleInputChange("currentPassword", text)} />

            {/* Update Button */}
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                <Text style={styles.updateButtonText}>Update Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#121212',
    },
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 20,
    },
    input: {
        backgroundColor: '#1e1e1e',
        color: 'white',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#555',
    },
    updateButton: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    updateButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default UpdateProfileScreen;
