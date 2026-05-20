from typing import Union
from uuid import uuid4

import cairosvg
from fastapi import FastAPI, Response
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Field
import uvicorn
from backend.astrological_subject import AstrologicalSubject
from backend.charts.kerykeion_chart_svg import Chart
from backend.kr_types.kr_models import AstrologicalSubjectModel
from backend.relationship_score import RelationshipScore

app = FastAPI()


class Subject(BaseModel):
    city: str
    year: int
    month: int
    day: int
    hour: int = 12
    minute: int = 0
    lat: float = -22.922771544773106
    lng: float = -42.81663370244884
    name: str = "Desconhecido"
    tz_str: str = "America/Sao_Paulo"
    entity_id: str = Field(default_factory=lambda: uuid4().hex)


class SynastryRequest(BaseModel):
    first: Subject
    second: Subject


_SCORE_BANDS = [
    (0,  5,  "Null"),
    (5,  10, "Mediocre"),
    (10, 15, "Important"),
    (15, 20, "Very Important"),
    (20, None, "Exceptional"),
]


def _score_label(score: int) -> str:
    for low, high, label in _SCORE_BANDS:
        if high is None or score < high:
            return label
    return "Exceptional"


def _score_note(score: int) -> str:
    label = _score_label(score)
    return (
        f"{label} (score {score}). "
        "Scale: 0–5 Null | 5–10 Mediocre | 10–15 Important | 15–20 Very Important | 20+ Exceptional. "
        "The scale has no upper ceiling — 20 and 60 are both 'Exceptional' but very different. "
        "Interpret proportionally: a score built from several 4-pt base aspects carries less weight "
        "than the same total achieved through high-value Sun–Sun or Sun–Moon conjunctions (8–11 pts each)."
    )


class SynastryResponse(BaseModel):
    first_subject_name: str
    second_subject_name: str
    score: int
    score_label: str
    score_note: str
    is_destiny_sign: bool
    relevant_aspects: list
    relevant_default_aspects: list


def _build_subject(s: Subject) -> AstrologicalSubject:
    return AstrologicalSubject(
        name=s.name,
        year=s.year,
        month=s.month,
        day=s.day,
        hour=s.hour,
        minute=s.minute,
        lat=s.lat,
        lng=s.lng,
        tz_str=s.tz_str,
        city=s.city,
        nation="",
        online=False,
    )


@app.get("/")
def read_root():
    return RedirectResponse("/docs")


@app.post("/subject")
def create_subject(subject: Subject):
    astro = _build_subject(subject)
    chart = Chart(astro)
    chart.makeSVG()
    return Response(content=chart.template, media_type="image/svg+xml")


@app.post("/subject/png")
def create_subject_png(subject: Subject):
    """Return the natal chart as a PNG image (converted from SVG via cairosvg, 300 dpi)."""
    astro = _build_subject(subject)
    chart = Chart(astro)
    chart.makeSVG()
    png_bytes = cairosvg.svg2png(bytestring=chart.template.encode(), dpi=300)
    return Response(content=png_bytes, media_type="image/png")


@app.post("/subject/data", response_model=AstrologicalSubjectModel)
def create_subject_data(subject: Subject) -> AstrologicalSubjectModel:
    astro = _build_subject(subject)
    return astro.model()


@app.post("/subject/synastry", response_model=SynastryResponse)
def create_synastry(request: SynastryRequest) -> SynastryResponse:
    first = _build_subject(request.first)
    second = _build_subject(request.second)
    score = RelationshipScore(first, second)
    return SynastryResponse(
        first_subject_name=first.name,
        second_subject_name=second.name,
        score=score.score,
        score_label=_score_label(score.score),
        score_note=_score_note(score.score),
        is_destiny_sign=score.is_destiny_sign,
        relevant_aspects=score.relevant_aspects,
        relevant_default_aspects=score.relevant_default_aspects,
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
