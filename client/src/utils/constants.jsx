import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/register/register`,
    CURRENT_USER: '/api/me',
    All_CVs: `${BASE_URL}/cv`,
    All_Jobs:`${BASE_URL}/jobdescription/`,
    RECOVER:`${BASE_URL}/recover/`,
    // USER_PROFILE: '/api/profile',
    All_feedbacks: `${BASE_URL}/feedback`,
  };

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});