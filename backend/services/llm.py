from crewai import LLM
from config import GEMINI_API_KEY, MODEL_NAME

llm = LLM(
    model=f"gemini/{MODEL_NAME}",
    api_key=GEMINI_API_KEY,
    temperature=0.3,
)