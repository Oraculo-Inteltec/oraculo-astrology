from pathlib import Path
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    EPHEMERIS_PATH: Path = Path(__file__).parent / "sweph"
    ASTROLOGY_CHARTS_PATH: Path = Path(__file__).parent.parent / "assets/charts"

settings = Settings()