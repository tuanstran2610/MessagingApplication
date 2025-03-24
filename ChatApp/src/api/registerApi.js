import axios from "axios";
import { ip } from "./ip";

export const userRegisterAPI = async (firstName, lastName, age, gender, email, username, password) => {
    const url = `${ip}/user/register`;
    try {
        const response = await axios.post(url, {
            firstName,
            lastName,
            age,
            gender,
            email,
            username,
            password,
        });

        return response.data;
    } catch (error) {
        console.error('Registration error:', error.response?.data || error.message);
        return { success: false, error: error.response?.data?.error || 'Registration failed' };
    }
}