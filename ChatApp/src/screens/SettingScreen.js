import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { userLogoutAPI } from "../api/loginApi";
import { useNavigation } from "@react-navigation/native";

const SettingScreen = ({ route }) => {
  const navigation = useNavigation();

  const loggedID = route.params.loggedID;
  //console.log(route.params.loggedID);

  const handleLogout = async () => {
    try {
      const response = await userLogoutAPI();
      if (response.success) {
        console.log('Logged out successfully');
        navigation.navigate('LoginScreen');
      } else {
        console.error('Logout failed:', response.error);
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const profileNavigation = () => {
    console.log(route.params)
    navigation.navigate("ProfileScreen", { loggedID: loggedID });
  };

  const aboutUsNavigation = () => {
    navigation.navigate("AboutScreen");
  };

  const updateProfileNavigation = () => {
    navigation.navigate("UpdateProfileScreen");
  };

  const changePasswordNavigation = () => {
    navigation.navigate("ChangePasswordScreen");
  };

  return (
    <View style={styles.container}>
      {/* Profile & About Us Section */}
      <View style={styles.topSection}>
        <TouchableOpacity style={styles.cardButton} onPress={profileNavigation}>
          <View style={styles.iconCircle}>
            <AntDesign name='profile' size={22} color='#fff' />
          </View>
          <Text style={styles.cardText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={updateProfileNavigation}>
          <View style={styles.iconCircle}>
            <FontAwesome name="user-o" size={22} color="#fff" />
          </View>
          <Text style={styles.cardText}>Update Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={changePasswordNavigation}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="password" size={22} color="#fff" />
          </View>
          <Text style={styles.cardText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardButton} onPress={aboutUsNavigation}>
          <View style={styles.iconCircle}>
            <MaterialIcons name="info" size={22} color="#fff" />
          </View>
          <Text style={styles.cardText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button at Bottom */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181818",
    justifyContent: "space-between",
    padding: 20,
  },
  topSection: {
    marginTop: 30,
  },
  cardButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#252525", // Modern dark background
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#444", // Dark gray circle
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  cardText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "white", // Red logout button
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default SettingScreen;





