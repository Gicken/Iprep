import { useState, useEffect } from 'react'
import { useJobDescription } from '../hooks/useJobDescription'
import JobList from '../components/JobList'
import AddButton from '../components/Buttons/AddButton'
import JobModal from '../components/JobModal'
import JobForm from '../components/JobForm'
import { useOutletContext } from "react-router-dom";

const JobDescriptionPage = () => {
  const { jobs, createJob, removeJob } = useJobDescription()
  const [isModalOpen, setModalOpen] = useState(false)
  const { setTitle } = useOutletContext()

  useEffect(() => {
    setTitle('Job Descriptions')
  })

  return (
    <div>
      {/* <h1 className='text-xl font-bold'>Job Descriptions</h1> */}
      <AddButton onClick={() => setModalOpen(true)} />
      <JobList jobs={jobs} onView={() => {}} onDelete={removeJob} />
      <JobModal
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
        title='Add New Job Description'
      >
        <JobForm onSubmit={createJob} closeModal={() => setModalOpen(false)} />
      </JobModal>
    </div>
  )
}

export default JobDescriptionPage
