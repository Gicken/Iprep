import React from "react";

const InterviewForm = ({
  cvList,
  jobList,
  selectedCv,
  selectedJob,
  difficulty,
  length,
  errors,
  handleChangeCV,
  handleChangeJob,
  handleDifficultyChange,
  handleLengthChange,
  handleSubmit,
}) => {
  return (
    <form id="startForm" onSubmit={handleSubmit}>
      {/* Select for CV */}
      <div className="w-full border-2 relative mb-4">
        <div className="flex mt-2">
          <div className=" w-3/16 ml-4 mt-2">Choose a CV:</div>
          <select id="selectCV" className="w-5/8 mr-2 input-field" value={selectedCv?.id} onChange={handleChangeCV}>
            {cvList.map((cv) => (
              <option key={cv.id} value={cv.id}>
                {cv.file_name}
              </option>
            ))}
            <option value={null}>None</option>
          </select>
        </div>
        <p className="ml-4 mb-3">You selected: {selectedCv ? selectedCv.file_name : "None yet"}</p>
        {errors.cv && <p className="ml-4 mb-3 text-red-500 text-sm mt-1">{errors.cv}</p>}
      </div>

      {/* Select for Job */}
      <div className="w-full border-2 relative mb-4">
        <div className="flex mt-2">
          <div className=" w-3/16 ml-4 mt-2">Choose a Job Spec:</div>
          <select id="selectJob" className="w-5/8 mr-2 input-field" value={selectedJob?.id} onChange={handleChangeJob}>
            {jobList.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
            <option value={null}>None</option>
          </select>
        </div>
        <p className="ml-4 mb-3">You selected: {selectedJob ? selectedJob.title : "None yet"}</p>
        {errors.job && <p className="ml-4 mb-3 text-red-500 text-sm mt-1">{errors.job}</p>}
      </div>

      {/* Difficulty Select */}
      <div className="w-full border-2 relative mb-4">
        <div className="ml-4 mt-2">Please select a difficulty:</div>
        <ul className="items-center ml-4 mb-2 w-7/8 sm:flex">
          {["easy", "medium", "hard"].map((level) => (
            <li key={level} className="w-full">
              <div className="flex items-center">
                <input
                  type="radio"
                  value={level}
                  name="difficulty-radio"
                  checked={difficulty === level}
                  onChange={handleDifficultyChange}
                  className="mr-2"  
                />
                <label>{level.charAt(0).toUpperCase() + level.slice(1)}</label>
              </div>
            </li>
          ))}
        </ul>
        {errors.difficulty && <p className="ml-4 mb-3 text-red-500 text-sm mt-1">{errors.difficulty}</p>}
      </div>

      {/* Length Select */}
      <div className="w-full border-2 relative mb-4">
        <div className="ml-4 mt-2">Please select a number of questions:</div>
        <ul className="items-center ml-4 mb-2 w-7/8 sm:flex">
          {["1", "2", "3", "4", "5"].map((number) => (
            <li key={number} className="w-full">
              <div className="flex items-center">
                <input
                  type="radio"
                  value={number}
                  name="length-radio"
                  checked={length === number}
                  onChange={handleLengthChange}
                  className="mr-2"
                />
                <label>{number}</label>
              </div>
            </li>
          ))}
        </ul>
        {errors.length && <p className="ml-4 mb-3 text-red-500 text-sm mt-1">{errors.length}</p>}
      </div>

      <button type="submit" className="btn-primary bg-blue-500 text-white px-4 py-2 rounded">
        Begin Interview!
      </button>
    </form>
  );
};

export default InterviewForm;
