import React from "react";
import JobCard from "./JobCard";

const JobList = ({ jobs, onView, onDelete }) => {
  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <p className="text-gray-400">No job descriptions available.</p>
      ) : (
        jobs.map((job) => <JobCard key={job.id} job={job} onView={onView} onDelete={onDelete} />)
      )}
    </div>
  );
};

export default JobList;
