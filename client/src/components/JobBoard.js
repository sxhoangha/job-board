import { useEffect, useState } from "react";
import JobList from "./JobList";
import { getJobs } from "../graphql/queries";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    // async function fetchData() {
    //   const data = await getJobs();
    //   setJobs(data);
    // }
    // fetchData();
    getJobs()
      .then(setJobs) //same as .then(jobs => setJobs(jobs))
      .catch((err) => setErr(true));
  }, []);

  console.log(jobs);

  return err ? (
    <p>something went wrong</p>
  ) : (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
