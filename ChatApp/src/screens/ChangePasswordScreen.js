import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { changePasswordAPI } from '../api/updateUserApi'; // Make sure to import your API function

const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert("Error", "All fields are required.");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New passwords do not match.");
            return;
        }

        setLoading(true);
        const result = await changePasswordAPI(oldPassword, newPassword);
        setLoading(false);

        if (result.success) {
            //Alert.alert("Success", "Password changed successfully!");
            navigation.goBack(); // Navigate back after update
        } else {
            Alert.alert("Error", result.message);
        }
    };

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color="white" />
            </TouchableOpacity>

            <Text style={styles.header}>Change Password</Text>

            <TextInput
                style={styles.input}
                placeholder="Old Password"
                placeholderTextColor="gray"
                secureTextEntry
                value={oldPassword}
                onChangeText={setOldPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                placeholderTextColor="gray"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                placeholderTextColor="gray"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.updateButton} onPress={handleChangePassword} disabled={loading}>
                {loading ? (
                    <ActivityIndicator size="small" color="black" />
                ) : (
                    <Text style={styles.updateButtonText}>Change Password</Text>
                )}
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

export default ChangePasswordScreen;
