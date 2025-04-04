import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useInterviewSetup } from "../hooks/useInterview";
import InterviewForm from "../components/InterviewForm";
import { startInterview } from "../api/startAPI";

function StartInterview() {
  const navigate = useNavigate();
  const { setTitle } = useOutletContext();
  const {
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
    validateForm,
  } = useInterviewSetup();

  React.useEffect(() => {
    setTitle("Start Interview");
  }, [setTitle]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (validateForm()) {
        alert('Your interview is being prepared!')
        const response = await startInterview(selectedCv.id,selectedJob.id,difficulty,length)
        console.log("response",response)
        sessionStorage.setItem("sessionID",response["session_id"]);
        navigate("/dashboard/interviewQuestions");
    }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
      <div className="bg-gray-800 rounded-md p-6">
        <h2 className="text-xl font-semibold mb-4">Select Interview Setup</h2>
        <InterviewForm {...{ cvList, jobList, selectedCv, selectedJob, difficulty, length, errors, handleChangeCV, handleChangeJob, handleDifficultyChange, handleLengthChange, handleSubmit }} />
      </div>
    </div>
  );
}

export default StartInterview;