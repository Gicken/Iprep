import { useState } from "react";
import { createJobDescription } from "./api";
import { useJobs } from "./JobContext";

const JobForm = () => {
  const { setJobs } = useJobs();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newJob = await createJobDescription({ title, description });
      setJobs((prevJobs) => [...prevJobs, newJob]);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating job description:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button type="submit">Create Job</button>
    </form>
  );
};

export default JobForm;