import { useState, useEffect } from 'react';
import { useJobDescription } from '../hooks/useJobDescription';
import JobList from '../components/JobList';
import AddButton from '../components/Buttons/AddButton';
import JobModal from '../components/JobModal';
import JobForm from '../components/JobForm';
import JobEditModal from '../components/JobEditModal';
import JobEditForm from '../components/JobEditForm';
import { useOutletContext } from "react-router-dom";

const JobDescriptionPage = () => {
  const { jobs, createJob, editJob, removeJob } = useJobDescription();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { setTitle } = useOutletContext();

  useEffect(() => {
    setTitle('Job Descriptions');
  }, [setTitle]);

  // Open the edit modal and set the selected job
  const handleEdit = (job) => {
    setSelectedJob(job);
    setEditModalOpen(true);
  };

  return (
    <div>
      <AddButton onClick={() => setModalOpen(true)} />
      <JobList jobs={jobs} onView={() => {}} onDelete={removeJob} onEdit={handleEdit} />

      <JobModal
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        title='Add New Job Description'
      >
        <JobForm onSubmit={createJob} closeModal={() => setModalOpen(false)} />
      </JobModal>

      <JobEditModal
        isOpen={isEditModalOpen}
        closeModal={() => setEditModalOpen(false)}
        title='Edit Job Description'
      >
        {selectedJob && (
          <JobEditForm
            onSubmit={(updatedJob) => {
              editJob(selectedJob.id, updatedJob); 
              setEditModalOpen(false);
            }}
            closeModal={() => setEditModalOpen(false)}
            initialData={selectedJob} 
          />
        )}
      </JobEditModal>
    </div>
  );
};

export default JobDescriptionPage;