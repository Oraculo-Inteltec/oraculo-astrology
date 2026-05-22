// chart-wheel.jsx — shared natal chart SVG component.
// Three render modes used across the three design directions:
//   variant="kerykeion" — full color, element-filled wedges (matches the
//     Kerykeion reference palette pulled from the user's chart image)
//   variant="minimal"   — ring + glyphs + aspect lines, no fills (gold on
//     near-black for Direction A)
//   variant="paper"     — ink on cream parchment, etched feel (Direction C)
//
// Planet positions are hand-set to mirror the layout of Diogo's natal chart
// in the reference image (Sun/Mercury/Mars/Neptune cluster in Capricorn,
// Moon in Cancer, Saturn/Uranus/Venus in Sagittarius, Jupiter in Pisces,
// Pluto in Scorpio). These are visual approximations, not recomputed
// ephemeris values — the goal is a chart that *reads* like the real one.

const GLYPH = {
  sun: "\u2609",
  moon: "\u263D",
  mercury: "\u263F",
  venus: "\u2640",
  mars: "\u2642",
  jupiter: "\u2643",
  saturn: "\u2644",
  uranus: "\u2645",
  neptune: "\u2646",
  pluto: "\u2647",
  node: "\u260A",
  chiron: "\u26B7",
};

const SIGNS = [
  { name: "Aries", glyph: "\u2648", element: "fire" },
  { name: "Taurus", glyph: "\u2649", element: "earth" },
  { name: "Gemini", glyph: "\u264A", element: "air" },
  { name: "Cancer", glyph: "\u264B", element: "water" },
  { name: "Leo", glyph: "\u264C", element: "fire" },
  { name: "Virgo", glyph: "\u264D", element: "earth" },
  { name: "Libra", glyph: "\u264E", element: "air" },
  { name: "Scorpio", glyph: "\u264F", element: "water" },
  { name: "Sagittarius", glyph: "\u2650", element: "fire" },
  { name: "Capricorn", glyph: "\u2651", element: "earth" },
  { name: "Aquarius", glyph: "\u2652", element: "air" },
  { name: "Pisces", glyph: "\u2653", element: "water" },
];

// Planet positions in SVG-degrees (0° = east, clockwise). Hand-chosen to
// resemble the reference image.
const PLANETS = [
  { key: "sun", glyph: GLYPH.sun, angle: 282, label: "Sol" },
  { key: "mercury", glyph: GLYPH.mercury, angle: 274, label: "Mercúrio" },
  { key: "mars", glyph: GLYPH.mars, angle: 268, label: "Marte" },
  { key: "neptune", glyph: GLYPH.neptune, angle: 290, label: "Netuno" },
  { key: "venus", glyph: GLYPH.venus, angle: 246, label: "Vênus" },
  { key: "saturn", glyph: GLYPH.saturn, angle: 256, label: "Saturno" },
  { key: "uranus", glyph: GLYPH.uranus, angle: 262, label: "Urano" },
  { key: "jupiter", glyph: GLYPH.jupiter, angle: 168, label: "Júpiter" },
  { key: "moon", glyph: GLYPH.moon, angle: 100, label: "Lua" },
  { key: "pluto", glyph: GLYPH.pluto, angle: 38, label: "Plutão" },
  { key: "node", glyph: GLYPH.node, angle: 124, label: "Nodo" },
];

// Aspect lines drawn between planets (key pairs).
const ASPECTS = [
  ["sun", "moon", "opposition"],
  ["sun", "jupiter", "square"],
  ["moon", "saturn", "trine"],
  ["venus", "mars", "conjunction"],
  ["mercury", "pluto", "trine"],
  ["mars", "jupiter", "square"],
  ["saturn", "neptune", "conjunction"],
  ["uranus", "pluto", "sextile"],
];

const ASPECT_COLORS = {
  conjunction: "#d9a86b",
  trine: "#6ea877",
  square: "#c45a52",
  opposition: "#c45a52",
  sextile: "#7da7c7",
};

// One-time injection of reveal keyframes so the wheel can choreograph its
// own entrance when `reveal` is set.
if (typeof document !== "undefined" && !document.getElementById("cw-reveal-styles")) {
  const s = document.createElement("style");
  s.id = "cw-reveal-styles";
  s.textContent =
    "@keyframes cw-fade-in { from { opacity: 0; } to { opacity: 1; } }\n" +
    "@keyframes cw-fade-up { from { opacity: 0; transform: translateY(4px) scale(.92); } to { opacity: 1; transform: translateY(0) scale(1); } }";
  document.head.appendChild(s);
}

