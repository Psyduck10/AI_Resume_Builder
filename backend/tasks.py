from crewai import Task

from agents import (
    resume_writer,
    ats_reviewer,
    career_coach,
)


def create_tasks(student_profile, job_description):

    resume_task = Task(
        description=f"""
Create a professional ATS-friendly resume.

Student Profile

{student_profile}

Job Description

{job_description}

Requirements

- Professional Summary
- Skills
- Education
- Experience
- Projects
- Certifications
- Achievements

Return only the resume in Markdown.
""",
        expected_output="Professional ATS Resume",
        agent=resume_writer,
    )

    ats_task = Task(
        description="""
Evaluate the generated resume.

Provide

ATS Score

Keyword Match

Missing Keywords

Strengths

Weaknesses

Formatting Suggestions
""",
        expected_output="ATS Report",
        context=[resume_task],
        agent=ats_reviewer,
    )

    improvement_task = Task(
        description="""
Create a career improvement plan.

Include

Missing Skills

Recommended Certifications

Projects to Build

Learning Roadmap

Interview Preparation Tips
""",
        expected_output="Improvement Plan",
        context=[resume_task, ats_task],
        agent=career_coach,
    )

    return [
        resume_task,
        ats_task,
        improvement_task,
    ]