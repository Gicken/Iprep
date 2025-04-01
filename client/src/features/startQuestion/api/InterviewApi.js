//import axios from "axios";

// const API_URL = "http://localhost:5000/interviews";

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

export const getInterviewQuestions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "What are the key features of JavaScript?", duration: 60 },
        { id: 2, text: "Explain React Hooks and their use cases.", duration: 90 },
        { id: 3, text: "What is the difference between HTTP and HTTPS?", duration: 60 },
      ]);
    }, 1000);
  });
};

