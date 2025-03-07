import React, { useState } from "react";
// import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";


function StartInterview() {
    const [cvList] = useState(["pythonCV", "javaCV", "testingCV"]);
    const [selectedCv, setSelectedCv] = useState("");

    const [jobSpecList] = useState([
        "python dev role",
        "data engineering role",
        "automated testing opp",
    ]);
    const [selectedJobSpec, setSelectedJobSpec] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const handleChangeCV = (event) => {
        setSelectedCv(event.target.value);
    };
    const handleChangeJob = (event) => {
        setSelectedJobSpec(event.target.value);
    };

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };

    const { setTitle } = useOutletContext();

    useEffect(() => {
        setTitle("Start Interview");
    });

    

    return (
        <>

            {/* Main Content Cards */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                <div className="bg-gray-800 rounded-md p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Select Interview Setup
                    </h2>
                    <form onSubmit={null}>
                        {/* Select for CV */}
                        <div className="w-full border-2 relative mb-4">
                            <div className="flex mt-2">
                            <div className=" w-3/16 ml-4 mt-2" >
                                Choose a CV:
                            </div>
                            <select
                                id="selectCV"
                                className="w-5/8 mr-2 input-field"
                                value={selectedCv}
                                onChange={handleChangeCV}
                            >
                                {cvList.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            </div>
                            <p className="ml-4 mb-3">
                                You selected: {selectedCv || "None"}
                            </p>
                        </div>

                        {/* Select for Job spec */}
                        <div className="w-full border-2 relative mb-4">
                        <div className="flex mt-2">
                        <div className=" w-3/16 ml-4 mt-2" >
                                Choose a Job Spec:
                                </div>
                            <select
                                id="selectJob"
                                className="w-5/8 mr-2 input-field"
                                value={selectedJobSpec}
                                onChange={handleChangeJob}
                            >
                                {jobSpecList.map((opt) => (
                                    <option key={opt} value={opt} className="input-field">
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            </div>
                            <p className="ml-4 mb-3">
                                You selected: {selectedJobSpec || "None"}
                            </p>
                        </div>

                        {/* Difficulty select */}
                        <div className="w-full border-2 relative mb-4">
                            <div className="ml-4 mt-2">
                                Please select a difficulty:
                            </div>
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
                                        <label htmlFor="easy-difficulty-radio">
                                            Easy
                                        </label>
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
                                        <label htmlFor="medium-difficulty-radio">
                                            Medium
                                        </label>
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
                                        <label htmlFor="hard-difficulty-radio">
                                            Hard
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary bg-blue-500 text-white px-4 py-2 rounded"
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