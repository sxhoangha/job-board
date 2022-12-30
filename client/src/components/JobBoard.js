import JobList from "./JobList";
import { useJobs } from "../graphql/hooks";

function JobBoard() {
  const { jobs, loading, error } = useJobs();

  if (loading) return <p>Loading...</p>;

  return error ? (
    <p>something went wrong</p>
  ) : (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
