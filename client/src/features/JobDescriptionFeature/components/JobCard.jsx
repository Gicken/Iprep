import React from "react";
import ViewButton from "./Buttons/ViewButton";
import EditButton from "./Buttons/EditButton";
import DeleteButton from "./Buttons/DeleteButton";

const JobCard = ({ job, onView, onDelete, onEdit }) => {
  return (
    <div className="bg-gray-800 rounded-md p-6">
      <h3 className="text-lg font-semibold">{job.title}</h3>
      <p className="text-sm text-gray-400">{job.companyName} - {job.companyIndustry}</p>
      <p className="text-gray-300 mt-2">{job.description}</p>
      <div className="flex justify-end mt-4 space-x-2">
        <ViewButton onClick={() => onView(job)}/>
        <EditButton onClick={() => onEdit(job)}/>
        <DeleteButton onClick={() => onDelete(job.id)} />
      </div>
    </div>
  );
};

export default JobCard;
