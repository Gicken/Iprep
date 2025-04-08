import axios from "axios";
import { API_ENDPOINTS } from "../../../lib/constants";

export const fetchCVs = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINTS.All_CVs}`, {
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

export const fetchJobs = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINTS.GET_JOBDESCRIPTIONS}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Job fetch error:", err);
    return [];
  }
};

export const startInterview = async (cvId,jobId,difficulty,length) => {
  try {
    const token = sessionStorage.getItem("token");
    const params = {
      "cv_id": cvId,
      "job_id": jobId,
      "difficulty": difficulty,
      "length": length
    }
    console.log(params)
    const response = await axios.post(`${API_ENDPOINTS.START_INTERVIEW}`,params, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Start error:", err);
    return [];
  }
};