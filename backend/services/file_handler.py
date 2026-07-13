from pathlib import Path


def read_text(path: str) -> str:
    file_path = Path(path)

    if not file_path.exists():
        return ""

    return file_path.read_text(encoding="utf-8")


def write_text(path: str, content: str):
    file_path = Path(path)
    file_path.parent.mkdir(parents=True, exist_ok=True)
    file_path.write_text(content, encoding="utf-8")