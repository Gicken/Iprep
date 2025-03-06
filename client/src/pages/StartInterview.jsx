import React, { useState } from "react";

function StartInterview() {
  const [cvList] = useState(["pythonCV", "javaCV", "testingCV"]);
  const [selectedCv, setselectedCv] = useState("");

  const [jobSpecList] = useState(["python dev role","data engineering role","automated testing opp"]);
  const [selectedjobSpec, setselectedjobSpec] = useState("");

  const handleChangeCV = (event) => {
    setselectedCv(event.target.value);
  };
  const handleChangeJob = (event) => {
    setselectedjobSpec(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Select your interview setup:
            </h2>
          </div>
          <form onSubmit={null}>
            {/* Select for CV */}
            <div class="w-full border-2 relative">
              <label class="ml-4 mt-2" htmlFor="selectCV">
                Choose a CV:
              </label>
              <select
                id="selectCV"
                class="w-7/8 ml-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
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
                stroke-width="1.2"
                stroke="currentColor"
                class="h-5 w-5 ml-1 absolute top-10.5 right-7.5 text-slate-700 pointer-events-none"
              >
                <path
                  stroke-linecap="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5"
                />
              </svg>
              <p class="ml-4 mb-2">You selected: {selectedCv || "None"}</p>
            </div>

            {/* Select for Job spec */}
            <div class="w-full border-2 relative">
              <label class="ml-4 mt-2" htmlFor="selectJob">
                Choose a Job Spec:
              </label>
              <select
                id="selectJob"
                class="w-7/8 ml-4 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer"
                value={selectedjobSpec}
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
                stroke-width="1.2"
                stroke="currentColor"
                class="h-5 w-5 ml-1 absolute top-10.5 right-7.5 text-slate-700 pointer-events-none"
              >
                <path
                  stroke-linecap="round"
                  d="M8.25 15 12 18.75 15.75 15m-7.5"
                />
              </svg>
              <p class="ml-4 mb-2">You selected: {selectedjobSpec || "None"}</p>
            </div>

            {/* Difficulty select */}
            <div class="w-full border-2 relative">
              <div class="ml-4 mt-2">Please select a difficulty:</div>
              <ul class="items-center ml-4 w-7/8 sm:flex ">
                <li class="w-full">
                  <div class="flex flex-col items-center ">
                    <label for="easy-difficulty-radio">Easy</label>
                    <input
                      id="easy-difficulty-radio"
                      type="radio"
                      value=""
                      name="difficulty-radio"
                    />
                  </div>
                </li>
                <li class="w-full">
                  <div class="flex flex-col items-center ps-3">
                    <label for="mid-difficulty-radio">Intermediate</label>
                    <input
                      id="mid-difficulty-radio"
                      type="radio"
                      value=""
                      name="difficulty-radio"
                    />
                  </div>
                </li>
                <li class="w-full">
                  <div class="flex flex-col items-center ps-3">
                    <label for="hard-difficulty-radio">Hard</label>
                    <input
                      id="hard-difficulty-radio"
                      type="radio"
                      value=""
                      name="difficulty-radio"
                    />
                  </div>
                </li>
              </ul>
            </div>

            <button type="submit">Begin Interview!</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StartInterview;
