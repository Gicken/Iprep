import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useInterviewSetup } from "../hooks/useInterview";
import InterviewForm from "../components/InterviewForm";

function StartInterview() {
  const navigate = useNavigate();
  const { setTitle } = useOutletContext();
  const {
    cvList,
    jobList,
    selectedCv,
    selectedJob,
    difficulty,
    errors,
    handleChangeCV,
    handleChangeJob,
    handleDifficultyChange,
    validateForm,
  } = useInterviewSetup();

  React.useEffect(() => {
    setTitle("Start Interview");
  }, [setTitle]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const startParams = {
        userId: JSON.parse(sessionStorage.getItem("user")).id,
        cvId: selectedCv.id,
        jobDescId: selectedJob.id,
        difficulty,
      };
      sessionStorage.setItem("startParams", JSON.stringify(startParams));
      navigate("/dashboard/interview");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="bg-gray-800 rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4">Select Interview Setup</h2>
        <InterviewForm {...{ cvList, jobList, selectedCv, selectedJob, difficulty, errors, handleChangeCV, handleChangeJob, handleDifficultyChange, handleSubmit }} />
      </div>
    </div>
  );
}

export default StartInterview;