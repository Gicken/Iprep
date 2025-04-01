import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/constants";

function InterviewPage() {
      const [cv, setCv] = useState();
    //   const [job, setJob] = useState();
 
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle("Start Interview");
  });

  const fetchCV = async () => {
    try {
        const token = sessionStorage.getItem('token');
        const startParams = JSON.parse(sessionStorage.getItem('startParams'));

        console.log(startParams.cvId)

        const response = await axios.get(`${API_ENDPOINTS.All_CVs}/${startParams.cvId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/msword",
          accept: "application/msword",
        },
      });
      setCv(response.data);
      
      console.log(cv)
    } catch (err) {
      console.error("CV fetch error:", err);
    }
  };


  return (
    <>
      {/* Main Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-gray-800 rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">Select Interview Setup</h2>
          
            <button
              className="btn-primary bg-blue-500 text-white px-4 py-2 rounded"
              onClick={fetchCV}
            >
              Begin Interview!
            </button>
        </div>
      </div>
    </>
  );
}

export default InterviewPage;
