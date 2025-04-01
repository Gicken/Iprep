//import axios from "axios";

// // Fetch questions
// export const getInterviewQuestions = async () => {
//   const response = await axios.get(`${API_URL}/questions`);
//   return response.data;
// };

// // Submit text response
// export const submitTextResponse = async (questionId, responseText) => {
//   const response = await axios.post(`${API_URL}/responses`, {
//     questionId,
//     responseText,
//   });
//   return response.data;
// };

// // Submit audio response
// export const submitAudioResponse = async (questionId, audioFile) => {
//   const formData = new FormData();
//   formData.append("questionId", questionId);
//   formData.append("audio", audioFile);

//   const response = await axios.post(`${API_URL}/responses/audio`, formData, {
//     headers: { "Content-Type": "multipart/form-data" },
//   });

//   return response.data;
// };

// // Confirm answer
// export const confirmAnswer = async (responseId) => {
//   const response = await axios.put(`${API_URL}/responses/${responseId}/confirm`);
//   return response.data;
// };
import axios from 'axios';
import { API_ENDPOINTS } from '../../../lib/constants';

export const getSession = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINTS.GET_SESSION}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error("CV fetch error:", err);
    return [];
  }
};


export const uploadResponse = async (audioBlob, question_id) => {
  try {
    const token = sessionStorage.getItem('token');
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");

    const response = await axios.post(`${API_ENDPOINTS.UPLOAD_RESPONSE}/${question_id}`, formData, {
      headers: { Authorization: `Bearer ${token}`}
    });
    return response.data
  } catch (error) {
    console.error("Upload failed:", error);
  }
};
