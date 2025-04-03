import axios from 'axios';
import { API_ENDPOINTS } from '../../../lib/constants';

// Create configured axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 30000, // Increased timeout to 30 seconds

  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    throw error;
  }
);

export const interviewApi = {
  getSession: async (id) => {
    try {
      return await api.get(`${API_ENDPOINTS.GET_SESSION}/${id}`);
    } catch (error) {
      console.error('Failed to fetch session:', error);
      throw error;
    }
  },
  
  uploadResponse: async (audioBlob, questionId) => {
    try {
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');
      return await api.post(`${API_ENDPOINTS.UPLOAD_RESPONSE}/${questionId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  }
}
