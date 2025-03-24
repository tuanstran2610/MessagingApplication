import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { getMessageAPI } from '../api/messageApi';
import AntIcon from 'react-native-vector-icons/AntDesign';
import io from 'socket.io-client';

const socket = io("http://192.168.1.47:3030", {
  transports: ["websocket"], // Ensure WebSocket is used for connection
});

export default function ChatScreen({ route, navigation }) {
  const { chatID, loggedID, chatName } = route.params;
  console.log(loggedID)
  const [messages, setMessages] = useState([]);
  const [socketMessages, setSocketMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    // Fetch messages when the screen loads
    const fetchMessages = async () => {
      const fetchedMessages = await getMessageAPI(chatID);
      setMessages(fetchedMessages);
      setSocketMessages([]); // Clear socket messages when reloading
    };

    fetchMessages();

    // Join chat room via Socket.io
    socket.emit("joinChat", chatID);

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      setSocketMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatID]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      chatId: chatID,
      senderId: loggedID,
      message: newMessage,
      mediaUrl: null,
    };

    // Emit message via Socket.io
    socket.emit("sendMessage", messageData);

    setNewMessage(""); // Clear input field
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntIcon name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.avatar} />
        <Text style={styles.chatName}>{chatName}</Text>
      </View>

      {/* Messages List */}
      <FlatList
        ref={flatListRef}
        data={[...messages, ...socketMessages]} // Combine API & Socket messages
        keyExtractor={(item, index) => item._id || `socket-${index}`}
        renderItem={({ item }) => {
          const isUserMessage = item.senderId === loggedID;
          return (
            <View
              style={[
                styles.messageContainer,
                isUserMessage ? styles.userMessage : styles.otherMessage
              ]}
            >
              <Text style={styles.messageText}>{item.message}</Text>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 80 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="gray"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <AntIcon name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#222",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#555",
    marginLeft: 15,
  },
  chatName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
    marginRight: 10,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#444",
    marginLeft: 10,
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#222",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#333",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 20,
  },
});

