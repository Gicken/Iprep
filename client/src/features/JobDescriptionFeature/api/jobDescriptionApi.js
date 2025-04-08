import axios from "axios";
import { API_ENDPOINTS } from "../../../lib/constants";



export const getAllJobs = async () => {
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
  };
}

export const getJobById = async (jobId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINTS.GET_JOBDESCRIPTIONS_BY_ID}/${jobId}`, {
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
  };
};

export const addJob = async (formData) => {
  console.log("data:",formData)

  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(`${API_ENDPOINTS.ADD_NEWJOBDESCRIPTION}/`,formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Job add error:", err);
    return [];
  };
};

export const updateJob = async (id, updatedJob) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.put(
      `${API_ENDPOINTS.UPDATE_JOBDESCRIPTION}/${id}`,
      updatedJob,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (err) {
    console.error("Job update error:", err);
    return null;
  }
};


export const deleteJob = async (id) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.delete(`${API_ENDPOINTS.DELETE_JOBDESCRIPTION}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.error("Job delete error:", err);
    return [];
  };
};
