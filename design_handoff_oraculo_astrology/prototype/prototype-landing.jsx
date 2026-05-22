// prototype-landing.jsx — single-CTA landing. Channels are a post-account
// concern; not a fork at the door.

function Landing({ onStart }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: oraColors.bgDeep,
        color: oraColors.text,
        fontFamily: oraFont.serif,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield />
      <LandingNav />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          maxWidth: 1280,
          width: "100%",
          margin: "0 auto",
          padding: "72px 56px 40px",
          gap: 72,
          boxSizing: "border-box",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: oraFont.mono,
              fontSize: 11,
              letterSpacing: "0.32em",
              color: oraColors.fire,
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            ▲ Fogo · ⬢ Terra · ◯ Ar · ◇ Água
          </div>
          <div
            style={{
              fontFamily: oraFont.serif,
              fontSize: 84,
              lineHeight: 1.0,
              color: oraColors.text,
              letterSpacing: "-0.015em",
              marginBottom: 28,
              fontWeight: 400,
            }}
          >
            Seu mapa<br />
            <span style={{ fontStyle: "italic", color: oraColors.air }}>
              como conversa.
            </span>
          </div>
          <div
            style={{
              fontFamily: oraFont.serif,
              fontSize: 19,
              lineHeight: 1.55,
              color: oraColors.text,
              opacity: 0.86,
              maxWidth: 480,
              marginBottom: 42,
            }}
          >
            Pergunte ao Oráculo em português. Ele lê o céu, calcula com
            efemérides suíças e devolve uma leitura inteira — quente,
            simbólica, direta.
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <button
              onClick={() => onStart()}
              style={{
                padding: "18px 34px",
                background: oraColors.fire,
                color: oraColors.bgDeep,
                border: "none",
                fontFamily: oraFont.serif,
                fontSize: 18,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Fazer meu mapa →
            </button>
            <div
              style={{
                fontFamily: oraFont.mono,
                fontSize: 10,
                color: oraColors.textDim,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                lineHeight: 1.6,
              }}
            >
              Gratuito · ~ 90s<br />
              Sem cartão, sem ritual de cadastro
            </div>
          </div>

          <div style={{ marginTop: "auto", paddingTop: 48 }}>
            <div
              style={{
                fontFamily: oraFont.mono,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: oraColors.textDim,
                marginBottom: 16,
              }}
            >
              O que você recebe
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 22,
                fontFamily: oraFont.serif,
                fontSize: 14,
                color: oraColors.text,
              }}
            >
              {[
                ["Mapa em PNG e SVG", "300 dpi · pode imprimir, postar, gravar."],
                ["Leitura em prosa", "Sol, Lua, Ascendente, aspectos, síntese."],
                ["Sinastria entre dois", "Método Ciro Discepolo · conexão em texto."],
              ].map(([h, sub]) => (
                <div key={h}>
                  <div style={{ color: oraColors.text }}>{h}</div>
                  <div
                    style={{
                      color: oraColors.textMuted,
                      fontSize: 12.5,
                      marginTop: 4,
                      lineHeight: 1.5,
                    }}
                  >
                    {sub}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — chart with annotations */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <AnnotatedChart />
        </div>
      </div>

      <LandingFooter />
    </div>
  );
}

function LandingNav() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 56px",
        borderBottom: `1px solid ${oraColors.divider}`,
        position: "relative",
        zIndex: 2,
      }}
    >
      <OraculoLogo />
      <div
        style={{
          fontFamily: oraFont.mono,
          fontSize: 10,
          color: oraColors.textMuted,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <TodaySkyMini />
      </div>
    </div>
  );
}

function OraculoLogo({ size = 26 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <svg width={size} height={size} viewBox="0 0 26 26">
        <circle cx="13" cy="13" r="11" fill="none" stroke={oraColors.text} strokeWidth="0.8" />
        <path d="M 13 2 A 11 11 0 0 1 24 13 L 13 13 Z" fill={oraColors.fire} opacity="0.75" />
        <path d="M 24 13 A 11 11 0 0 1 13 24 L 13 13 Z" fill={oraColors.earth} opacity="0.75" />
        <path d="M 13 24 A 11 11 0 0 1 2 13 L 13 13 Z" fill={oraColors.water} opacity="0.75" />
        <path d="M 2 13 A 11 11 0 0 1 13 2 L 13 13 Z" fill={oraColors.air} opacity="0.75" />
        <circle cx="13" cy="13" r="4" fill={oraColors.bgDeep} />
      </svg>
      <div style={{ fontFamily: oraFont.serif, fontSize: 19, color: oraColors.text, letterSpacing: "0.06em" }}>
        ORÁCULO
        <span
          style={{
            color: oraColors.textMuted,
            fontSize: 10,
            marginLeft: 8,
            fontFamily: oraFont.mono,
            letterSpacing: "0.22em",
          }}
        >
          ASTROLOGY
        </span>
      </div>
    </div>
  );
}

