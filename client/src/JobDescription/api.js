import axios from "axios";

const API_URL = "http://localhost:5000/job_descriptions";

export const getJobDescriptions = async () => {
  const response = await axios.get(`${API_URL}/`);
  return response.data;
};

export const createJobDescription = async (job) => {
  const response = await axios.post(`${API_URL}/`, job);
  return response.data;
};

export const getJobDescriptionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const updateJobDescription = async (id, job) => {
  const response = await axios.put(`${API_URL}/${id}`, job);
  return response.data;
};

export const deleteJobDescription = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};