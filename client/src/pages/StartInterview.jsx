import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { API_ENDPOINTS } from "../utils/constants";

function StartInterview() {
  const [cvList, setCvList] = useState([]);
  const navigate = useNavigate();

 const [errors, setErrors] = useState({
        cv: '',
        difficulty: ''
    });

  const [selectedCvID, setSelectedCvID] = useState(null);
  const [selectedCvName, setSelectedCvName] = useState(null);


  const [difficulty, setDifficulty] = useState("");

  const handleChangeCV = (event) => {
    const selectedCV = cvList.find((cv) => cv.id === event.target.value);
    setSelectedCvID(selectedCV ? selectedCV.id : null);
    setSelectedCvName(selectedCV ? selectedCV.file_name : null);
    console.log("CV:", event.target.value);
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
    // sessionStorage.setItem("cvList", JSON.stringify(cvList))
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
      console.log("FETCH CVs", response.data);
      setCvList(response.data);

        // setSelectedCvID(response.data[0].id);
        // setSelectedCvName(response.data[0].file_name);

 
      }

     catch (err) {
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
    let valid = true;

    if(!selectedCvID){
        valid = false;
        setErrors("No CV found")
    }
    if(!difficulty){
        valid = false;
    }

    if (valid) {
        navigate("/dashboard")
        sessionStorage.setItem("cvID",selectedCvID)
        sessionStorage.setItem("difficulty",difficulty)
        console.log("Begin Interview successful");
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
                  value={selectedCvID}
                  onChange={handleChangeCV}
                >
                  {cvList.map((cv) => (
                    <option key={cv.id} value={cv}>
                      {cv.file_name}
                    </option>
                  ))}
                </select>
                {errors.cv && <p className="text-red-500 text-sm mt-1">{errors.cv}</p>}
              </div>
              <p className="ml-4 mb-3">
                You selected: {selectedCvName ? selectedCvName : "None yet"}
              </p>
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
