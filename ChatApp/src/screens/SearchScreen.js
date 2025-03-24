import { View, Text, TextInput, StatusBar, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { userSearchAPI } from '../api/searchUser';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { createBoxChatAPI } from '../api/boxChatApi';
import React, { useState, useCallback } from 'react';

export default function SearchScreen({ route }) {
  const loggedID = route.params.loggedID;
  const navigation = useNavigation();

  const [usersList, setUsersList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([loggedID]);
  const [groupName, setGroupName] = useState('');

  const handleSearch = async () => {
    if (searchText.length > 0) {
      const results = await userSearchAPI(searchText);
      setUsersList(results);
    } else {
      setUsersList([]);
    }
  };

  const createChatHandle = async (searchedUserID) => {
    setSelectedUsers((prevUsers) => {
      const updatedUsers = prevUsers.includes(searchedUserID) ? prevUsers : [...prevUsers, searchedUserID];

      if (updatedUsers.length === 2) {
        createBoxChatAPI({
          participants: updatedUsers,
          isGroupChat: false,
          groupName: '',
        }).then((result) => {
          if (result._id) {
            navigation.navigate("ChatScreen", {
              chatID: result._id,
              loggedID: loggedID,
            });
          } else {
            alert(result.error);
          }
        });
      }

      return updatedUsers;
    });
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  useFocusEffect(
    useCallback(() => {
      setSearchText('');
      setUsersList([]);
      setSelectedUsers([loggedID]); // Reset selected users on screen focus
    }, [loggedID])
  );

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search User"
          placeholderTextColor="#888"
          style={styles.searchInput}
          onChangeText={setSearchText}
          value={searchText}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <AntIcon name="search1" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={usersList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const isSelected = selectedUsers.includes(item._id);

          return (
            <View style={styles.userItem}>
              <TouchableOpacity
                style={styles.userInfo}
                onPress={() => createChatHandle(item._id)}
                activeOpacity={0.7}
              >
                <View style={styles.avatar} />
                <Text style={styles.userName}>{item.firstName} {item.lastName}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => toggleUserSelection(item._id)}
                style={styles.circle}
                activeOpacity={0.7}
              >
                {isSelected && <View style={styles.circleFilled} />}
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={<Text style={styles.noUsers}>No users found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 50,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 45,
  },
  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 10,
  },
  searchButton: {
    padding: 10,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#666',
    marginRight: 10,
  },
  userInfo: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingVertical: 12,
  },
  userName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  noUsers: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

