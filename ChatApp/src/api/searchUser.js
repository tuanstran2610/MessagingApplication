import { ip } from "./ip";
import axios from "axios";

export const userSearchAPI = async (key) => {
    const url = `${ip}/user/search?name=${encodeURIComponent(key)}`;
    try {
        const response = await axios.get(url); // Use GET instead of POST
        return response.data;
    } catch (error) {
        console.error('Searching error:', error.response?.data || error.message);
        return { success: false, error: error.response?.data?.error || 'Search failed' };
    }
};
