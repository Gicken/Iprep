import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
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
