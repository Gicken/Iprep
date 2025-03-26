import axios from 'axios';
import { API_ENDPOINTS } from '../../../../lib/constants';

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(API_ENDPOINTS.REGISTER, formData, {
      headers: { 'Content-Type': 'application/json' },
    });
    console.log('REGISTER Response,', response);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : 'Error: Could not connect to the server.';
  }
};