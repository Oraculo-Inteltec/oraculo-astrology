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
    if score < 5:
        return "Conexão passageira — pouco peso astral entre os dois mapas."
    elif score < 10:
        return "Conexão leve — existe um fio, mas sem estrutura maior."
    elif score < 15:
        return "Conexão com substância — tensão e atração reais estão presentes."
    elif score < 20:
        return "Conexão importante — esses dois mapas têm uma conversa clara."
    elif score < 28:
        return (
            "Conexão no limiar do excepcional — sólida, mas construída principalmente "
            "sobre aspectos de base (4pts). Faltam os grandes eixos — conjunção Sol-Sol "
            "ou Sol-Lua — que definiriam algo verdadeiramente raro."
        )
    elif score < 38:
        return "Conexão solidamente excepcional — presença real de eixos estruturantes entre os mapas."
    else:
        return "Conexão excepcionalmente densa — raríssima, com múltiplos eixos de conjunção de alto valor."


_SIGNS = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
]

_PLANET_LABELS = {
    "Sun": "Sol", "Moon": "Lua", "Mercury": "Mercúrio", "Venus": "Vênus",
    "Mars": "Marte", "Jupiter": "Júpiter", "Saturn": "Saturno",
    "Uranus": "Urano", "Neptune": "Netuno", "Pluto": "Plutão",
    "First_House": "Ascendente",
}

_ASPECT_LABELS = {
    "conjunction": "conjunção", "opposition": "oposição", "trine": "trígono",
    "square": "quadratura", "sextile": "sextil",
}


def _sign_from_abs(pos: float) -> str:
    return _SIGNS[int(pos / 30) % 12]


def _fmt_aspect(a: dict) -> dict:
    p1 = _PLANET_LABELS.get(a["p1_name"], a["p1_name"])
    p2 = _PLANET_LABELS.get(a["p2_name"], a["p2_name"])
    aspect = _ASPECT_LABELS.get(a["aspect"], a["aspect"])
    orbit = round(abs(a["orbit"]), 1)
    exact = orbit <= 1.0
    p1_sign = _sign_from_abs(a.get("p1_abs_pos", 0))
    p2_sign = _sign_from_abs(a.get("p2_abs_pos", 0))
    return {
        "description": f"{p1} ({p1_sign}) {aspect} {p2} ({p2_sign})",
        "aspect_type": a["aspect"],
        "orbit_degrees": orbit,
        "exact": exact,
    }


class SynastryResponse(BaseModel):
    first_subject_name: str
    second_subject_name: str
    connection_quality: str  # qualitative description — do not show any numeric score
    is_destiny_sign: bool
    aspects: list  # formatted aspects with sign names — use these verbatim


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
        connection_quality=_score_note(score.score),
        is_destiny_sign=score.is_destiny_sign,
        aspects=[_fmt_aspect(a) for a in score.relevant_default_aspects],
    )


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
