import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const resetPasswordService = {
    validateToken: async (token) => {
        try {
            console.log('Validating token:', token); // Log the token being validated
            const response = await axios.get(
                `${BASE_URL}/recover/validate_token/${token}`,
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );
            console.log('Token validation response:', response.data);
            return response.data?.message === "Token is valid";
        } catch (error) {
            console.error('Token validation error:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message
            });
            if (error.response?.status === 401) {
                throw "Expired token";
            } else if (error.response?.status === 404) {
                throw "Invalid token";
            }
            throw "Token validation failed";
        }
    },

    resetPassword: async (token, password) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/recover/reset-password`,
                { token, password },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            console.error('Reset password error:', error);
            throw error.response?.data?.error || 
                  error.message || 
                  "Failed to reset password";
        }
    }
};

export const recoveryService = {
    sendRecoveryEmail: async (email) => {
        try {
            const response = await axios.post(`${BASE_URL}/recover/`, { email });
            console.log("Response: ", response, email);
            return response.data;
        } catch (error) {
            throw error.response?.data?.error || "An error occurred. Please try again.";
        }
    }
};
