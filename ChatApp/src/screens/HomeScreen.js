import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getChatAPI } from '../api/boxChatApi';
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen({ route }) {
  const userID = route.params.userID;
  const [chats, setChats] = useState([]);
  const [listChat, setListChat] = useState([]);
  const navigation = useNavigation();


  //console.log(route)
  // Function to fetch groupChats from AsyncStorage
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem(userID);
      if (value) {
        const data = JSON.parse(value);
        setListChat(data.groupChats || []);
      }
    } catch (error) {
      console.error('Error retrieving data', error);
    }
  };

  // Fetch groupChats when component mounts
  useEffect(() => {
    getData();
  }, []);

  // Polling function: fetch chats every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      //console.log("Fetching new chat data...");
      const chatData = await getChatAPI(userID);
      setChats(chatData);
    }, 1000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const navigateChatScreen = (chatID, chatName) => {
    navigation.navigate("ChatScreen", {
      chatID: chatID,
      loggedID: userID, // Passing loggedID
      chatName: chatName
    });
  }

  const renderChatItem = ({ item }) => {
    let chatName = "Unknown";

    if (item.isGroupChat) {
      chatName = item.groupName;
    } else {
      const participant = item.participants.find(p => p._id !== userID);
      if (participant) {
        chatName = `${participant.firstName} ${participant.lastName}`;
      }
    }



    return (
      <TouchableOpacity style={styles.chatBox} onPress={() => navigateChatScreen(item._id, chatName)}>
        <View style={styles.avatarPlaceholder} />
        <View style={styles.chatInfo}>
          <Text style={styles.chatName}>{chatName}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage?.message || ""}</Text>
        </View>
        <Icon name="chevron-right" size={16} color="gray" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Chat Screen</Text> */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item._id}
        renderItem={renderChatItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10
  },
  header: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  chatBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    marginVertical: 5
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
    marginRight: 10
  },
  chatInfo: {
    flex: 1
  },
  chatName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  lastMessage: {
    color: 'gray',
    fontSize: 14,
    marginTop: 3
  },
});
