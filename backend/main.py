from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from crew import build_crew

from models.schemas import (
    ResumeRequest,
    ResumeResponse,
    JobSearchRequest,
    JobSearchResponse,
)

from services.output_writer import (
    save_resume,
    save_ats,
    save_improvement,
)

from services.job_search import search_jobs

app = FastAPI(title="AI Resume Builder API")

# ----------------------------
# CORS
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Home
# ----------------------------
@app.get("/")
def home():
    return {
        "status": "Running",
        "message": "AI Resume Builder API"
    }


# ----------------------------
# Resume Generation
# ----------------------------
@app.post(
    "/generate-resume",
    response_model=ResumeResponse,
)
def generate_resume(request: ResumeRequest):

    crew = build_crew(
        request.student_profile,
        request.job_description,
    )

    result = crew.kickoff()

    resume = result.tasks_output[0].raw
    ats = result.tasks_output[1].raw
    improvement = result.tasks_output[2].raw

    save_resume(resume)
    save_ats(ats)
    save_improvement(improvement)

    return ResumeResponse(
        resume=resume,
        ats_report=ats,
        improvement_plan=improvement,
    )


# ----------------------------
# Job Search
# ----------------------------
@app.post(
    "/search-jobs",
    response_model=JobSearchResponse,
)
def search_jobs_api(request: JobSearchRequest):

    jobs = search_jobs(
        keyword=request.keyword,
        location=request.location,
    )

    return JobSearchResponse(
        jobs=jobs
    )