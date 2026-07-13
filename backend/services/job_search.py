import os
import requests
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("JSEARCH_API_KEY")

URL = "https://jsearch.p.rapidapi.com/search-v2"


def search_jobs(keyword: str, location: str = "", page: int = 1):

    headers = {
        "x-rapidapi-key": API_KEY,
        "x-rapidapi-host": "jsearch.p.rapidapi.com",
        "Content-Type": "application/json",
    }

    query = keyword

    if location.strip():
        query += f" in {location}"

    params = {
        "query": query,
        "page": page,
        "num_pages": 1,
        "country": "us",
        "date_posted": "all",
    }

    response = requests.get(
        URL,
        headers=headers,
        params=params,
        timeout=30,
    )

    response.raise_for_status()

    response_json = response.json()

    job_list = response_json.get("data", {}).get("jobs", [])

    jobs = []

    for job in job_list:

        jobs.append(
            {
                "company": job.get("employer_name", ""),
                "title": job.get("job_title", ""),
                "location": job.get("job_location", ""),
                "employment_type": job.get("job_employment_type", ""),
                "apply_link": job.get("job_apply_link", ""),
                "description": job.get("job_description", ""),
            }
        )

    return jobs