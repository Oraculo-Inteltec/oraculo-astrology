import Image from "next/image";
import React, { useState, useEffect } from'react';


export default function Home() {
  const [city, setCity] = useState('');
  const [year, setYear] = useState(2022);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(1);
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [lat, setLat] = useState(-22.922771544106);
  const [lng, setLng] = useState(-42.81663344884);
  const [tz_str, setTz_str] = useState("Sao_Paulo");
  const [name, setName] = useState("Desconhecido");

  const [map, setMap] = useState(null);

  useEffect(() => {
    fetch('/subject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        city,
        year,
        month,
        day,
        hour,
        minute,
        lat,
        lng,
        name,
        tz_str,
      })
     .then((response) => response.ok && response.blob())
     .then((map) => setMap(response.blob());
    }, [city, year, month, day, hour, minute, lat, lng, name, tz_str, entity_id]);

  return (
    <div>
      <h2>Map</h2>
      <p>City:{city}/p>
      <p>Year:{year}/p>
      <p>Month:{month}/p>
      <p>Day:{day}/p>
      <p>Hour:{hour}/p>
      <p> Minute:{minute}/p>
      <p>Lat:{lat}/p>
      <p>Lng:{lng}/p>
      <p>Name:{name}/p>
      <p>TZ:{tz_str}/p>
      <p>Entity ID:{entity_id}/p>
      <p>Map:{map}/p>
    </div>
    <div>
      {map && <img src={map} alt="Mapa astral" />
    </div>
  );
}
