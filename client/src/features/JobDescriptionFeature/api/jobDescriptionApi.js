import axios from "axios";
import mockJobData from "../data/mockData";
import { API_ENDPOINTS } from "../../../lib/constants";



export const getAllJobs = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINTS.GET_JOBDESCRIPTIONS}`, {
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
    const response = await axios.post(`${API_ENDPOINTS.ADD_NEWJOBDESCRIPTION}`,formData, {
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
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockJobData.findIndex((job) => job.id === id);
      if (index !== -1) {
        mockJobData[index] = { ...mockJobData[index], ...updatedJob };
        resolve(mockJobData[index]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const deleteJob = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockJobData.findIndex((job) => job.id === id);
      if (index !== -1) {
        mockJobData.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};
