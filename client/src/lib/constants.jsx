import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const API_ENDPOINTS = {
    LOGIN: `${BASE_URL}/auth/login`,
    REGISTER: `${BASE_URL}/register/`,
    CURRENT_USER: '/api/me',
    All_CVs: `${BASE_URL}/cv`,
    Upload_CV: `${BASE_URL}/cv/upload`,
    RECOVER:`${BASE_URL}/recover/`,
    GET_JOBDESCRIPTIONS:`${BASE_URL}/jobdescription`,
    GET_JOBDESCRIPTIONS_BY_ID:`${BASE_URL}/jobdescription`,
    UPDATE_JOBDESCRIPTION:`${BASE_URL}/jobdescription`,
    DELETE_JOBDESCRIPTION:`${BASE_URL}/jobdescription`,
    ADD_NEWJOBDESCRIPTION:`${BASE_URL}/jobdescription`,
    START_INTERVIEW:`${BASE_URL}/interview/start`,
    GET_SESSION: `${BASE_URL}/interview`,
    UPLOAD_RESPONSE: `${BASE_URL}/response/transcribe`,
    GENERATE_NEXT_QUESTION: `${BASE_URL}/interview/continue`,
    GENERATE_FEEDBACK: `${BASE_URL}/feedback`,


    // USER_PROFILE: '/api/profile',
    All_feedbacks: `${BASE_URL}/feedback`
  };

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});