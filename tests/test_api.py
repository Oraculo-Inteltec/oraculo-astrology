import pytest
from fastapi.testclient import TestClient
from http_api import app

client = TestClient(app)

DIOGO = {
    "name": "Diogo",
    "year": 1987,
    "month": 12,
    "day": 7,
    "hour": 15,
    "minute": 3,
    "lat": -22.90,
    "lng": -43.36,
    "tz_str": "America/Sao_Paulo",
    "city": "Rio de Janeiro",
}

LORENA = {
    "name": "Lorena",
    "year": 1991,
    "month": 10,
    "day": 5,
    "hour": 16,
    "minute": 35,
    "lat": -22.91,
    "lng": -43.08,
    "tz_str": "America/Sao_Paulo",
    "city": "Niterói",
}


class TestSubjectSVG:
    def test_returns_svg(self):
        response = client.post("/subject", json=DIOGO)
        assert response.status_code == 200
        assert response.headers["content-type"] == "image/svg+xml"

    def test_svg_contains_subject_name(self):
        response = client.post("/subject", json=DIOGO)
        assert b"Diogo" in response.content

    def test_svg_is_valid_xml(self):
        import xml.etree.ElementTree as ET
        response = client.post("/subject", json=DIOGO)
        ET.fromstring(response.content)  # raises if invalid


class TestSubjectData:
    def test_returns_200(self):
        response = client.post("/subject/data", json=DIOGO)
        assert response.status_code == 200

    def test_response_has_correct_name(self):
        response = client.post("/subject/data", json=DIOGO)
        data = response.json()
        assert data["name"] == "Diogo"

    def test_response_has_sun_in_sagittarius(self):
        response = client.post("/subject/data", json=DIOGO)
        data = response.json()
        assert data["sun"]["sign"] == "Sag"

    def test_response_has_all_planets(self):
        response = client.post("/subject/data", json=DIOGO)
        data = response.json()
        for planet in ("sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"):
            assert planet in data, f"missing planet: {planet}"

    def test_response_has_all_houses(self):
        response = client.post("/subject/data", json=DIOGO)
        data = response.json()
        for house in ("first_house", "second_house", "third_house", "fourth_house",
                      "fifth_house", "sixth_house", "seventh_house", "eighth_house",
                      "ninth_house", "tenth_house", "eleventh_house", "twelfth_house"):
            assert house in data, f"missing house: {house}"

    def test_response_has_lunar_phase(self):
        response = client.post("/subject/data", json=DIOGO)
        data = response.json()
        assert "lunar_phase" in data
        assert "moon_phase_name" in data["lunar_phase"]

    def test_birth_location_preserved(self):
        response = client.post("/subject/data", json=DIOGO)
        data = response.json()
        assert data["city"] == "Rio de Janeiro"
        assert data["lat"] == pytest.approx(-22.90, abs=0.01)
        assert data["lng"] == pytest.approx(-43.36, abs=0.01)

    def test_defaults_applied(self):
        minimal = {"city": "São Paulo", "year": 2000, "month": 1, "day": 1}
        response = client.post("/subject/data", json=minimal)
        assert response.status_code == 200
        data = response.json()
        assert data["hour"] == 12
        assert data["minute"] == 0


class TestSynastry:
    def test_returns_200(self):
        response = client.post("/subject/synastry", json={"first": DIOGO, "second": LORENA})
        assert response.status_code == 200

    def test_response_has_both_names(self):
        response = client.post("/subject/synastry", json={"first": DIOGO, "second": LORENA})
        data = response.json()
        assert data["first_subject_name"] == "Diogo"
        assert data["second_subject_name"] == "Lorena"

    def test_score_is_integer(self):
        response = client.post("/subject/synastry", json={"first": DIOGO, "second": LORENA})
        data = response.json()
        assert isinstance(data["score"], int)
        assert data["score"] >= 0

    def test_is_destiny_sign_is_bool(self):
        response = client.post("/subject/synastry", json={"first": DIOGO, "second": LORENA})
        data = response.json()
        assert isinstance(data["is_destiny_sign"], bool)

    def test_relevant_aspects_is_list(self):
        response = client.post("/subject/synastry", json={"first": DIOGO, "second": LORENA})
        data = response.json()
        assert isinstance(data["relevant_aspects"], list)
        assert isinstance(data["relevant_default_aspects"], list)

    def test_self_synastry_has_high_score(self):
        response = client.post("/subject/synastry", json={"first": DIOGO, "second": DIOGO})
        data = response.json()
        assert data["score"] >= 5
