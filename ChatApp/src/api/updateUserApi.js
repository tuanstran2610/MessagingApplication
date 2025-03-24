import { ip } from "./ip";
import axios from "axios";

export const updateUserAPI = async (userData, currentPassword) => {
    const url = `${ip}/user/update`;

    try {
        const response = await axios.put(
            url,
            { ...userData, password: currentPassword },
            { withCredentials: true }
        );

        return response.data;
    } catch (error) {
        if (error.response) {
            return { success: false, message: error.response.data.message };
        }
        return { success: false, message: "Something went wrong." };
    }
};

export const changePasswordAPI = async (oldPassword, newPassword) => {
    const url = `${ip}/user/change-password`;
    try {
        const response = await axios.put(
            url,
            { oldPassword, newPassword },
            { withCredentials: true } // Ensures cookies (session) are sent
        );

        return response.data; // Returns success message
    } catch (error) {
        return { success: false, message: error.response?.data?.message || "Something went wrong" };
    }
};