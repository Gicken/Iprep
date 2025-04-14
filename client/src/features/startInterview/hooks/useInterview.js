import { useState, useEffect } from "react";
import { fetchCVs, fetchJobs } from "../api/startAPI";

export const useInterviewSetup = () => {
  const [cvList, setCvList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [selectedCv, setSelectedCv] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [length, setLength] = useState("");
  const [start, setStart] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({ cv: "", job: "", difficulty: "", length: ""});

  useEffect(() => {
    const getData = async () => {
      setCvList(await fetchCVs());
      setJobList(await fetchJobs());
    };
    getData();
  }, []);

  const handleChangeCV = (event) => {
    const foundCV = cvList.find((cv) => cv.id === event.target.value);
    setSelectedCv(foundCV);
  };

  const handleChangeJob = (event) => {
    const foundJob = jobList.find((job) => job.id === event.target.value);
    setSelectedJob(foundJob);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };

  const handleStart = (status) => {
    if(status==201) {
      setStart("Your interview is starting now");
    } else {
      setStart("Something went wrong, please try again");
    }
  };

  const handleLoading = () => {
    setLoading(!loading)
    console.log(loading)
  };

  const validateForm = () => {
    const newErrors = {
      cv: selectedCv ? "" : "Please select a CV",
      job: selectedJob ? "" : "Please select a Job Description",
      difficulty: difficulty ? "" : "Please select a difficulty level",
      length: length ? "":"Please select a number of questions",
    };
    setErrors(newErrors);
    return !newErrors.cv && !newErrors.job && !newErrors.difficulty && !newErrors.length;
  };

  return {
    cvList,
    jobList,
    selectedCv,
    selectedJob,
    difficulty,
    length,
    errors,
    start,
    loading,
    handleChangeCV,
    handleChangeJob,
    handleDifficultyChange,
    handleLengthChange,
    handleStart,
    handleLoading,
    validateForm,
  };
};
