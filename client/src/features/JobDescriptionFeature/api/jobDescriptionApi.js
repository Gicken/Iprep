import mockJobData from "../data/mockData";

export const getAllJobs = async () => {
  return new Promise((resolve) => setTimeout(() => resolve(mockJobData), 500));
};

export const getJobById = async (id) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const job = mockJobData.find((job) => job.id === Number(id));
      resolve(job || null);
    }, 500)
  );
};

export const addJob = async (newJob) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockJobData.push({ id: mockJobData.length + 1, ...newJob });
      resolve(newJob);
    }, 500);
  });
};

export const updateJob = async (id, updatedJob) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockJobData.findIndex((job) => job.id === id);
      if (index !== -1) {
        mockJobData[index] = { ...mockJobData[index], ...updatedJob };
        resolve(mockJobData[index]);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const deleteJob = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = mockJobData.findIndex((job) => job.id === id);
      if (index !== -1) {
        mockJobData.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 500);
  });
};
