import axios from "axios";
import { API_ENDPOINTS } from "../../../lib/constants";

export const fetchSessions = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${API_ENDPOINTS.GET_ALL_SESSIONS}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    return response.data
  } catch (err) {
    console.error('Feedback fetch error:', err);
  }
};

export const fetchSessionByID = async (session_id) => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axios.get(`${API_ENDPOINTS.GET_SESSION}/${session_id}`, {
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    return response.data
  } catch (err) {
    console.error('Feedback fetch error:', err);
  }
};