import { Link } from "react-router-dom";
import { deleteJob } from "../graphql/queries";

function JobItem({ job }) {
  const title = job.company ? `${job.title} at ${job.company.name}` : job.title;

  const handleDelete = (id) => {
    const job = deleteJob(id);
    console.log("Deleted job ", job.title);
  };

  return (
    <li className="media">
      <div className="media-content">
        <Link to={`/jobs/${job.id}`}>{title}</Link>
      </div>
      <button onClick={handleDelete.bind(this, job.id)}>Delete Job</button>
    </li>
  );
}

function JobList({ jobs }) {
  return (
    <ul className="box">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} />
      ))}
    </ul>
  );
}

export default JobList;