// Polar → cartesian. Angle in degrees, SVG convention (0=east, clockwise).
function pt(cx, cy, r, deg) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx, cy, rInner, rOuter, a1, a2) {
  const [x1, y1] = pt(cx, cy, rOuter, a1);
  const [x2, y2] = pt(cx, cy, rOuter, a2);
  const [x3, y3] = pt(cx, cy, rInner, a2);
  const [x4, y4] = pt(cx, cy, rInner, a1);
  const large = Math.abs(a2 - a1) > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${large} 0 ${x4} ${y4} Z`;
}

// Generic chart wheel. `size` is the SVG viewBox edge. Palette + variant
// control colors and density.
function ChartWheel({
  size = 400,
  variant = "minimal",
  palette = {},
  showHouseNumbers = true,
  showAspects = true,
  rotation = 254,
  label,
  className,
  style,
  reveal = false,
}) {
  // Staggered fade-in delays per layer (only used when reveal is true).
  const anim = (delaySec) =>
    reveal
      ? { animation: `cw-fade-in .55s ${delaySec}s both` }
      : {};
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.47;
  const rSignInner = size * 0.4;
  const rHouseOuter = size * 0.4;
  const rHouseInner = size * 0.34;
  const rPlanet = size * 0.29;
  const rAspectHub = size * 0.22;

  const p = {
    ring: palette.ring || "#5a4a30",
    text: palette.text || "#e8dcb8",
    hub: palette.hub || "#0a0a14",
    fire: palette.fire || "#c45a52",
    earth: palette.earth || "#a87a4a",
    air: palette.air || "#7da7c7",
    water: palette.water || "#3a6b78",
    background: palette.background || "transparent",
    aspectMuted: palette.aspectMuted || "rgba(200,180,140,.2)",
    house: palette.house || "rgba(200,180,140,.3)",
  };

  // Sign wedge fill by element (rendered for kerykeion variant only).
  const elFill = {
    fire: p.fire,
    earth: p.earth,
    air: p.air,
    water: p.water,
  };

  // The wheel's local rotation puts Aries 0° somewhere — we just rotate the
  // whole `<g>` by `rotation` so the user-visible Asc sits roughly at 9
  // o'clock. Planet/sign angles below are pre-baked relative to this rotated
  // frame.
  const planetByKey = Object.fromEntries(
    PLANETS.map((pl) => {
      const [x, y] = pt(cx, cy, rPlanet, pl.angle);
      return [pl.key, { ...pl, x, y }];
    })
  );

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ display: "block", ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {p.background !== "transparent" && (
        <rect width={size} height={size} fill={p.background} />
      )}

      {/* Hub */}
      <g style={anim(0)}>
        <circle cx={cx} cy={cy} r={rAspectHub} fill={p.hub} />
        {variant === "minimal" && (
          <circle
            cx={cx}
            cy={cy}
            r={rAspectHub}
            fill="none"
            stroke={p.ring}
            strokeWidth="0.6"
          />
        )}
      </g>

      {/* Sign ring */}
      <g style={anim(0.2)}>
        {SIGNS.map((s, i) => {
          const a1 = i * 30;
          const a2 = (i + 1) * 30;
          const mid = (a1 + a2) / 2;
          const [gx, gy] = pt(cx, cy, (rOuter + rSignInner) / 2, mid);
          if (variant === "kerykeion") {
            return (
              <g key={s.name}>
                <path
                  d={arcPath(cx, cy, rSignInner, rOuter, a1, a2)}
                  fill={elFill[s.element]}
                  opacity="0.78"
                />
                <text
                  x={gx}
                  y={gy}
                  fill={p.text}
                  fontSize={size * 0.05}
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{ fontFamily: "serif" }}
                >
                  {s.glyph}
                </text>
              </g>
            );
          }
          // minimal / paper: outline + glyph only
          return (
            <g key={s.name}>
              <line
                x1={pt(cx, cy, rSignInner, a1)[0]}
                y1={pt(cx, cy, rSignInner, a1)[1]}
                x2={pt(cx, cy, rOuter, a1)[0]}
                y2={pt(cx, cy, rOuter, a1)[1]}
                stroke={p.ring}
                strokeWidth="0.5"
              />
              <text
                x={gx}
                y={gy}
                fill={p.text}
                fontSize={size * 0.045}
                textAnchor="middle"
                dominantBaseline="central"
                opacity="0.85"
                style={{ fontFamily: "serif" }}
              >
                {s.glyph}
              </text>
            </g>
          );
        })}
      </g>

      {/* Outer + inner sign ring borders */}
      <g style={anim(0.5)}>
        <circle cx={cx} cy={cy} r={rOuter} fill="none" stroke={p.ring} strokeWidth="0.8" />
        <circle cx={cx} cy={cy} r={rSignInner} fill="none" stroke={p.ring} strokeWidth="0.6" />
      </g>

      {/* House ring */}
      <g style={anim(0.55)}>
        {Array.from({ length: 12 }).map((_, i) => {
          const a1 = i * 30;
          const a2 = (i + 1) * 30;
          const mid = (a1 + a2) / 2;
          const [hx, hy] = pt(cx, cy, (rHouseOuter + rHouseInner) / 2, mid);
          const [x1, y1] = pt(cx, cy, rHouseInner, a1);
          const [x2, y2] = pt(cx, cy, rHouseOuter, a1);
          return (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={p.house} strokeWidth="0.5" />
              {showHouseNumbers && (
                <text
                  x={hx}
                  y={hy}
                  fill={p.text}
                  fontSize={size * 0.024}
                  textAnchor="middle"
                  dominantBaseline="central"
                  opacity="0.7"
                  style={{ fontFamily: "serif" }}
                >
                  {i + 1}
                </text>
              )}
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={rHouseOuter} fill="none" stroke={p.house} strokeWidth="0.5" />
        <circle cx={cx} cy={cy} r={rHouseInner} fill="none" stroke={p.house} strokeWidth="0.5" />
      </g>

      {/* Asc / Mc axis */}
      <g opacity="0.6" style={anim(0.95)}>
        <line
          x1={pt(cx, cy, rOuter, 180)[0]}
          y1={pt(cx, cy, rOuter, 180)[1]}
          x2={pt(cx, cy, rOuter, 0)[0]}
          y2={pt(cx, cy, rOuter, 0)[1]}
          stroke={p.ring}
          strokeWidth="0.6"
          strokeDasharray="2 3"
        />
        <line
          x1={pt(cx, cy, rOuter, 270)[0]}
          y1={pt(cx, cy, rOuter, 270)[1]}
          x2={pt(cx, cy, rOuter, 90)[0]}
          y2={pt(cx, cy, rOuter, 90)[1]}
          stroke={p.ring}
          strokeWidth="0.6"
          strokeDasharray="2 3"
        />
        <text
          x={pt(cx, cy, rOuter + size * 0.02, 180)[0]}
          y={pt(cx, cy, rOuter + size * 0.02, 180)[1]}
          fill={p.text}
          fontSize={size * 0.025}
          textAnchor="end"
          dominantBaseline="central"
          style={{ fontFamily: "serif", letterSpacing: ".05em" }}
        >
          As
        </text>
        <text
          x={pt(cx, cy, rOuter + size * 0.02, 270)[0]}
          y={pt(cx, cy, rOuter + size * 0.02, 270)[1] - 4}
          fill={p.text}
          fontSize={size * 0.025}
          textAnchor="middle"
          style={{ fontFamily: "serif", letterSpacing: ".05em" }}
        >
          Mc
        </text>
      </g>

      {/* Aspect lines */}
      {showAspects && (
        <g style={anim(1.15)}>
          {ASPECTS.map(([a, b, kind], i) => {
            const pa = planetByKey[a];
            const pb = planetByKey[b];
            if (!pa || !pb) return null;
            const color =
              variant === "kerykeion"
                ? ASPECT_COLORS[kind]
                : p.aspect || p.ring;
            return (
              <line
                key={i}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={color}
                strokeWidth={variant === "kerykeion" ? 0.8 : 0.5}
                opacity={variant === "kerykeion" ? 0.85 : 0.5}
              />
            );
          })}
        </g>
      )}

      {/* Planets */}
      <g style={anim(1.45)}>
        {PLANETS.map((pl) => {
          const [x, y] = pt(cx, cy, rPlanet, pl.angle);
          return (
            <g key={pl.key}>
              <text
                x={x}
                y={y}
                fill={p.text}
                fontSize={size * 0.05}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontFamily: "serif" }}
              >
                {pl.glyph}
              </text>
            </g>
          );
        })}
      </g>

      {/* Optional label badge in lower-left */}
      {label && (
        <text
          x={size * 0.04}
          y={size * 0.96}
          fill={p.text}
          fontSize={size * 0.025}
          opacity="0.6"
          style={{ fontFamily: "monospace", letterSpacing: ".1em" }}
        >
          {label}
        </text>
      )}
    </svg>
  );
}

Object.assign(window, { ChartWheel, GLYPH, SIGNS, PLANETS });
