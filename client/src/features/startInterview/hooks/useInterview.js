import { useState, useEffect } from "react";
import { fetchCVs, fetchJobs } from "../api/startAPI";

export const useInterviewSetup = () => {
  const [cvList, setCvList] = useState([]);
  const [jobList, setJobList] = useState([]);
  const [selectedCv, setSelectedCv] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [difficulty, setDifficulty] = useState("");
  const [length, setLength] = useState("");
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

  const validateForm = () => {
    const newErrors = {
      cv: selectedCv ? "" : "Please select a CV",
      job: selectedJob ? "" : "Please select a Job Description",
      difficulty: difficulty ? "" : "Please select a difficulty level",
      length: length ? "":"Please select a number of questions"
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
    handleChangeCV,
    handleChangeJob,
    handleDifficultyChange,
    handleLengthChange,
    validateForm,
  };
};
