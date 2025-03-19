const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    CURRENT_USER: '/api/me',
    All_CVs: `${BASE_URL}/cv`,
    All_Jobs:`${BASE_URL}/jobdescription/`,
    // USER_PROFILE: '/api/profile',
  };