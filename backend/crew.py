from crewai import Crew, Process

from agents import (
    resume_writer,
    ats_reviewer,
    career_coach,
)

from tasks import create_tasks


def build_crew(student_profile, job_description):

    tasks = create_tasks(
        student_profile,
        job_description,
    )

    crew = Crew(
        agents=[
            resume_writer,
            ats_reviewer,
            career_coach,
        ],
        tasks=tasks,
        process=Process.sequential,
        verbose=True,
    )

    return crew