import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.description}>
        Welcome to our chat application! This app allows users to connect with friends, create groups, and exchange messages in real time.
      </Text>
      <Text style={styles.description}>
        Built using React Native, MongoDB, NodeJS, ExpressJS, and Socket.io, it provides a seamless and interactive chatting experience.
      </Text>
      <Text style={styles.footer}>Developed by TRAN ANH TUAN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    fontSize: 14,
    color: 'gray',
    marginTop: 20,
  },
});
