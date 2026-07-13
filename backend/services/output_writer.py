from services.file_handler import write_text


def save_resume(content: str):
    write_text("output/resume.md", content)


def save_ats(content: str):
    write_text("output/ats_report.md", content)


def save_improvement(content: str):
    write_text("output/improvement_plan.md", content)