from pydantic import BaseModel


class ResumeRequest(BaseModel):
    student_profile: str
    job_description: str


class ResumeResponse(BaseModel):
    resume: str
    ats_report: str
    improvement_plan: str


class JobSearchRequest(BaseModel):
    keyword: str
    location: str = ""


class Job(BaseModel):
    company: str | None = None
    title: str | None = None
    location: str | None = None
    employment_type: str | None = None
    apply_link: str | None = None
    description: str | None = None


class JobSearchResponse(BaseModel):
    jobs: list[Job]