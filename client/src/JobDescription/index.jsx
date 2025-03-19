import { JobProvider } from "./JobContext";
import JobForm from "./JobForm";
import JobList from "./JobList";

export default function JobDescriptionApp() {
  return (
    <JobProvider>
      <div className="max-w-md mx-auto">
        <h1>Manage Job Descriptions</h1>
        <JobForm />
        <JobList />
      </div>
    </JobProvider>
  );
}