import { useState, useEffect } from 'react'
import {
  getAllJobs,
  getJobById,
  addJob,
  updateJob,
  deleteJob
} from '../api/jobDescriptionApi'

export const useJobDescription = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    setLoading(true)
    const data = await getAllJobs()
    setJobs(data)
    setLoading(false)
  }

  const fetchJobById = async id => {
    return await getJobById(id)
  }

  const createJob = async newJob => {
    await addJob(newJob)
    fetchJobs()
  }

  const editJob = async (id, updatedJob) => {
    await updateJob(id, updatedJob)
    fetchJobs()
  }

  const removeJob = async id => {
    await deleteJob(id)
    fetchJobs()
  }

  return { jobs, loading, fetchJobById, createJob, editJob, removeJob }
}
