import { useState } from "react";
import api from "../services/api";

function Jobs() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchJobs = async () => {
    setLoading(true);

    try {
      const response = await api.post("/search-jobs", {
        keyword,
        location,
      });

      setJobs(response.data.jobs);
    } catch (err) {
      alert("Unable to fetch jobs.");
    }

    setLoading(false);
  };

  return (
    <div className="container">

      <h1>AI Job Search</h1>

      <input
        placeholder="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <button onClick={searchJobs}>
        Search Jobs
      </button>

      {loading && <h3>Searching...</h3>}

      {jobs.map((job, index) => (

        <div className="job-card" key={index}>

          <h2>{job.title}</h2>

          <p>
            <strong>Company:</strong> {job.company}
          </p>

          <p>
            <strong>Location:</strong> {job.location}
          </p>

          <p>
            <strong>Employment:</strong> {job.employment_type}
          </p>

          <p>{job.description}</p>

          <a
            href={job.apply_link}
            target="_blank"
            rel="noreferrer"
          >
            Apply Now
          </a>

        </div>

      ))}

    </div>
  );
}

export default Jobs;