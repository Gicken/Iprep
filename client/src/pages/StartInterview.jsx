import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/constants";

function StartInterview() {
  const [cvList, setCvList] = useState([]);
  const [jobList, setJobList] = useState([]);

  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    cv: "",
    job: "",
    difficulty: "",
  });

  var [selectedCv, setSelectedCv] = useState(null);
  var [selectedJob, setSelectedJob] = useState(null);

  const [difficulty, setDifficulty] = useState("");

  const handleChangeCV = (event) => {
    const foundCV = cvList.find((cv) => cv.id === event.target.value);
    setSelectedCv(foundCV);
    console.log("CV:", foundCV);
  };
  
  const handleChangeJob = (event) => {
    const foundJob = jobList.find((job) => job.id === event.target.value);
    setSelectedJob(foundJob);
    console.log("Job:", foundJob);
  };

  

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle("Start Interview");
  });

  useEffect(() => {
    fetchCVs();
  }, []);

  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch CVs for the current user
  const fetchCVs = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${API_ENDPOINTS.All_CVs}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      // console.log("FETCH CVs", response.data);
      setCvList(response.data);
    } catch (err) {
      console.error("CV fetch error:", err);
    }
  };

  const fetchJobs = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${API_ENDPOINTS.All_Jobs}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      });
      // console.log("FETCH CVs", response.data);
      setJobList(response.data);
    } catch (err) {
      console.error("Job fetch error:", err);
    }
  };
  
  
  const validateForm = () => {
    let newErrors = { ...errors };
    if (!selectedCv) {
      console.error("CV not found ERROR");
      newErrors.cv = "Please select a CV";
    } else {
      newErrors.cv = "";
    }

    if (!selectedJob) {
      console.error("JOBDESC not found ERROR");
      newErrors.job = "Please select a Job Description";
    } else {
      newErrors.job = "";
    }

    if (!difficulty) {
      console.error("DIFFICULTY not selected ERROR");
      newErrors.difficulty = "Please select a difficulty level";
    } else {
      newErrors.difficulty = "";
    }
    setErrors(newErrors);
    console.log(
      "CV Error: " +
        errors.cv +
        "\nJob Error: " +
        errors.job +
        "\nDifficulty Error: " +
        errors.difficulty
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateForm();
    let valid = true;

    if (!selectedCv) {
      valid = false;
    }
    if (!selectedJob) {
      valid = false;
    }
    if (!difficulty) {
      valid = false;
    }

    if (valid) {
      navigate("/dashboard/interview");
      var startParams = {
        userId: JSON.parse(sessionStorage.getItem("user")).id,
        cvId: selectedCv.id,
        jobDescId: selectedJob.id, 
        difficulty: difficulty,
      };
      sessionStorage.setItem("startParams", JSON.stringify(startParams));
      console.log("Begin Interview successful");
    }
  };

  return (
    <>
      {/* Main Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-gray-800 rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">Select Interview Setup</h2>
          <form id="startForm" onSubmit={handleSubmit}>
            {/* Select for CV */}
            <div className="w-full border-2 relative mb-4">
              <div className="flex mt-2">
                <div className=" w-3/16 ml-4 mt-2">Choose a CV:</div>
                <select
                  id="selectCV"
                  className="w-5/8 mr-2 input-field"
                  value={selectedCv?.id}
                  onChange={handleChangeCV}
                >
                  {cvList.map((cv) => (
                    <option key={cv.id} value={cv.id}>
                      {cv.file_name}
                    </option>
                  ))}
                  <option value={null}>None</option>
                </select>
              </div>
              <p className="ml-4 mb-3">
                You selected: {selectedCv ? selectedCv.file_name : "None yet"}
              </p>
              {errors.cv && (
                  <p className="ml-4 mb-3 text-red-500 text-sm mt-1">{errors.cv}</p>
                )}
            </div>
             {/* Select for Job */}
             <div className="w-full border-2 relative mb-4">
              <div className="flex mt-2">
                <div className=" w-3/16 ml-4 mt-2">Choose a Job Spec:</div>
                <select
                  id="selectJob"
                  className="w-5/8 mr-2 input-field"
                  value={selectedJob?.id}
                  onChange={handleChangeJob}
                >
                  {jobList.map((job) => (
                    <option key={job.id} value={job.id}>
                      {job.title}
                    </option>
                  ))}
                  <option value={null}>None</option>
                </select>
              </div>
              <p className="ml-4 mb-3">
                You selected: {selectedJob ? selectedJob.title : "None yet"}
              </p>
              {errors.job && (
                  <p className="ml-4 mb-3 text-red-500 text-sm mt-1">{errors.job}</p>
                )}
            </div>
            {/* Difficulty select */}
            <div className="w-full border-2 relative mb-4">
              <div className="ml-4 mt-2">Please select a difficulty:</div>
              <ul className="items-center ml-4 mb-2 w-7/8 sm:flex">
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="easy-difficulty-radio"
                      type="radio"
                      value="easy"
                      name="difficulty-radio"
                      checked={difficulty === "easy"}
                      onChange={handleDifficultyChange}
                      className="mr-2"
                    />
                    <label htmlFor="easy-difficulty-radio">Easy</label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="medium-difficulty-radio"
                      type="radio"
                      value="medium"
                      name="difficulty-radio"
                      checked={difficulty === "medium"}
                      onChange={handleDifficultyChange}
                      className="mr-2"
                    />
                    <label htmlFor="medium-difficulty-radio">Medium</label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="hard-difficulty-radio"
                      type="radio"
                      value="hard"
                      name="difficulty-radio"
                      checked={difficulty === "hard"}
                      onChange={handleDifficultyChange}
                      className="mr-2"
                    />
                    <label htmlFor="hard-difficulty-radio">Hard</label>
                  </div>
                </li>
              </ul>
              {errors.difficulty && (
                <p className="ml-4 mb-3 text-red-500 text-sm mt-1">{errors.difficulty}</p>
              )}
            </div>
            <button
              type="submit"
              className="btn-primary bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              Begin Interview!
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default StartInterview;