function AnnotatedChart() {
  return (
    <div style={{ position: "relative", padding: 12 }}>
      {/* halo */}
      <div
        style={{
          position: "absolute",
          inset: "-12%",
          background:
            "radial-gradient(circle at center, rgba(214,92,92,0.16), transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <ChartWheel
        size={440}
        variant="kerykeion"
        reveal
        palette={{
          ring: "rgba(232,216,168,0.5)",
          text: oraColors.text,
          hub: oraColors.bgDeep,
          house: "rgba(232,216,168,0.2)",
          fire: oraColors.fire,
          earth: oraColors.earth,
          air: oraColors.air,
          water: oraColors.water,
        }}
      />
      {/* floating annotations */}
      {[
        { x: -8, y: 18, label: "Sol em Capricórnio", sub: "constrói lentamente" },
        { x: "calc(100% - 200px)", y: 200, label: "Lua em Câncer", sub: "memória como cuidado" },
        { x: -20, y: "calc(100% - 80px)", label: "Júpiter em Peixes", sub: "fé que dilui" },
      ].map((a, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: a.x,
            top: a.y,
            fontFamily: oraFont.mono,
            fontSize: 10,
            letterSpacing: "0.06em",
            color: oraColors.text,
            background: "rgba(35,30,54,0.85)",
            border: `1px solid ${oraColors.dividerSoft}`,
            padding: "6px 10px",
            backdropFilter: "blur(6px)",
            animation: `fadeUpOraculo .6s ${1.6 + i * 0.4}s both`,
          }}
        >
          <div style={{ color: oraColors.air, fontStyle: "italic", fontFamily: oraFont.serif, fontSize: 13 }}>
            {a.label}
          </div>
          <div style={{ color: oraColors.textMuted, marginTop: 2 }}>{a.sub}</div>
        </div>
      ))}
    </div>
  );
}

function Starfield() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(1px 1px at 12% 18%, rgba(234,223,184,0.4), transparent 60%)," +
          "radial-gradient(1px 1px at 78% 32%, rgba(234,223,184,0.35), transparent 60%)," +
          "radial-gradient(1.5px 1.5px at 42% 78%, rgba(234,223,184,0.5), transparent 60%)," +
          "radial-gradient(1px 1px at 88% 86%, rgba(234,223,184,0.4), transparent 60%)," +
          "radial-gradient(1px 1px at 22% 64%, rgba(234,223,184,0.3), transparent 60%)," +
          "radial-gradient(1.5px 1.5px at 62% 12%, rgba(234,223,184,0.45), transparent 60%)," +
          "radial-gradient(1px 1px at 8% 92%, rgba(234,223,184,0.3), transparent 60%)," +
          "radial-gradient(2px 2px at 95% 50%, rgba(234,223,184,0.55), transparent 60%)",
        pointerEvents: "none",
      }}
    />
  );
}

// "Hoje no céu" mini-ribbon — used in landing nav AND inside the app.
function TodaySkyMini() {
  const today = getTodaySky();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontFamily: oraFont.mono,
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: oraColors.textMuted,
      }}
    >
      <span style={{ color: oraColors.fire }}>Hoje no céu</span>
      <span style={{ color: oraColors.textDim }}>·</span>
      <span style={{ color: oraColors.text }}>
        ☉ {today.sun} <span style={{ color: oraColors.textDim }}>·</span> ☽ {today.moon} {today.phase}
      </span>
    </div>
  );
}

function getTodaySky() {
  // Deterministic-ish per-day mock; for prototype only.
  const phases = ["nova", "crescente", "cheia", "minguante"];
  const signs = ["♈ Áries", "♉ Touro", "♊ Gêmeos", "♋ Câncer", "♌ Leão", "♍ Virgem", "♎ Libra", "♏ Escorpião", "♐ Sagitário", "♑ Capricórnio", "♒ Aquário", "♓ Peixes"];
  const day = new Date();
  return {
    sun: signs[day.getMonth()],
    moon: signs[(day.getDate() + day.getMonth()) % 12],
    phase: phases[Math.floor((day.getDate() / 30) * 4) % 4],
  };
}

function LandingFooter() {
  return (
    <div
      style={{
        padding: "18px 56px",
        borderTop: `1px solid ${oraColors.divider}`,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: oraFont.mono,
        fontSize: 10,
        color: oraColors.textDim,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        position: "relative",
        zIndex: 1,
      }}
    >
      <span>Tropical · Casas Placidus · Swiss Ephemeris · Ciro Discepolo</span>
      <span>POST /astrology/ask</span>
    </div>
  );
}

// Shared frame for the onboarding screen (same logo, centered card).
function AuthShell({ children, onBack, caption }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: oraColors.bgDeep,
        color: oraColors.text,
        fontFamily: oraFont.serif,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Starfield />
      <div
        style={{
          padding: "20px 56px",
          borderBottom: `1px solid ${oraColors.divider}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <OraculoLogo />
        {onBack && (
          <button
            onClick={onBack}
            style={{
              background: "transparent",
              border: "none",
              color: oraColors.textMuted,
              fontFamily: oraFont.mono,
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            ← Voltar
          </button>
        )}
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px 24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 520,
            maxWidth: "100%",
            background: oraColors.card,
            border: `1px solid ${oraColors.divider}`,
            padding: "32px 36px 32px",
          }}
        >
          <div
            style={{
              fontFamily: oraFont.mono,
              fontSize: 10,
              letterSpacing: "0.32em",
              color: oraColors.fire,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            {caption}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Landing, AuthShell, OraculoLogo, TodaySkyMini, getTodaySky });
