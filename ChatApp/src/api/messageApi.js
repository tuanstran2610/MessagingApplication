import { ip } from "./ip";
import axios from "axios";


export const getMessageAPI = async (chatId) => {
    const url = `${ip}/message/${chatId}`;
    try {
        const response = await axios.get(url, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
};

