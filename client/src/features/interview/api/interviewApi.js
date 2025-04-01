import axios from "axios";
import { API_ENDPOINTS } from "../../../lib/constants";

export const fetchCV = async (cvId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(`${API_ENDPOINTS.All_CVs}/${cvId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/msword",
        accept: "application/msword",
      },
    });
    return response.data;
  } catch (err) {
    console.error("CV fetch error:", err);
    throw err;
  }
};
