import axios from 'axios';
import { API_ENDPOINTS } from '../utils/constants';
import { jwtDecode } from "jwt-decode";

const AuthService = {
  login: async (email, password) => {
    console.log("AuthService: Sending request: ", {email, password})
    try {
      const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
      console.log("AuthService: response: ", response)
      const { token } = response.data;

      if (token) {
        localStorage.setItem('token', token);
      }

      return response;
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');

    if (!token) return null;
    console.log("getcurrentUser: token", token)
    //use the token to get current user
    // try {}catch(error){console.er}
    // localStorage.setItem("token", token);

    // let's decode the token to get user details
    try{
      const decodedUser = jwtDecode(token);
      console.log("Decoded User: ", decodedUser);

      // Store user details in localStorage
      const userDetails = decodedUser;
      console.log("Decoded User Details: ", userDetails)
      localStorage.setItem("FirstName: ", userDetails.firstName);
      localStorage.setItem("LastName: ", userDetails.lastName);
      localStorage.setItem("Email: ", userDetails.email);
      localStorage.setItem("Role: ", userDetails.role);
      localStorage.setItem("ID: ", userDetails.id);
      localStorage.setItem("user", JSON.stringify(decodedUser));

      return userDetails
  }catch(error){
      console.error('Error fetching current user:', error.response?.data?.message || error.message);
      return null;
    }

    // try {
    //   const response = await axios.get(API_ENDPOINTS.CURRENT_USER, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   return response.data;
    // } catch (error) {
    //   console.error('Error fetching current user:', error.response?.data?.message || error.message);
    //   return null;
    // }
  },
};

export default AuthService;
