import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

function StartInterview() {
    const [cvList] = useState(["pythonCV", "javaCV", "testingCV"]);
    const [selectedCv, setSelectedCv] = useState("");
    const [title,setTitle] = useState("StartInterview");
    console.log("Title of this page: ", title);

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

    const location = useLocation();
    React.useEffect(() => {
        if (location.pathname === '/start') {
            setTitle('Start Interview');
        } else {
            setTitle('Start Interview');
        }
    }, [location]);
    

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
                            <label className="ml-4 mt-2" htmlFor="selectCV">
                                Choose a CV:
                            </label>
                            <select
                                id="selectCV"
                                className="w-7/8 ml-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                                value={selectedCv}
                                onChange={handleChangeCV}
                            >
                                {cvList.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.2"
                                stroke="currentColor"
                                className="h-5 w-5 ml-1 absolute top-10.5 right-7.5 text-slate-700 pointer-events-none"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 15 12 18.75 15.75 15m-7.5"
                                />
                            </svg>
                            <p className="ml-4 mb-2">
                                You selected: {selectedCv || "None"}
                            </p>
                        </div>

                        {/* Select for Job spec */}
                        <div className="w-full border-2 relative mb-4">
                            <label className="ml-4 mt-2" htmlFor="selectJob">
                                Choose a Job Spec:
                            </label>
                            <select
                                id="selectJob"
                                className="w-7/8 ml-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                                value={selectedJobSpec}
                                onChange={handleChangeJob}
                            >
                                {jobSpecList.map((opt) => (
                                    <option key={opt} value={opt}>
                                        {opt}
                                    </option>
                                ))}
                            </select>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.2"
                                stroke="currentColor"
                                className="h-5 w-5 ml-1 absolute top-10.5 right-7.5 text-slate-700 pointer-events-none"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 15 12 18.75 15.75 15m-7.5"
                                />
                            </svg>
                            <p className="ml-4 mb-2">
                                You selected: {selectedJobSpec || "None"}
                            </p>
                        </div>

                        {/* Difficulty select */}
                        <div className="w-full border-2 relative mb-4">
                            <div className="ml-4 mt-2">
                                Please select a difficulty:
                            </div>
                            <ul className="items-center ml-4 w-7/8 sm:flex">
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