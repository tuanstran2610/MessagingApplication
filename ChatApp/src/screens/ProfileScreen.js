import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { checkAuthAPI } from '../api/loginApi'; // Ensure this path is correct

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data when the screen is focused
  useFocusEffect(
    useCallback(() => {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          const userData = await checkAuthAPI();
          if (userData) {
            setUser(userData);
          } else {
            console.warn('User not authenticated.');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Avatar & Username */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user?.avatar || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user?.username || 'No Username'}</Text>
      </View>

      {/* User Details */}
      <View style={styles.detailsContainer}>
        <DetailItem label="First Name" value={user?.firstName} />
        <DetailItem label="Last Name" value={user?.lastName} />
        <DetailItem label="Email" value={user?.email} />
        <DetailItem label="Age" value={user?.age} />
        <DetailItem label="Gender" value={user?.gender} />
      </View>

      {/* Update Profile & Change Password Buttons */}
      <TouchableOpacity style={styles.changePasswordButton} onPress={() => navigation.navigate('UpdateProfileScreen')}>
        <Text style={styles.changePasswordText}>Update Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.changePasswordButton} onPress={() => navigation.navigate('ChangePasswordScreen')}>
        <Text style={styles.changePasswordText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

// Reusable Detail Component
const DetailItem = ({ label, value }) => (
  <View style={styles.detailBox}>
    <Text style={styles.detailText}>
      <Text style={styles.label}>{label}: </Text>{value || 'N/A'}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
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
    zIndex: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#555',
  },
  username: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  detailBox: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#1e1e1e',
  },
  detailText: {
    fontSize: 16,
    color: 'white',
  },
  label: {
    fontWeight: 'bold',
    color: 'white',
  },
  changePasswordButton: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  changePasswordText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default ProfileScreen;
