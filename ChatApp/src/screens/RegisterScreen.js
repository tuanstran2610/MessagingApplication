import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { userRegisterAPI } from '../api/registerApi';
import React, { useState } from 'react';

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!firstName.trim() ||
      !lastName.trim() ||
      !age.toString().trim() ||
      !email.trim() ||
      !username.trim() ||
      !password.trim()) {
      setValidationMessage('Please fill in your information')
      return;
    }
    setLoading(true);
    setValidationMessage('');

    try {
      const responseData = await userRegisterAPI(firstName, lastName, age, gender, email, username, password);

      if (responseData.success) {
        navigation.navigate('LoginScreen');
      } else {
        //setValidationMessage(responseData.error || "Username exist. Try again.");
        const errString = JSON.stringify(responseData.error);
        //console.log(errString);
        if(errString.includes('email')){
          setValidationMessage("Email exist. Try again");
        }
        if(errString.includes('age')){
          setValidationMessage("Fill in a number at Age");
        }
        if(errString.includes('username')){
          setValidationMessage("Username exist. Try again.");
        }
      }
    } catch (error) {
      setValidationMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="white"
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="white"
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        placeholderTextColor="white"
        keyboardType="numeric"
        onChangeText={setAge}
      />

      <View style={styles.genderSelection}>
        <Text style={styles.genderText}>Gender:</Text>
        <View style={styles.radioButtonContainer}>
          {['Male', 'Female', 'Other'].map((g) => (
            <TouchableOpacity key={g} onPress={() => setGender(g)}>
              <View style={styles.radioButton}>
                {gender === g && <View style={styles.radioButtonSelected} />}
              </View>
              <Text style={styles.radioButtonText}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="white"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="white"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry
        onChangeText={setPassword}
      />

      {validationMessage ? <Text style={styles.errorText}>{validationMessage}</Text> : null}

      <TouchableOpacity
        style={[styles.registerButton, loading ? styles.disabledButton : null]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Register</Text>}
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.buttonText}>Already a member? Login!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: '#333333',
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'white',
  },
  registerButton: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A5A5A5',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  genderSelection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  genderText: {
    color: 'white',
    marginRight: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
  },
  radioButtonText: {
    color: 'white',
  },
  errorText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 10,
  },
});
