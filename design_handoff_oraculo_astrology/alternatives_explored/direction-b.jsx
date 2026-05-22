// direction-b.jsx — Kerykeion
// Extends the palette of the user's reference chart image directly into the
// product UI. The chart's own slate-purple ground, fire-red/earth-warm/
// air-teal/water-deep element coding, and cream-gold text become the
// product's primary surface and accents. Spectral for prose, JetBrains Mono
// for the tabular planet data — leaning into the chart's data density.

const dirBColors = {
  bg: "#28233e",
  bgDeep: "#1f1a30",
  surface: "#322a48",
  surfaceUp: "#3d3554",
  card: "#231e36",
  divider: "rgba(232,216,168,0.14)",
  dividerSoft: "rgba(232,216,168,0.07)",
  text: "#eadfb8",
  textMuted: "#a89e80",
  textDim: "#7a7260",
  fire: "#d65c5c",
  earth: "#b27a4a",
  air: "#82b5b5",
  water: "#3e7080",
  trine: "#7aae74",
  square: "#c45a52",
  conj: "#d4a16a",
};

const dirBSerif = "'Spectral', 'Cormorant Garamond', serif";
const dirBSans = "'Manrope', sans-serif";
const dirBMono = "'JetBrains Mono', ui-monospace, monospace";

