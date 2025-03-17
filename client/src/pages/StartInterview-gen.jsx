import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/constants";

function StartInterview() {
  const [cvList, setCvList] = useState([]);
  const [CVerror, setCVError] = useState("");
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    cv: '',
    jobSpec: '',
    difficulty: ''
  });

  const [selectedCvID, setSelectedCvID] = useState(null);
  const [selectedCvName, setSelectedCvName] = useState(null);

  const [jobSpecList] = useState([
    "python dev role",
    "data engineering role",
    "automated testing opp",
  ]);

  const [selectedJobSpec, setSelectedJobSpec] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleChangeCV = (event) => {
    const selectedCV = cvList.find((cv) => cv.id === event.target.value);
    setSelectedCvID(selectedCV ? selectedCV.id : null);
    setSelectedCvName(selectedCV ? selectedCV.file_name : null);
    // validateForm();  
  };

  const handleChangeJob = (event) => {
    setSelectedJobSpec(event.target.value);
    // validateForm();
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
    // validateForm();
  };

  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle("Start Interview");
  }, []);

  useEffect(() => {
    fetchCVs();
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
      console.log("FETCH CVs", response);
      setCvList(response.data);
      setCVError("");
      try {
        setSelectedCvID(response.data[0].id);
        setSelectedCvName(response.data[0].file_name);
      } catch {
        setSelectedCvID(null);
        setSelectedCvName(null);
        setErrors((prevErrors) => ({
          ...prevErrors,
          cv: "No CVs found"
        }));
      }
    } catch (err) {
      setCVError("Failed to fetch CVs. Please try again.");
      console.error("CV fetch error:", err);
    }
  };

  const validateForm = () => {
    let newErrors = { ...errors };
    if (!selectedCvID) {
      newErrors.cv = "Please select a CV";
    } else {
      newErrors.cv = '';
    }

    if (!selectedJobSpec) {
      newErrors.jobSpec = "Please select a job spec";
    } else {
      newErrors.jobSpec = '';
    }

    if (!difficulty) {
      newErrors.difficulty = "Please select a difficulty level";
    } else {
      newErrors.difficulty = '';
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    validateForm();
    let valid =true;

    if(!selectedCvID){
      valid = false;
      setErrors("No CV found")
  }
  // if(!selectedJobSpecID){
  //     valid = false;
  // }
  if(!difficulty){
      valid = false;
  }
  if(valid){
    const { cv, jobSpec, difficulty } = errors;
    if (!cv && !jobSpec && !difficulty) {
      navigate("/dashboard");
      sessionStorage.setItem("cvID", selectedCvID);
      sessionStorage.setItem("difficulty", difficulty);
      console.log("Begin Interview successful");
    }
  }
  };

  return (
    <>
      {/* Main Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div className="bg-gray-800 rounded-md p-6">
          <h2 className="text-xl font-semibold mb-4">Select Interview Setup</h2>
          <form onSubmit={handleSubmit}>
            {/* Select for CV */}
            <div className="w-full border-2 relative mb-4">
              <div className="flex mt-2">
                <div className=" w-3/16 ml-4 mt-2">Choose a CV:</div>
                <select
                  id="selectCV"
                  className="w-5/8 mr-2 input-field"
                  value={selectedCvID || ''}
                  onChange={handleChangeCV}
                >
                  {cvList.map((cv) => (
                    <option key={cv.id} value={cv.id}>
                      {cv.file_name}
                    </option>
                  ))}
                  <option value="">None</option>
                </select>
              </div>
              <p className="ml-4 mb-3">
                You selected: {selectedCvName ? selectedCvName : "None yet"}
              </p>
              {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv}</p>}
            </div>

            {/* Select for Job spec */}
            <div className="w-full border-2 relative mb-4">
              <div className="flex mt-2">
                <div className=" w-3/16 ml-4 mt-2">Choose a Job Spec:</div>
                <select
                  id="selectJob"
                  className="w-5/8 mr-2 input-field"
                  value={selectedJobSpec || ''}
                  onChange={handleChangeJob}
                >
                  {jobSpecList.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <p className="ml-4 mb-3">
                You selected: {selectedJobSpec || "None"}
              </p>
              {errors.jobSpec && <p className="text-red-500 text-sm mt-1">{errors.jobSpec}</p>}
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
            </div>

            {errors.difficulty && <p className="text-red-500 text-sm mt-1">{errors.difficulty}</p>}

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
