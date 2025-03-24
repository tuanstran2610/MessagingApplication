import { ip } from "./ip";
import axios from "axios";


export const userLoginAPI = async (username, password) => {
    const url = `${ip}/user/login`;
    try {
        const response = await axios.post(url, { username, password }, { withCredentials: true });
        console.log(response.data.user)
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Login failed:", error.response.data);
            throw new Error(error.response.data.error);
        } else {
            console.error("Unexpected error:", error);
            throw new Error("Something went wrong. Please try again.");
        }
    }
};



export const checkAuthAPI = async () => {
    const url = `${ip}/user/status`;

    try {
        console.log('check auth 2');

        const response = await axios.get(url, {
            withCredentials: true, // Important for session-based authentication
        });
        console.log('check auth data')
        console.log(response.data);
        return response.data; // Returns user data if authenticated
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log("User is not authenticated.");
        } else {
            console.error("Error checking user status:", error);
        }
        return null;
    }
};



export const userLogoutAPI = async () => {
    console.log('Calling logout API...');

    const url = `${ip}/user/logout`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error fetching the API:", error);
        return { success: false, error: error.response?.data?.message || error.message };
    }
};




