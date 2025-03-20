import { useState } from "react";
import { updateJobDescription, deleteJobDescription } from "./api";

const JobItem = ({ job }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);

  const handleUpdate = async () => {
    await updateJobDescription(job.id, { title, description });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await deleteJobDescription(job.id);
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{job.title}</h3>
          <p>{job.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default JobItem;