const dirBStyles = {
  screen: {
    width: "100%",
    height: "100%",
    background: dirBColors.bg,
    color: dirBColors.text,
    fontFamily: dirBSerif,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
};

function DirBNav({ section = "Início" }) {
  const items = ["Início", "Pedir mapa", "Sinastria", "Vault", "Conta"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 40px",
        background: dirBColors.bgDeep,
        borderBottom: `1px solid ${dirBColors.divider}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <svg width="26" height="26" viewBox="0 0 26 26">
            <circle cx="13" cy="13" r="11" fill="none" stroke={dirBColors.text} strokeWidth="0.8" />
            <path
              d="M 13 2 A 11 11 0 0 1 24 13 L 13 13 Z"
              fill={dirBColors.fire}
              opacity="0.75"
            />
            <path
              d="M 24 13 A 11 11 0 0 1 13 24 L 13 13 Z"
              fill={dirBColors.earth}
              opacity="0.75"
            />
            <path
              d="M 13 24 A 11 11 0 0 1 2 13 L 13 13 Z"
              fill={dirBColors.water}
              opacity="0.75"
            />
            <path
              d="M 2 13 A 11 11 0 0 1 13 2 L 13 13 Z"
              fill={dirBColors.air}
              opacity="0.75"
            />
            <circle cx="13" cy="13" r="4" fill={dirBColors.bgDeep} />
          </svg>
          <div
            style={{
              fontFamily: dirBSerif,
              fontSize: 19,
              color: dirBColors.text,
              letterSpacing: "0.06em",
            }}
          >
            ORÁCULO
            <span style={{ color: dirBColors.textMuted, fontSize: 11, marginLeft: 8, fontFamily: dirBMono }}>
              ASTROLOGY
            </span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, fontFamily: dirBMono, fontSize: 12 }}>
          {items.map((it) => (
            <span
              key={it}
              style={{
                color: it === section ? dirBColors.text : dirBColors.textDim,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                position: "relative",
                paddingBottom: 4,
                borderBottom: it === section ? `1px solid ${dirBColors.fire}` : "none",
              }}
            >
              {it}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: dirBMono, fontSize: 11 }}>
        <span style={{ color: dirBColors.textDim, letterSpacing: "0.14em" }}>
          PT <span style={{ color: dirBColors.text }}>·</span> en
        </span>
        <div
          style={{
            padding: "6px 12px",
            background: dirBColors.fire,
            color: dirBColors.bgDeep,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          d · Diogo
        </div>
      </div>
    </div>
  );
}

// ── 1. Landing ────────────────────────────────────────────────────────
function DirBLanding() {
  return (
    <div style={dirBStyles.screen}>
      <DirBNav section="Início" />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1.05fr",
          gap: 0,
          overflow: "hidden",
        }}
      >
        {/* Left — copy */}
        <div
          style={{
            padding: "48px 56px",
            display: "flex",
            flexDirection: "column",
            background: dirBColors.bgDeep,
            borderRight: `1px solid ${dirBColors.divider}`,
          }}
        >
          <div
            style={{
              fontFamily: dirBMono,
              fontSize: 11,
              letterSpacing: "0.32em",
              color: dirBColors.fire,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            ▲ Fogo 45% · ⬢ Terra 16% · ◯ Ar 0% · ◇ Água 38%
          </div>
          <div
            style={{
              fontFamily: dirBSerif,
              fontSize: 68,
              lineHeight: 1.05,
              fontWeight: 400,
              color: dirBColors.text,
              letterSpacing: "-0.01em",
              marginBottom: 28,
            }}
          >
            Seu mapa<br />
            <span style={{ fontStyle: "italic", color: dirBColors.air }}>
              como conversa.
            </span>
          </div>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: dirBColors.text,
              maxWidth: 460,
              marginBottom: 36,
              fontFamily: dirBSerif,
              opacity: 0.86,
            }}
          >
            Pergunte ao Oráculo em português. Ele resolve quem é a pessoa,
            calcula o mapa com Swiss Ephemeris e devolve uma leitura inteira
            — Sol, Lua, Ascendente, aspectos, síntese.
          </div>
          {/* mock input */}
          <div
            style={{
              border: `1px solid ${dirBColors.divider}`,
              background: dirBColors.surface,
              padding: 4,
              display: "flex",
              alignItems: "center",
              maxWidth: 480,
            }}
          >
            <div
              style={{
                padding: "12px 14px",
                fontFamily: dirBSerif,
                fontStyle: "italic",
                color: dirBColors.textMuted,
                fontSize: 15,
                flex: 1,
              }}
            >
              "Faz o meu mapa natal e manda pro Telegram..."
            </div>
            <div
              style={{
                padding: "12px 18px",
                background: dirBColors.fire,
                color: dirBColors.bgDeep,
                fontFamily: dirBMono,
                fontSize: 11,
                letterSpacing: "0.16em",
                fontWeight: 600,
              }}
            >
              PERGUNTAR
            </div>
          </div>
          <div
            style={{
              marginTop: 14,
              fontFamily: dirBMono,
              fontSize: 11,
              color: dirBColors.textDim,
              letterSpacing: "0.04em",
            }}
          >
            POST /astrology/ask · Portuguese · sem cadastro
          </div>

          <div style={{ marginTop: "auto", paddingTop: 36 }}>
            <div
              style={{
                fontFamily: dirBMono,
                fontSize: 10,
                color: dirBColors.textDim,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Método
            </div>
            <div style={{ display: "flex", gap: 28, fontFamily: dirBSerif, fontSize: 14, color: dirBColors.text }}>
              <span>Tropical</span>
              <span style={{ color: dirBColors.textDim }}>·</span>
              <span>Casas Placidus</span>
              <span style={{ color: dirBColors.textDim }}>·</span>
              <span>Kerykeion + Swiss Ephemeris</span>
              <span style={{ color: dirBColors.textDim }}>·</span>
              <span>Sinastria Ciro Discepolo</span>
            </div>
          </div>
        </div>

        {/* Right — chart showcase */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 32,
          }}
        >
          <div
            style={{
              fontFamily: dirBMono,
              fontSize: 11,
              color: dirBColors.textMuted,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              position: "absolute",
              top: 32,
              left: 40,
            }}
          >
            ◉ Exemplo · Diogo Magalhães Machado
          </div>
          <div
            style={{
              fontFamily: dirBMono,
              fontSize: 10,
              color: dirBColors.textDim,
              letterSpacing: "0.14em",
              position: "absolute",
              top: 56,
              left: 40,
            }}
          >
            1987–12–07 · 15:03 · Rio de Janeiro · −02:00
          </div>
          <ChartWheel
            size={520}
            variant="kerykeion"
            palette={{
              ring: "rgba(232,216,168,0.5)",
              text: dirBColors.text,
              hub: dirBColors.bgDeep,
              house: "rgba(232,216,168,0.18)",
              fire: dirBColors.fire,
              earth: dirBColors.earth,
              air: dirBColors.air,
              water: dirBColors.water,
            }}
          />
          {/* Tier ribbon */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: 40,
              right: 40,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
            }}
          >
            {[
              ["Mapa natal", "Gratuito", "PNG · SVG · Markdown"],
              ["Sinastria", "Gratuito", "Prose · Markdown"],
              ["Trânsitos · Composto", "Em breve", "Lista de espera"],
            ].map(([t, k, sub], i) => (
              <div
                key={t}
                style={{
                  background: dirBColors.card,
                  border: `1px solid ${dirBColors.divider}`,
                  padding: "12px 14px",
                }}
              >
                <div
                  style={{
                    fontFamily: dirBMono,
                    fontSize: 9.5,
                    letterSpacing: "0.22em",
                    color: i === 2 ? dirBColors.fire : dirBColors.trine,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {k}
                </div>
                <div
                  style={{
                    fontFamily: dirBSerif,
                    fontSize: 18,
                    color: dirBColors.text,
                  }}
                >
                  {t}
                </div>
                <div
                  style={{
                    fontFamily: dirBMono,
                    fontSize: 10,
                    color: dirBColors.textDim,
                    marginTop: 4,
                  }}
                >
                  {sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. Ask UI ─────────────────────────────────────────────────────────
function DirBAsk() {
  return (
    <div style={dirBStyles.screen}>
      <DirBNav section="Pedir mapa" />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "260px 1fr",
          overflow: "hidden",
        }}
      >
        {/* Sidebar — recents */}
        <div
          style={{
            borderRight: `1px solid ${dirBColors.divider}`,
            background: dirBColors.bgDeep,
            padding: "20px 18px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <div
            style={{
              fontFamily: dirBMono,
              fontSize: 10,
              color: dirBColors.textDim,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Conversas
          </div>
          {[
            { t: "Mapa natal — Diogo", active: true, time: "agora" },
            { t: "Sinastria Lorena × Diogo", time: "ontem" },
            { t: "Mapa do Bernardo", time: "3d" },
            { t: "Lua de hoje?", time: "1sem" },
            { t: "Mapa da Júlia", time: "2sem", warn: true },
          ].map((c) => (
            <div
              key={c.t}
              style={{
                padding: "10px 12px",
                background: c.active ? dirBColors.surface : "transparent",
                borderLeft: c.active ? `2px solid ${dirBColors.fire}` : "2px solid transparent",
              }}
            >
              <div
                style={{
                  fontFamily: dirBSerif,
                  fontSize: 14,
                  color: c.active ? dirBColors.text : dirBColors.textMuted,
                }}
              >
                {c.t}
              </div>
              <div
                style={{
                  fontFamily: dirBMono,
                  fontSize: 10,
                  color: c.warn ? dirBColors.fire : dirBColors.textDim,
                  letterSpacing: "0.08em",
                  marginTop: 2,
                }}
              >
                {c.warn ? "falta hora · " : ""}{c.time}
              </div>
            </div>
          ))}
        </div>
        {/* Main */}
        <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div
            style={{
              flex: 1,
              padding: "32px 56px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {/* user msg */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  background: dirBColors.fire,
                  color: dirBColors.bgDeep,
                  padding: "12px 16px",
                  maxWidth: 480,
                  fontFamily: dirBSerif,
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                Faz o meu mapa natal e manda pro Telegram com a imagem
              </div>
            </div>

            {/* trace */}
            <div
              style={{
                fontFamily: dirBMono,
                fontSize: 11,
                background: dirBColors.card,
                border: `1px solid ${dirBColors.dividerSoft}`,
                padding: "12px 14px",
                color: dirBColors.textMuted,
                lineHeight: 1.9,
              }}
            >
              <div><span style={{ color: dirBColors.trine }}>✓</span> resolvendo pessoa → <span style={{ color: dirBColors.text }}>Diogo Magalhães Machado</span></div>
              <div><span style={{ color: dirBColors.trine }}>✓</span> carregando do vault: 1987-12-07 15:03 Rio de Janeiro</div>
              <div><span style={{ color: dirBColors.trine }}>✓</span> Swiss Ephemeris · Placidus · cálculo offline</div>
              <div><span style={{ color: dirBColors.trine }}>✓</span> wheel rendered → static.oraculo.network/astrology/diogo.png</div>
              <div><span style={{ color: dirBColors.air }}>◌</span> escrevendo interpretação...</div>
            </div>

            {/* assistant */}
            <div style={{ display: "flex", gap: 14 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: dirBColors.fire,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: dirBSerif,
                  color: dirBColors.bgDeep,
                  fontWeight: 700,
                  fontSize: 14,
                }}
              >
                O
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: dirBSerif,
                    fontSize: 21,
                    lineHeight: 1.4,
                    color: dirBColors.text,
                    marginBottom: 14,
                  }}
                >
                  <span style={{ fontStyle: "italic", color: dirBColors.air }}>Diogo,</span> seu Sol em Capricórnio quer construir o que dura — e
                  sua Lua em Câncer pede que isso tenha casa, cheiro, memória.
                </div>
                <div
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: dirBColors.text,
                    opacity: 0.85,
                  }}
                >
                  Mapa pronto. Enviei o PNG no seu Telegram e salvei a leitura
                  inteira em markdown. Quer abrir a leitura aqui ou prefere ler
                  no celular?
                </div>
                <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                  {["Abrir leitura completa", "Ver chart .svg", "Reenviar no Telegram"].map((t, i) => (
                    <div
                      key={t}
                      style={{
                        fontFamily: dirBMono,
                        fontSize: 11,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "7px 12px",
                        border: `1px solid ${i === 0 ? dirBColors.fire : dirBColors.divider}`,
                        color: i === 0 ? dirBColors.fire : dirBColors.text,
                      }}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div
            style={{
              borderTop: `1px solid ${dirBColors.divider}`,
              background: dirBColors.bgDeep,
              padding: "16px 56px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: dirBColors.surface,
                border: `1px solid ${dirBColors.divider}`,
                padding: "4px 4px 4px 18px",
              }}
            >
              <span
                style={{
                  fontFamily: dirBSerif,
                  fontStyle: "italic",
                  color: dirBColors.textMuted,
                  fontSize: 15,
                  flex: 1,
                  padding: "10px 0",
                }}
              >
                Faz a sinastria entre Lorena e Diogo
              </span>
              <span
                style={{
                  fontFamily: dirBMono,
                  fontSize: 10,
                  color: dirBColors.textDim,
                  letterSpacing: "0.2em",
                  marginRight: 8,
                }}
              >
                ⌘↵
              </span>
              <div
                style={{
                  padding: "10px 16px",
                  background: dirBColors.fire,
                  color: dirBColors.bgDeep,
                  fontFamily: dirBMono,
                  fontSize: 11,
                  letterSpacing: "0.18em",
                  fontWeight: 600,
                }}
              >
                ENVIAR
              </div>
            </div>
            <div
              style={{
                marginTop: 8,
                display: "flex",
                justifyContent: "space-between",
                fontFamily: dirBMono,
                fontSize: 10,
                color: dirBColors.textDim,
                letterSpacing: "0.06em",
              }}
            >
              <span>Telegram conectado · @diogomm</span>
              <span>Português · resposta ~12s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 3. Natal result ───────────────────────────────────────────────────
function DirBNatal() {
  const planets = [
    ["Sol", "☉", "♑ Cap", "15°02′57″", "XII"],
    ["Lua", "☽", "♋ Can", "12°06′53″", "VI"],
    ["Mercúrio", "☿", "♑ Cap", "06°26′50″", "XII"],
    ["Vênus", "♀", "♐ Sag", "11°57′42″", "XI"],
    ["Marte", "♂", "♑ Cap", "08°53′24″", "XII"],
    ["Júpiter", "♃", "♓ Pis", "19°52′11″", "II", "R"],
    ["Saturno", "♄", "♐ Sag", "22°36′16″", "XI"],
    ["Urano", "♅", "♐ Sag", "26°01′51″", "XI"],
    ["Netuno", "♆", "♑ Cap", "06°52′56″", "XII"],
    ["Plutão", "♇", "♏ Esc", "11°15′12″", "X"],
    ["Asc", "As", "♑ Cap", "16°50′09″", "—"],
    ["Mc", "Mc", "♏ Esc", "16°54′06″", "—"],
  ];
  return (
    <div style={dirBStyles.screen}>
      <DirBNav section="Pedir mapa" />
      <div
        style={{
          padding: "20px 40px 12px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderBottom: `1px solid ${dirBColors.divider}`,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: dirBMono,
              fontSize: 10,
              letterSpacing: "0.28em",
              color: dirBColors.fire,
              textTransform: "uppercase",
            }}
          >
            Perfil Astrológico
          </div>
          <div
            style={{
              fontFamily: dirBSerif,
              fontSize: 32,
              color: dirBColors.text,
              lineHeight: 1.1,
              marginTop: 4,
            }}
          >
            Diogo Magalhães Machado
          </div>
        </div>
        <div
          style={{
            fontFamily: dirBMono,
            fontSize: 11,
            color: dirBColors.textMuted,
            letterSpacing: "0.06em",
            textAlign: "right",
            lineHeight: 1.7,
          }}
        >
          Rio de Janeiro · Lat: 22°53′60″S · Lon: 43°21′36″W · [−02:00]<br />
          1987–12–07 · 15:03 · Fase lunar ●
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr 1fr",
          gap: 0,
          overflow: "hidden",
        }}
      >
        {/* Left — planet table */}
        <div
          style={{
            borderRight: `1px solid ${dirBColors.divider}`,
            padding: "20px 24px",
            display: "flex",
            flexDirection: "column",
            background: dirBColors.bgDeep,
          }}
        >
          <div
            style={{
              fontFamily: dirBMono,
              fontSize: 10,
              letterSpacing: "0.22em",
              color: dirBColors.textDim,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Posições
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: dirBMono, fontSize: 12 }}>
            {planets.map(([n, g, sign, deg, h, retro], i) => (
              <div
                key={n}
                style={{
                  display: "grid",
                  gridTemplateColumns: "16px 70px 1fr 30px 18px",
                  alignItems: "center",
                  gap: 8,
                  padding: "7px 0",
                  borderBottom: i === planets.length - 1 ? "none" : `1px solid ${dirBColors.dividerSoft}`,
                }}
              >
                <span style={{ color: dirBColors.text, fontFamily: dirBSerif, fontSize: 16 }}>{g}</span>
                <span style={{ color: dirBColors.text }}>{n}</span>
                <span style={{ color: dirBColors.textMuted }}>{deg} <span style={{ fontFamily: dirBSerif, fontSize: 14 }}>{sign.split(" ")[0]}</span></span>
                <span style={{ color: dirBColors.textDim, fontSize: 11 }}>{h}</span>
                <span style={{ color: dirBColors.fire, fontSize: 10 }}>{retro || ""}</span>
              </div>
            ))}
          </div>
          {/* Elements */}
          <div style={{ marginTop: 20 }}>
            <div
              style={{
                fontFamily: dirBMono,
                fontSize: 10,
                letterSpacing: "0.22em",
                color: dirBColors.textDim,
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Elementos
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {[
                ["Fogo", 45, dirBColors.fire],
                ["Terra", 16, dirBColors.earth],
                ["Ar", 0, dirBColors.air],
                ["Água", 39, dirBColors.water],
              ].map(([name, pct, c]) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, background: c }} />
                  <span style={{ fontFamily: dirBMono, fontSize: 11, color: dirBColors.text, letterSpacing: "0.04em" }}>
                    {name} {pct}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center — chart */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 16, position: "relative" }}>
          <ChartWheel
            size={460}
            variant="kerykeion"
            palette={{
              ring: "rgba(232,216,168,0.4)",
              text: dirBColors.text,
              hub: dirBColors.bgDeep,
              house: "rgba(232,216,168,0.2)",
              fire: dirBColors.fire,
              earth: dirBColors.earth,
              air: dirBColors.air,
              water: dirBColors.water,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              display: "flex",
              justifyContent: "space-between",
              fontFamily: dirBMono,
              fontSize: 10,
              color: dirBColors.textDim,
              letterSpacing: "0.1em",
            }}
          >
            <span>↓ PNG 300DPI</span>
            <span>↓ SVG</span>
            <span>↗ TELEGRAM</span>
            <span>⎘ COPY MD</span>
          </div>
        </div>

        {/* Right — interpretation */}
        <div
          style={{
            borderLeft: `1px solid ${dirBColors.divider}`,
            padding: "20px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              fontFamily: dirBMono,
              fontSize: 10,
              letterSpacing: "0.22em",
              color: dirBColors.textDim,
              textTransform: "uppercase",
            }}
          >
            Interpretação · síntese
          </div>
          <div
            style={{
              fontFamily: dirBSerif,
              fontSize: 19,
              lineHeight: 1.4,
              fontStyle: "italic",
              color: dirBColors.text,
              borderLeft: `2px solid ${dirBColors.fire}`,
              paddingLeft: 14,
            }}
          >
            Capricórnio que constrói por dentro, Câncer que sente por fora.
            Sem Ar em casa nenhuma, o pensamento entra pela ação.
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <span style={{ color: dirBColors.fire, fontFamily: dirBSerif, fontSize: 19 }}>☉</span>
              <span style={{ fontFamily: dirBSerif, fontSize: 17, color: dirBColors.text }}>
                Sol em <span style={{ color: dirBColors.earth }}>Capricórnio</span>, casa XII
              </span>
            </div>
            <div style={{ fontFamily: dirBSerif, fontSize: 14, lineHeight: 1.7, color: dirBColors.text, opacity: 0.88 }}>
              Sua autoridade é subterrânea. Você governa por dentro antes de
              aparecer por fora; o reconhecimento chega tarde demais para te
              impressionar.
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <span style={{ color: dirBColors.water, fontFamily: dirBSerif, fontSize: 19 }}>☽</span>
              <span style={{ fontFamily: dirBSerif, fontSize: 17, color: dirBColors.text }}>
                Lua em <span style={{ color: dirBColors.water }}>Câncer</span>, casa VI
              </span>
            </div>
            <div style={{ fontFamily: dirBSerif, fontSize: 14, lineHeight: 1.7, color: dirBColors.text, opacity: 0.88 }}>
              Você cuida fazendo — cozinha, organiza, lembra. A oposição com
              o Sol é a tensão que move tudo.
            </div>
          </div>
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <span style={{ color: dirBColors.earth, fontFamily: dirBSerif, fontSize: 19 }}>As</span>
              <span style={{ fontFamily: dirBSerif, fontSize: 17, color: dirBColors.text }}>
                Ascendente <span style={{ color: dirBColors.earth }}>Capricórnio</span>
              </span>
            </div>
            <div style={{ fontFamily: dirBSerif, fontSize: 14, lineHeight: 1.7, color: dirBColors.text, opacity: 0.88 }}>
              O mundo te vê mais velho do que você é. Útil — ganha tempo até
              encontrar a brincadeira que mora atrás.
            </div>
          </div>
          <div
            style={{
              marginTop: "auto",
              fontFamily: dirBMono,
              fontSize: 10,
              color: dirBColors.textDim,
              letterSpacing: "0.1em",
              borderTop: `1px solid ${dirBColors.dividerSoft}`,
              paddingTop: 12,
            }}
          >
            ↓ ASPECTOS MAIORES · MC · MARTE — rolar para continuar
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 4. Synastry ───────────────────────────────────────────────────────
function DirBSynastry() {
  return (
    <div style={dirBStyles.screen}>
      <DirBNav section="Sinastria" />
      <div
        style={{
          padding: "20px 40px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${dirBColors.divider}`,
        }}
      >
        <div
          style={{
            fontFamily: dirBMono,
            fontSize: 10,
            letterSpacing: "0.28em",
            color: dirBColors.fire,
            textTransform: "uppercase",
          }}
        >
          Sinastria · método Ciro Discepolo
        </div>
        <div
          style={{
            fontFamily: dirBMono,
            fontSize: 11,
            color: dirBColors.textMuted,
            letterSpacing: "0.06em",
          }}
        >
          [chart wheel da sinastria — não disponível, somente prosa]
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 0,
          overflow: "hidden",
        }}
      >
        {/* Left — Lorena */}
        <div
          style={{
            borderRight: `1px solid ${dirBColors.divider}`,
            padding: "32px 40px",
            display: "flex",
            flexDirection: "column",
            background: dirBColors.bgDeep,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                background: dirBColors.water,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: dirBSerif,
                fontSize: 24,
                color: dirBColors.text,
              }}
            >
              L
            </div>
            <div>
              <div style={{ fontFamily: dirBSerif, fontSize: 28, color: dirBColors.text, lineHeight: 1 }}>
                Lorena Ávila
              </div>
              <div style={{ fontFamily: dirBMono, fontSize: 11, color: dirBColors.textMuted, marginTop: 6, letterSpacing: "0.06em" }}>
                1989-07-04 · 22:14 · São Paulo
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontFamily: dirBMono, fontSize: 11 }}>
            {[
              ["Sol", "♋", "12°", dirBColors.water],
              ["Lua", "♉", "03°", dirBColors.earth],
              ["Asc", "♍", "21°", dirBColors.earth],
              ["Mercúrio", "♋", "28°", dirBColors.water],
              ["Vênus", "♊", "04°", dirBColors.air],
              ["Marte", "♉", "10°", dirBColors.earth],
            ].map(([n, g, d, c]) => (
              <div key={n} style={{ borderTop: `1px solid ${dirBColors.dividerSoft}`, padding: "8px 0" }}>
                <div style={{ color: dirBColors.textDim, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 10 }}>{n}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                  <span style={{ fontFamily: dirBSerif, fontSize: 18, color: c }}>{g}</span>
                  <span style={{ color: dirBColors.text }}>{d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Diogo */}
        <div style={{ padding: "32px 40px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                background: dirBColors.earth,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: dirBSerif,
                fontSize: 24,
                color: dirBColors.bgDeep,
              }}
            >
              D
            </div>
            <div>
              <div style={{ fontFamily: dirBSerif, fontSize: 28, color: dirBColors.text, lineHeight: 1 }}>
                Diogo Magalhães
              </div>
              <div style={{ fontFamily: dirBMono, fontSize: 11, color: dirBColors.textMuted, marginTop: 6, letterSpacing: "0.06em" }}>
                1987-12-07 · 15:03 · Rio de Janeiro
              </div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontFamily: dirBMono, fontSize: 11 }}>
            {[
              ["Sol", "♑", "15°", dirBColors.earth],
              ["Lua", "♋", "12°", dirBColors.water],
              ["Asc", "♑", "16°", dirBColors.earth],
              ["Mercúrio", "♑", "06°", dirBColors.earth],
              ["Vênus", "♐", "11°", dirBColors.fire],
              ["Marte", "♑", "08°", dirBColors.earth],
            ].map(([n, g, d, c]) => (
              <div key={n} style={{ borderTop: `1px solid ${dirBColors.dividerSoft}`, padding: "8px 0" }}>
                <div style={{ color: dirBColors.textDim, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: 10 }}>{n}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
                  <span style={{ fontFamily: dirBSerif, fontSize: 18, color: c }}>{g}</span>
                  <span style={{ color: dirBColors.text }}>{d}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom — connection prose */}
      <div
        style={{
          background: dirBColors.card,
          padding: "26px 40px",
          borderTop: `1px solid ${dirBColors.divider}`,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: 32,
          }}
        >
          <div>
            <div style={{ fontFamily: dirBMono, fontSize: 10, color: dirBColors.fire, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>
              Dinâmica central
            </div>
            <div style={{ fontFamily: dirBSerif, fontSize: 19, lineHeight: 1.4, fontStyle: "italic", color: dirBColors.text }}>
              O eixo Câncer–Capricórnio cruza vocês duas vezes. É a relação como
              casa: ele constrói as paredes, ela escolhe a luz.
            </div>
          </div>
          <div>
            <div style={{ fontFamily: dirBMono, fontSize: 10, color: dirBColors.textDim, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>
              Aspectos-chave
            </div>
            <div style={{ fontFamily: dirBMono, fontSize: 12, color: dirBColors.text, lineHeight: 1.9 }}>
              <div>☉ <span style={{ color: dirBColors.square }}>☍</span> ☉ — oposição luminar</div>
              <div>☽ <span style={{ color: dirBColors.conj }}>☌</span> ☉ — Lua dele ↔ Sol dela</div>
              <div>♀ <span style={{ color: dirBColors.trine }}>△</span> ♂ — desejo em fluxo</div>
              <div>♄ <span style={{ color: dirBColors.square }}>□</span> ☽ — peso e tempo</div>
            </div>
          </div>
          <div>
            <div style={{ fontFamily: dirBMono, fontSize: 10, color: dirBColors.textDim, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>
              Qualidade da conexão
            </div>
            <div style={{ fontFamily: dirBSerif, fontSize: 14, lineHeight: 1.7, color: dirBColors.text, opacity: 0.88 }}>
              Doméstica antes de tudo. Vocês se reconhecem na rotina; a
              erotização aparece pela continuidade. Pode faltar surpresa;
              nunca falta retorno.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 5. Vault ──────────────────────────────────────────────────────────
function DirBVault() {
  const people = [
    { name: "Diogo Magalhães Machado", initial: "D", color: dirBColors.earth, meta: "1987-12-07 · 15:03 · Rio de Janeiro", sun: "♑", moon: "♋", asc: "♑", note: "Você" },
    { name: "Lorena Ávila", initial: "L", color: dirBColors.water, meta: "1989-07-04 · 22:14 · São Paulo", sun: "♋", moon: "♉", asc: "♍" },
    { name: "Roberto (pai)", initial: "R", color: dirBColors.fire, meta: "1955-03-21 · 06:40 · Niterói", sun: "♈", moon: "♍", asc: "♓" },
    { name: "Cláudia (mãe)", initial: "C", color: dirBColors.water, meta: "1959-11-02 · 12:30 · Rio de Janeiro", sun: "♏", moon: "♎", asc: "♐" },
    { name: "Júlia (irmã)", initial: "J", color: dirBColors.fire, meta: "1991-08-15 · sem hora · Rio de Janeiro", sun: "♌", moon: "—", asc: "—", warn: true },
    { name: "Bernardo (sócio)", initial: "B", color: dirBColors.air, meta: "1984-05-30 · 09:00 · Belo Horizonte", sun: "♊", moon: "♉", asc: "♋" },
  ];
  return (
    <div style={dirBStyles.screen}>
      <DirBNav section="Vault" />
      <div
        style={{
          padding: "26px 40px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          borderBottom: `1px solid ${dirBColors.divider}`,
        }}
      >
        <div>
          <div style={{ fontFamily: dirBMono, fontSize: 10, letterSpacing: "0.28em", color: dirBColors.fire, textTransform: "uppercase" }}>
            Vault · pessoas conhecidas
          </div>
          <div style={{ fontFamily: dirBSerif, fontSize: 30, color: dirBColors.text, marginTop: 4 }}>
            6 pessoas <span style={{ color: dirBColors.textDim }}>·</span> 1 com dados incompletos
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div
            style={{
              padding: "10px 16px",
              border: `1px solid ${dirBColors.divider}`,
              fontFamily: dirBMono,
              fontSize: 11,
              color: dirBColors.text,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Importar CSV
          </div>
          <div
            style={{
              padding: "10px 16px",
              background: dirBColors.fire,
              color: dirBColors.bgDeep,
              fontFamily: dirBMono,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            + Adicionar pessoa
          </div>
        </div>
      </div>
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          overflow: "hidden",
        }}
      >
        {/* List */}
        <div style={{ background: dirBColors.bgDeep, padding: "16px 0", overflow: "hidden" }}>
          {people.map((p, i) => (
            <div
              key={p.name}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 60px 1.4fr 1.6fr 1fr 80px",
                gap: 16,
                alignItems: "center",
                padding: "14px 40px",
                borderLeft: i === 0 ? `2px solid ${dirBColors.fire}` : "2px solid transparent",
                background: i === 0 ? dirBColors.surface : "transparent",
                opacity: p.warn ? 0.7 : 1,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  background: p.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: dirBSerif,
                  fontSize: 16,
                  color: dirBColors.bgDeep,
                  fontWeight: 600,
                }}
              >
                {p.initial}
              </div>
              <div style={{ fontFamily: dirBSerif, fontSize: 22, letterSpacing: "0.04em", color: dirBColors.text }}>
                {p.sun} {p.moon} {p.asc}
              </div>
              <div>
                <div style={{ fontFamily: dirBSerif, fontSize: 16, color: dirBColors.text }}>{p.name}</div>
                {p.note && (
                  <div style={{ fontFamily: dirBMono, fontSize: 10, color: dirBColors.fire, letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>
                    {p.note}
                  </div>
                )}
              </div>
              <div style={{ fontFamily: dirBMono, fontSize: 11, color: dirBColors.textMuted, letterSpacing: "0.04em" }}>
                {p.meta}
              </div>
              <div style={{ fontFamily: dirBMono, fontSize: 10, color: p.warn ? dirBColors.fire : dirBColors.trine, letterSpacing: "0.18em", textTransform: "uppercase" }}>
                {p.warn ? "Falta hora" : "Pronto"}
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", fontFamily: dirBMono, fontSize: 10, color: dirBColors.textDim, letterSpacing: "0.1em" }}>
                <span>EDITAR</span>
                <span>↗</span>
              </div>
            </div>
          ))}
        </div>
        {/* Add form */}
        <div style={{ padding: "24px 32px", borderLeft: `1px solid ${dirBColors.divider}` }}>
          <div style={{ fontFamily: dirBMono, fontSize: 10, color: dirBColors.fire, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 6 }}>
            Adicionar pessoa
          </div>
          <div style={{ fontFamily: dirBSerif, fontSize: 22, color: dirBColors.text, marginBottom: 18 }}>
            Dados de nascimento
          </div>
          {[
            ["Nome completo", "Lorena Ávila"],
            ["Data", "1989-07-04"],
            ["Hora", "22:14"],
            ["Cidade", "São Paulo, Brasil"],
            ["Coordenadas", "23°33′S 46°38′W (auto)"],
            ["Fuso", "−03:00 (auto)"],
          ].map(([label, val], i) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: dirBMono, fontSize: 9.5, color: dirBColors.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
                {label}
              </div>
              <div
                style={{
                  background: dirBColors.surface,
                  border: `1px solid ${dirBColors.dividerSoft}`,
                  padding: "9px 12px",
                  fontFamily: i >= 4 ? dirBMono : dirBSerif,
                  fontSize: 14,
                  color: i >= 4 ? dirBColors.textMuted : dirBColors.text,
                }}
              >
                {val}
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <div
              style={{
                flex: 1,
                padding: "10px",
                textAlign: "center",
                background: dirBColors.fire,
                color: dirBColors.bgDeep,
                fontFamily: dirBMono,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Salvar no vault
            </div>
            <div
              style={{
                padding: "10px 14px",
                border: `1px solid ${dirBColors.divider}`,
                color: dirBColors.text,
                fontFamily: dirBMono,
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Cancelar
            </div>
          </div>
          <div style={{ marginTop: 16, fontFamily: dirBMono, fontSize: 10, color: dirBColors.textDim, letterSpacing: "0.04em", lineHeight: 1.7 }}>
            Sem hora → mapa sem casas e sem Ascendente. Você ainda pode pedir
            uma leitura, mas a interpretação fica menos precisa.
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirBLanding, DirBAsk, DirBNatal, DirBSynastry, DirBVault });
