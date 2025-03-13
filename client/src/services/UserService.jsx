import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
import AuthService from './AuthService';

const UserService = {
  getProfile: async () => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      console.warn("No authentication token found. Redirecting to login...");
      throw new Error("Authentication required");
    }

    try {
      const response = await axios.get(API_ENDPOINTS.USER_PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        console.warn("Unauthorized! Logging out...");
        // AuthService.logout();
        window.location.href = "/login";
      }

      throw new Error(error.response?.data?.message || "Failed to fetch user profile");
    }
  },
};

export default UserService;