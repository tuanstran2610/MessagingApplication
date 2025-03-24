import { ip } from "./ip";
import axios from "axios";

export const getChatAPI = async (userID) => {
    // console.log(userID)
    const url = `${ip}/chat/get-chats/${userID}`;
    try {
        const response = await axios.get(url
            , { withCredentials: true });
        //console.log(response.data);
        return response.data;
    } catch (error) {
        //console.error('Error fetching chats:', error.response ? error.response.data : error.message);
        return null;
    }
};


export const createBoxChatAPI = async ({ participants, isGroupChat, groupName }) => {
    try {
        const response = await axios.post(
            `${ip}/chat/new-box-chat`,
            { participants, isGroupChat, groupName },
            { withCredentials: true } // Ensure session-based authentication works
        );

        return response.data; // Return the response
    } catch (error) {
        console.error('Error creating chat:', error.response?.data || error.message);
        return { success: false, error: error.response?.data?.message || 'Failed to create chat' };
    }
};
