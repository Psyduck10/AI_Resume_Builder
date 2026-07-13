from crewai import Agent
from services.llm import llm


resume_writer = Agent(
    role="Professional Resume Writer",
    goal="Generate an ATS-friendly professional resume.",
    backstory="""
You are an expert resume writer with extensive experience creating
ATS-friendly resumes for students and professionals.
""",
    llm=llm,
    allow_delegation=False,
    verbose=True,
)

ats_reviewer = Agent(
    role="ATS Reviewer",
    goal="Evaluate resumes for ATS compatibility.",
    backstory="""
You are an ATS expert capable of scoring resumes,
finding missing keywords and suggesting improvements.
""",
    llm=llm,
    allow_delegation=False,
    verbose=True,
)

career_coach = Agent(
    role="Career Coach",
    goal="Provide a career improvement roadmap.",
    backstory="""
You help students improve their employability
through certifications, skills and projects.
""",
    llm=llm,
    allow_delegation=False,
    verbose=True,
)