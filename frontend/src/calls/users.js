import { axiosInstance } from ".";

export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error.response?.data || 'Login failed';
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await axiosInstance.post('/auth/register', { name, email, password });
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error.response?.data || 'Register failed';
    }
}