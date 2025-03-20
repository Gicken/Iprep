import axios from 'axios';
import { API_ENDPOINTS, apiClient } from '../utils/constants';
import { jwtDecode } from 'jwt-decode';

const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
      const token  = response.data.access_token;

      if (token) {
        sessionStorage.setItem('token', token);
        const user = AuthService.decodeToken(token);
        sessionStorage.setItem('user', JSON.stringify(user));

        console.log("✅ Login Successful");
      }

      return response;
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  // REGISTER
  registerUser: async (formData) => {
    try {
        const response = await axios.post(API_ENDPOINTS.REGISTER, formData, {
            headers: { "Content-Type": "application/json" }
        });
        console.log("REGISTER Response,", response)
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data.error : "Error: Could not connect to the server.";
    }
  },

  //PASSWORD RESET
  validateToken: async (token) => {
    try {
        const response = await apiClient.get(`/recover/validate_token/${token}`);
        return response.status === 200;
    } catch (err) {
        console.error("Token validation failed:", err);
        return false;
    }
  },

  resetPassword: async (token, password) => {
    try {
        const response = await apiClient.post("/recover/reset-password", { token, password });
        return response.data.message;
    } catch (err) {
        console.error("Password reset failed:", err);
        throw new Error(err.response?.data?.error || "Failed to reset password");
    }
  },

  logout: () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    console.log("✅ Logout Successful");
    
    // Notify other tabs
    localStorage.setItem('logout', Date.now());
  },

  getCurrentUser: () => {
    const token = sessionStorage.getItem('token');
    if (!token || AuthService.isTokenExpired(token)) return null;

    return AuthService.decodeToken(token);
  },

  decodeToken: (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error.message);
      return null;
    }
  },

  isTokenExpired: (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.log("An Error occured: ", error);
      return true; 
    }
  },


};

export default AuthService;
