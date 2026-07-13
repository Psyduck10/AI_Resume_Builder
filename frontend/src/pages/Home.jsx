import { useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import ResultCard from "../components/ResultCard";
import DownloadButtons from "../components/DownloadButtons";

function Home() {
  // -------------------------
  // Resume Builder States
  // -------------------------

  const [studentProfile, setStudentProfile] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [resume, setResume] = useState("");
  const [atsReport, setAtsReport] = useState("");
  const [improvementPlan, setImprovementPlan] = useState("");

  // -------------------------
  // Job Search States
  // -------------------------

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");

  const [jobLoading, setJobLoading] = useState(false);

  const [jobs, setJobs] = useState([]);

  // -------------------------
  // Resume Generation
  // -------------------------

  const generateResume = async () => {
    if (!studentProfile.trim() || !jobDescription.trim()) {
      alert("Please fill both fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/generate-resume", {
        student_profile: studentProfile,
        job_description: jobDescription,
      });

      setResume(response.data.resume);
      setAtsReport(response.data.ats_report);
      setImprovementPlan(response.data.improvement_plan);

      // Automatically use JD keyword
      if (!keyword) {
        const firstLine = jobDescription.split("\n")[0];
        setKeyword(firstLine);
      }

    } catch (err) {
      console.error(err);
      alert("Backend Error");
    } finally {
      setLoading(false);
    }
  };

  // -------------------------
  // Job Search
  // -------------------------

  const searchJobs = async () => {

    if (!keyword.trim()) {
      alert("Enter keyword");
      return;
    }

    try {

      setJobLoading(true);

      const response = await api.post("/search-jobs", {
        keyword,
        location,
      });

      let result = response.data.jobs;

      // Experience Filter

      if (experience !== "") {

        result = result.filter(job => {

          const text = (
            job.description +
            " " +
            job.title
          ).toLowerCase();

          if (experience === "Entry") {
            return (
              text.includes("entry") ||
              text.includes("fresher") ||
              text.includes("junior")
            );
          }

          if (experience === "Mid") {
            return (
              text.includes("2+") ||
              text.includes("3+") ||
              text.includes("mid")
            );
          }

          if (experience === "Senior") {
            return (
              text.includes("senior") ||
              text.includes("5+") ||
              text.includes("lead")
            );
          }

          return true;

        });

      }

      // Match Score

      result = result.map(job => {

        const combined = (
          job.title +
          " " +
          job.description
        ).toLowerCase();

        let score = 50;

        keyword
          .toLowerCase()
          .split(" ")
          .forEach(word => {

            if (combined.includes(word))
              score += 10;

          });

        if (score > 100)
          score = 100;

        return {
          ...job,
          match_score: score
        };

      });

      // Sort

      result.sort(
        (a, b) =>
          b.match_score - a.match_score
      );

      setJobs(result);

    } catch (err) {

      console.log(err);

      alert("Unable to fetch jobs.");

    } finally {

      setJobLoading(false);

    }

  };

  return (

    <div
      style={{
        background: "#eef2f7",
        minHeight: "100vh",
        padding: "40px"
      }}
    >

      <div
        style={{
          maxWidth: "1200px",
          margin: "auto"
        }}
      >

        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px"
          }}
        >
          AI Resume Builder
        </h1>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,.1)"
          }}
        >

          <h2>Student Profile</h2>

          <textarea
            rows="10"
            value={studentProfile}
            onChange={(e) =>
              setStudentProfile(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          />

          <h2
            style={{
              marginTop: "25px"
            }}
          >
            Job Description
          </h2>

          <textarea
            rows="10"
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "10px"
            }}
          />

          <button
            onClick={generateResume}
            style={{
              width: "100%",
              marginTop: "25px",
              padding: "15px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: "pointer"
            }}
          >
            Generate Resume
          </button>

        </div>

        {loading && <Loader />}

        {resume && (

          <DownloadButtons
            resume={resume}
            atsReport={atsReport}
            improvementPlan={improvementPlan}
          />

        )}        {resume && (
          <ResultCard
            title="Resume"
            content={resume}
          />
        )}

        {atsReport && (
          <ResultCard
            title="ATS Report"
            content={atsReport}
          />
        )}

        {improvementPlan && (
          <ResultCard
            title="Improvement Plan"
            content={improvementPlan}
          />
        )}

        <div
          style={{
            background: "white",
            marginTop: "40px",
            padding: "25px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,.1)"
          }}
        >

          <h2>AI Job Search</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
              gap: "15px",
              marginTop: "20px"
            }}
          >

            <input
              placeholder="Keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{
                padding: "12px"
              }}
            />

            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                padding: "12px"
              }}
            />

            <select
              value={experience}
              onChange={(e) =>
                setExperience(e.target.value)
              }
              style={{
                padding: "12px"
              }}
            >
              <option value="">All Experience</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
            </select>

          </div>

          <button
            onClick={searchJobs}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "15px",
              background: "#198754",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "17px",
              cursor: "pointer"
            }}
          >
            Search Jobs
          </button>

          {jobLoading && (
            <h3
              style={{
                textAlign: "center",
                marginTop: "25px"
              }}
            >
              Searching Jobs...
            </h3>
          )}

          {jobs.length > 0 && (

            <div
              style={{
                marginTop: "30px"
              }}
            >

              <h2>Available Jobs</h2>

              {jobs.map((job, index) => (

                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    padding: "20px",
                    marginBottom: "20px",
                    background: "#fafafa"
                  }}
                >

                  <h3>{job.title}</h3>

                  <p>
                    <strong>Company:</strong> {job.company}
                  </p>

                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>

                  <p>
                    <strong>Employment:</strong> {job.employment_type}
                  </p>

                  <p>
                    <strong>Match Score:</strong>{" "}
                    {job.match_score}%
                  </p>

                  <p
                    style={{
                      whiteSpace: "pre-wrap"
                    }}
                  >
                    {job.description}
                  </p>

                  <a
                    href={job.apply_link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-block",
                      marginTop: "10px",
                      background: "#2563eb",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      textDecoration: "none"
                    }}
                  >
                    Apply Now
                  </a>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default Home;