import { useEffect } from "react";
import { getJobDescriptions } from "./api";
import { useJobs } from "./JobContext";
import JobItem from "./JobItem";

const JobList = () => {
  const { jobs, setJobs } = useJobs();

  useEffect(() => {
    const loadJobs = async () => {
      const data = await getJobDescriptions();
      setJobs(data);
    };
    loadJobs();
  }, [setJobs]);

  return (
    <div>
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;