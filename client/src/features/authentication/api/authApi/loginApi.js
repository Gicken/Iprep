import axios from 'axios';
import { API_ENDPOINTS } from '../../../../lib/constants'

export const login = async (email, password) => {
  try {
    const response = await axios.post(API_ENDPOINTS.LOGIN, { email, password });
    console.log('LOGIN RESPONE: ', response.data);
    return response;
  } catch (error) {
    console.error('Login error:', error.response?.data?.message || error.message);
    throw error;
  }
};