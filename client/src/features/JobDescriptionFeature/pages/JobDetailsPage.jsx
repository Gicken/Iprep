import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useJobDescription } from "../hooks/useJobDescription";

const JobDetailsPage = () => {
  const { id } = useParams();
  const { fetchJobById } = useJobDescription();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetchJobById(id).then(setJob);
  }, [id,fetchJobById]);

  return job ? <div><h2>{job.title}</h2><p>{job.description}</p></div> : <p>Loading...</p>;
};

export default JobDetailsPage;
