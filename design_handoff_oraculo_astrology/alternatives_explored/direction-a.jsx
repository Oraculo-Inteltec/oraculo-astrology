// direction-a.jsx — Noite Profunda
// Editorial mystical: near-black backdrop, antique gold, Cormorant Garamond
// for display and Manrope for UI. The chart is a *minimal* line drawing in
// gold — restraint over decoration. Interpretation reads like an essay.

const dirAColors = {
  bg: "#0b0a14",
  surface: "#15131f",
  surfaceUp: "#1c1a28",
  divider: "rgba(201,168,106,0.18)",
  dividerSoft: "rgba(244,236,216,0.07)",
  gold: "#c9a86a",
  goldSoft: "#8d7548",
  cream: "#f4ecd8",
  muted: "#8a8499",
  body: "#cfc7b6",
  fire: "#d4795e",
  earth: "#b5946a",
  air: "#8aaab0",
  water: "#5e8593",
};

const dirASerif = "'Cormorant Garamond', 'Cardo', Georgia, serif";
const dirASans = "'Manrope', 'Inter', -apple-system, sans-serif";
const dirAMono = "'JetBrains Mono', ui-monospace, monospace";

const dirAStyles = {
  screen: {
    width: "100%",
    height: "100%",
    background: dirAColors.bg,
    color: dirAColors.cream,
    fontFamily: dirASans,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  // Subtle starfield rendered as a fixed background grain.
  starfield: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(1px 1px at 12% 18%, rgba(244,236,216,0.5), transparent 60%)," +
      "radial-gradient(1px 1px at 78% 32%, rgba(244,236,216,0.45), transparent 60%)," +
      "radial-gradient(1px 1px at 42% 78%, rgba(244,236,216,0.4), transparent 60%)," +
      "radial-gradient(1px 1px at 88% 86%, rgba(244,236,216,0.5), transparent 60%)," +
      "radial-gradient(1px 1px at 22% 64%, rgba(244,236,216,0.3), transparent 60%)," +
      "radial-gradient(1px 1px at 62% 12%, rgba(244,236,216,0.35), transparent 60%)," +
      "radial-gradient(1px 1px at 8% 92%, rgba(244,236,216,0.3), transparent 60%)," +
      "radial-gradient(1.5px 1.5px at 95% 50%, rgba(244,236,216,0.5), transparent 60%)," +
      "radial-gradient(ellipse at 50% 40%, rgba(201,168,106,0.05), transparent 70%)",
    pointerEvents: "none",
  },
};

function DirANav({ section = "Início" }) {
  const items = ["Início", "Pedir mapa", "Sinastria", "Vault", "Conta"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 48px",
        borderBottom: `1px solid ${dirAColors.dividerSoft}`,
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <svg width="22" height="22" viewBox="0 0 22 22">
          <circle
            cx="11"
            cy="11"
            r="9"
            fill="none"
            stroke={dirAColors.gold}
            strokeWidth="0.8"
          />
          <circle cx="11" cy="11" r="2.2" fill={dirAColors.gold} />
          <line x1="11" y1="2" x2="11" y2="20" stroke={dirAColors.gold} strokeWidth="0.4" />
          <line x1="2" y1="11" x2="20" y2="11" stroke={dirAColors.gold} strokeWidth="0.4" />
        </svg>
        <div
          style={{
            fontFamily: dirASerif,
            fontSize: 22,
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: dirAColors.cream,
          }}
        >
          Oráculo
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 36, fontSize: 13.5 }}>
        {items.map((it) => (
          <span
            key={it}
            style={{
              color: it === section ? dirAColors.cream : dirAColors.muted,
              borderBottom: it === section ? `1px solid ${dirAColors.gold}` : "none",
              paddingBottom: 4,
              letterSpacing: "0.02em",
            }}
          >
            {it}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 12 }}>
        <span
          style={{
            color: dirAColors.muted,
            fontFamily: dirAMono,
            letterSpacing: "0.1em",
          }}
        >
          PT · <span style={{ color: dirAColors.cream }}>EN</span>
        </span>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: dirAColors.surfaceUp,
            border: `1px solid ${dirAColors.divider}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: dirASerif,
            fontStyle: "italic",
            color: dirAColors.gold,
            fontSize: 13,
          }}
        >
          d
        </div>
      </div>
    </div>
  );
}

// ── 1. Landing ─────────────────────────────────────────────────────────
function DirALanding() {
  return (
    <div style={dirAStyles.screen}>
      <div style={dirAStyles.starfield} />
      <DirANav section="Início" />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 64,
          padding: "60px 80px 40px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: dirAMono,
              fontSize: 11,
              letterSpacing: "0.32em",
              color: dirAColors.gold,
              textTransform: "uppercase",
              marginBottom: 36,
            }}
          >
            Astrologia conversacional · est. 2026
          </div>
          <div
            style={{
              fontFamily: dirASerif,
              fontSize: 78,
              lineHeight: 1.02,
              fontWeight: 300,
              color: dirAColors.cream,
              letterSpacing: "-0.01em",
              marginBottom: 28,
            }}
          >
            Pergunte ao céu,
            <br />
            <span style={{ fontStyle: "italic", color: dirAColors.gold }}>
              em português.
            </span>
          </div>
          <div
            style={{
              fontSize: 17,
              lineHeight: 1.55,
              color: dirAColors.body,
              maxWidth: 440,
              marginBottom: 44,
              fontWeight: 300,
            }}
          >
            Mapas natais e sinastrias interpretados como prosa — quente,
            poética, direta. Você pergunta com suas palavras; o Oráculo lê,
            calcula e devolve o sentido.
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div
              style={{
                background: dirAColors.gold,
                color: dirAColors.bg,
                padding: "14px 28px",
                fontFamily: dirASans,
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.04em",
                borderRadius: 2,
              }}
            >
              Fazer meu mapa
            </div>
            <div
              style={{
                color: dirAColors.cream,
                padding: "14px 8px",
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: "0.04em",
                borderBottom: `1px solid ${dirAColors.divider}`,
              }}
            >
              Ver exemplo →
            </div>
          </div>
          <div
            style={{
              marginTop: 64,
              fontFamily: dirAMono,
              fontSize: 11,
              color: dirAColors.muted,
              letterSpacing: "0.18em",
              display: "flex",
              gap: 28,
              textTransform: "uppercase",
            }}
          >
            <span>Tropical</span>
            <span>Casas Placidus</span>
            <span>Swiss Ephemeris</span>
          </div>
        </div>
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-10% -10%",
              background:
                "radial-gradient(circle at center, rgba(201,168,106,0.12), transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <ChartWheel
            size={460}
            variant="minimal"
            palette={{
              ring: dirAColors.gold,
              text: dirAColors.cream,
              hub: "transparent",
              house: "rgba(201,168,106,0.18)",
              aspect: dirAColors.gold,
            }}
          />
        </div>
      </div>
      {/* Tiers */}
      <div
        style={{
          borderTop: `1px solid ${dirAColors.dividerSoft}`,
          padding: "32px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 40,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: dirAMono,
              fontSize: 10,
              letterSpacing: "0.28em",
              color: dirAColors.muted,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Gratuito
          </div>
          <div
            style={{
              fontFamily: dirASerif,
              fontSize: 28,
              color: dirAColors.cream,
              fontWeight: 400,
            }}
          >
            Mapa natal completo
          </div>
          <div style={{ fontSize: 13, color: dirAColors.body, marginTop: 8 }}>
            Sol · Lua · Ascendente · aspectos maiores · MC · Marte · síntese.
            Imagem em PNG e SVG.
          </div>
        </div>
        <div>
          <div
            style={{
              fontFamily: dirAMono,
              fontSize: 10,
              letterSpacing: "0.28em",
              color: dirAColors.muted,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Gratuito
          </div>
          <div
            style={{
              fontFamily: dirASerif,
              fontSize: 28,
              color: dirAColors.cream,
              fontWeight: 400,
            }}
          >
            Sinastria entre duas pessoas
          </div>
          <div style={{ fontSize: 13, color: dirAColors.body, marginTop: 8 }}>
            Método Ciro Discepolo. Conexão descrita em prosa, dinâmica central
            e aspectos-chave.
          </div>
        </div>
        <div
          style={{
            border: `1px solid ${dirAColors.divider}`,
            padding: "20px 24px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontFamily: dirAMono,
              fontSize: 10,
              letterSpacing: "0.28em",
              color: dirAColors.gold,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Em breve · lista de espera
          </div>
          <div
            style={{
              fontFamily: dirASerif,
              fontSize: 28,
              color: dirAColors.cream,
              fontWeight: 400,
              fontStyle: "italic",
            }}
          >
            Trânsitos, retornos solares, composto
          </div>
          <div style={{ fontSize: 13, color: dirAColors.body, marginTop: 8 }}>
            Camadas pagas em desenvolvimento. Entre na lista — avisamos quando
            abrir.
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. Ask UI (conversational) ────────────────────────────────────────
function DirAAsk() {
  return (
    <div style={dirAStyles.screen}>
      <div style={dirAStyles.starfield} />
      <DirANav section="Pedir mapa" />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 0",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <div style={{ width: 680, display: "flex", flexDirection: "column", gap: 28 }}>
          {/* exchange 1 */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                background: dirAColors.surface,
                border: `1px solid ${dirAColors.dividerSoft}`,
                padding: "14px 18px",
                maxWidth: 460,
                fontSize: 15,
                lineHeight: 1.5,
                color: dirAColors.cream,
                borderRadius: 2,
              }}
            >
              Faz o meu mapa natal e manda pro Telegram com a imagem
            </div>
          </div>
          {/* system trace */}
          <div
            style={{
              fontFamily: dirAMono,
              fontSize: 11,
              color: dirAColors.muted,
              letterSpacing: "0.06em",
              borderLeft: `1px solid ${dirAColors.divider}`,
              paddingLeft: 16,
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span>resolvendo pessoa no vault → Diogo Magalhães Machado</span>
            <span>dados: 1987-12-07 · 15:03 · Rio de Janeiro · −02:00</span>
            <span>calculando · Swiss Ephemeris · Placidus</span>
            <span style={{ color: dirAColors.gold }}>interpretando ✦</span>
          </div>
          {/* exchange 2 — assistant */}
          <div style={{ display: "flex", gap: 14 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `1px solid ${dirAColors.gold}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontFamily: dirASerif,
                color: dirAColors.gold,
                fontStyle: "italic",
              }}
            >
              ✦
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: dirASerif,
                  fontSize: 22,
                  fontStyle: "italic",
                  color: dirAColors.cream,
                  lineHeight: 1.35,
                  marginBottom: 12,
                  fontWeight: 300,
                }}
              >
                Diogo, seu Sol em Capricórnio quer construir o que dura — e
                sua Lua em Câncer pede que isso tenha casa, cheiro, memória.
              </div>
              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: dirAColors.body,
                }}
              >
                Mapa pronto. Enviei o PNG no seu Telegram e salvei o markdown
                em <span style={{ color: dirAColors.gold }}>static.oraculo.network</span>.
                Quer que eu abra a leitura completa aqui?
              </div>
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <div
                  style={{
                    border: `1px solid ${dirAColors.divider}`,
                    padding: "8px 14px",
                    fontSize: 12,
                    color: dirAColors.cream,
                  }}
                >
                  Abrir leitura completa →
                </div>
                <div
                  style={{
                    border: `1px solid ${dirAColors.dividerSoft}`,
                    padding: "8px 14px",
                    fontSize: 12,
                    color: dirAColors.muted,
                  }}
                >
                  Ver no Telegram
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Composer */}
        <div style={{ flex: 1 }} />
        <div
          style={{
            width: 680,
            background: dirAColors.surface,
            border: `1px solid ${dirAColors.divider}`,
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginTop: 40,
          }}
        >
          <span
            style={{
              fontFamily: dirASerif,
              fontStyle: "italic",
              color: dirAColors.muted,
              fontSize: 15,
              flex: 1,
            }}
          >
            Faz a sinastria entre Lorena e Diogo
          </span>
          <span
            style={{
              fontFamily: dirAMono,
              fontSize: 10,
              color: dirAColors.muted,
              letterSpacing: "0.2em",
            }}
          >
            ⏎ ENVIAR
          </span>
        </div>
        <div
          style={{
            width: 680,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 11,
            color: dirAColors.muted,
            marginTop: 10,
            fontFamily: dirAMono,
            letterSpacing: "0.06em",
          }}
        >
          <span>POST /astrology/ask</span>
          <span>↑↓ para reusar perguntas anteriores</span>
        </div>
      </div>
    </div>
  );
}

// ── 3. Natal result ────────────────────────────────────────────────────
function DirANatal() {
  return (
    <div style={dirAStyles.screen}>
      <div style={dirAStyles.starfield} />
      <DirANav section="Pedir mapa" />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.05fr 1.4fr",
          gap: 56,
          padding: "44px 64px",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        {/* Left — chart + meta */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: dirAMono,
              fontSize: 10,
              letterSpacing: "0.28em",
              color: dirAColors.gold,
              textTransform: "uppercase",
            }}
          >
            Mapa natal
          </div>
          <div
            style={{
              fontFamily: dirASerif,
              fontSize: 42,
              fontWeight: 300,
              color: dirAColors.cream,
              marginTop: 4,
              lineHeight: 1.05,
            }}
          >
            Diogo Magalhães<br />Machado
          </div>
          <div
            style={{
              fontSize: 12,
              fontFamily: dirAMono,
              color: dirAColors.muted,
              marginTop: 10,
              letterSpacing: "0.06em",
              lineHeight: 1.7,
            }}
          >
            1987–12–07 · 15:03 (−02:00)<br />
            Rio de Janeiro · 22°53′S 43°21′W
          </div>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ChartWheel
              size={400}
              variant="minimal"
              palette={{
                ring: dirAColors.gold,
                text: dirAColors.cream,
                hub: "rgba(11,10,20,0.6)",
                house: "rgba(201,168,106,0.2)",
                aspect: dirAColors.gold,
              }}
            />
          </div>
          {/* Element bars */}
          <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              ["Fogo", 45, dirAColors.fire],
              ["Terra", 16, dirAColors.earth],
              ["Ar", 0, dirAColors.air],
              ["Água", 39, dirAColors.water],
            ].map(([name, pct, color]) => (
              <div key={name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 56,
                    fontFamily: dirAMono,
                    fontSize: 10,
                    color: dirAColors.muted,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    background: "rgba(244,236,216,0.08)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${pct}%`,
                      background: color,
                      opacity: 0.85,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: 36,
                    fontFamily: dirAMono,
                    fontSize: 11,
                    color: dirAColors.body,
                    textAlign: "right",
                  }}
                >
                  {pct}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — interpretation reader */}
        <div
          style={{
            paddingRight: 8,
            display: "flex",
            flexDirection: "column",
            gap: 22,
            overflow: "hidden",
          }}
        >
          {/* TOC */}
          <div
            style={{
              display: "flex",
              gap: 18,
              fontFamily: dirAMono,
              fontSize: 11,
              color: dirAColors.muted,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderBottom: `1px solid ${dirAColors.dividerSoft}`,
              paddingBottom: 14,
            }}
          >
            <span style={{ color: dirAColors.cream, borderBottom: `1px solid ${dirAColors.gold}`, paddingBottom: 10, marginBottom: -10 }}>Síntese</span>
            <span>Sol</span>
            <span>Lua</span>
            <span>Ascendente</span>
            <span>Aspectos</span>
            <span>Mc · Marte</span>
          </div>
          {/* Pull-quote opening */}
          <div
            style={{
              fontFamily: dirASerif,
              fontSize: 28,
              lineHeight: 1.3,
              fontStyle: "italic",
              fontWeight: 300,
              color: dirAColors.cream,
              paddingLeft: 22,
              borderLeft: `1px solid ${dirAColors.gold}`,
            }}
          >
            Você é uma estrutura de inverno por fora, uma maré por dentro.
            Constrói lentamente, mas é a memória que faz o trabalho durar.
          </div>
          {/* Section: Sol */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: dirASerif,
                  fontSize: 22,
                  color: dirAColors.gold,
                }}
              >
                ☉
              </span>
              <span
                style={{
                  fontFamily: dirASerif,
                  fontSize: 24,
                  fontStyle: "italic",
                  color: dirAColors.cream,
                  fontWeight: 400,
                }}
              >
                Sol em Capricórnio, casa XII
              </span>
              <span
                style={{
                  fontFamily: dirAMono,
                  fontSize: 11,
                  color: dirAColors.muted,
                  letterSpacing: "0.08em",
                }}
              >
                15°02′57″
              </span>
            </div>
            <div
              style={{
                fontSize: 14.5,
                lineHeight: 1.7,
                color: dirAColors.body,
                fontFamily: dirASerif,
                fontWeight: 400,
              }}
            >
              Há em você uma vontade que prefere o silêncio à proclamação.
              Capricórnio na XII faz da sua autoridade algo subterrâneo —
              você governa por dentro antes de aparecer por fora, e o
              reconhecimento, quando vem, sempre chega tarde demais para te
              impressionar.
            </div>
          </div>
          {/* Section: Lua */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontFamily: dirASerif,
                  fontSize: 22,
                  color: dirAColors.gold,
                }}
              >
                ☽
              </span>
              <span
                style={{
                  fontFamily: dirASerif,
                  fontSize: 24,
                  fontStyle: "italic",
                  color: dirAColors.cream,
                  fontWeight: 400,
                }}
              >
                Lua em Câncer, casa VI
              </span>
              <span
                style={{
                  fontFamily: dirAMono,
                  fontSize: 11,
                  color: dirAColors.muted,
                  letterSpacing: "0.08em",
                }}
              >
                12°06′53″
              </span>
            </div>
            <div
              style={{
                fontSize: 14.5,
                lineHeight: 1.7,
                color: dirAColors.body,
                fontFamily: dirASerif,
              }}
            >
              Sua sensibilidade é doméstica e operacional ao mesmo tempo.
              Você cuida fazendo — cozinha, organiza, lembra de datas. A
              oposição com seu Sol é a tensão que move tudo: o que constrói
              de dia, o íntimo desfaz à noite e refaz com mais ternura.
            </div>
          </div>
          {/* Footer actions */}
          <div
            style={{
              marginTop: "auto",
              borderTop: `1px solid ${dirAColors.dividerSoft}`,
              paddingTop: 18,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: dirAMono,
              fontSize: 11,
              color: dirAColors.muted,
              letterSpacing: "0.08em",
            }}
          >
            <span>SALVO EM MEMÓRIA · static.oraculo.network/astrology/diogo</span>
            <span style={{ display: "flex", gap: 18 }}>
              <span style={{ color: dirAColors.cream }}>↓ PNG</span>
              <span style={{ color: dirAColors.cream }}>↓ SVG</span>
              <span style={{ color: dirAColors.cream }}>↗ Telegram</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 4. Synastry ────────────────────────────────────────────────────────
function DirASynastry() {
  return (
    <div style={dirAStyles.screen}>
      <div style={dirAStyles.starfield} />
      <DirANav section="Sinastria" />
      <div
        style={{
          flex: 1,
          padding: "44px 80px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: dirAMono,
            fontSize: 10,
            letterSpacing: "0.28em",
            color: dirAColors.gold,
            textTransform: "uppercase",
          }}
        >
          Sinastria · método Ciro Discepolo
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 40,
            marginTop: 20,
          }}
        >
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: dirASerif,
                fontSize: 44,
                fontWeight: 300,
                color: dirAColors.cream,
                lineHeight: 1,
              }}
            >
              Lorena
            </div>
            <div
              style={{
                fontFamily: dirAMono,
                fontSize: 11,
                color: dirAColors.muted,
                marginTop: 10,
                letterSpacing: "0.08em",
              }}
            >
              ♋ Sol Câncer · ♉ Lua Touro · ♍ Asc Virgem
            </div>
          </div>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: `1px solid ${dirAColors.gold}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: dirASerif,
              fontStyle: "italic",
              fontSize: 28,
              color: dirAColors.gold,
            }}
          >
            ✦
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: dirASerif,
                fontSize: 44,
                fontWeight: 300,
                color: dirAColors.cream,
                lineHeight: 1,
              }}
            >
              Diogo
            </div>
            <div
              style={{
                fontFamily: dirAMono,
                fontSize: 11,
                color: dirAColors.muted,
                marginTop: 10,
                letterSpacing: "0.08em",
              }}
            >
              ♑ Sol Capricórnio · ♋ Lua Câncer · ♑ Asc Capricórnio
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            fontFamily: dirASerif,
            fontSize: 28,
            lineHeight: 1.35,
            fontStyle: "italic",
            fontWeight: 300,
            color: dirAColors.cream,
            paddingLeft: 26,
            borderLeft: `1px solid ${dirAColors.gold}`,
            maxWidth: 880,
          }}
        >
          O eixo Câncer–Capricórnio cruza vocês duas vezes — Sol dele oposto
          ao Sol dela, Lua dele em conjunção ao Sol dela. É a relação como
          casa: ele constrói as paredes, ela escolhe a luz.
        </div>

        <div
          style={{
            marginTop: 32,
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 28,
            fontSize: 14,
            lineHeight: 1.7,
            color: dirAColors.body,
            fontFamily: dirASerif,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: dirAMono,
                fontSize: 10,
                letterSpacing: "0.2em",
                color: dirAColors.muted,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Aspectos principais
            </div>
            ☉ ☍ ☉ — oposição luminar, polaridade que sustenta.<br />
            ☽ ☌ ☉ — a Lua dele reconhece o Sol dela.<br />
            ♀ △ ♂ — desejo em fluxo, sem pressa.<br />
            ♄ □ ☽ — compromisso que dói antes de amadurecer.
          </div>
          <div>
            <div
              style={{
                fontFamily: dirAMono,
                fontSize: 10,
                letterSpacing: "0.2em",
                color: dirAColors.muted,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Dinâmica central
            </div>
            Doméstica antes de tudo. Vocês se reconhecem na rotina, no que se
            repete e ganha sentido. A erotização aparece pela continuidade.
            Pode faltar surpresa; nunca falta retorno.
          </div>
          <div>
            <div
              style={{
                fontFamily: dirAMono,
                fontSize: 10,
                letterSpacing: "0.2em",
                color: dirAColors.muted,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              O que pedir do tempo
            </div>
            Saturno dele quadrando a Lua dela é o trabalho lento desta
            relação — anos, não meses. A maturidade afetiva entra como peso e
            como abrigo, depende de como cada um carrega o próprio inverno.
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            borderTop: `1px solid ${dirAColors.dividerSoft}`,
            paddingTop: 18,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: dirAMono,
            fontSize: 11,
            color: dirAColors.muted,
            letterSpacing: "0.08em",
          }}
        >
          <span>SALVO · static.oraculo.network/astrology/lorena-diogo</span>
          <span style={{ color: dirAColors.gold, fontStyle: "italic", fontFamily: dirASerif, letterSpacing: 0 }}>
            chart wheel da sinastria — em breve
          </span>
        </div>
      </div>
    </div>
  );
}

// ── 5. Vault ───────────────────────────────────────────────────────────
function DirAVault() {
  const people = [
    { name: "Diogo Magalhães Machado", short: "DM", meta: "1987-12-07 · 15:03 · Rio de Janeiro", signs: "♑ ☉  ♋ ☽  ♑ As", note: "Você" },
    { name: "Lorena Ávila", short: "LA", meta: "1989-07-04 · 22:14 · São Paulo", signs: "♋ ☉  ♉ ☽  ♍ As" },
    { name: "Pai — Roberto", short: "R", meta: "1955-03-21 · 06:40 · Niterói", signs: "♈ ☉  ♍ ☽  ♓ As" },
    { name: "Mãe — Cláudia", short: "C", meta: "1959-11-02 · 12:30 · Rio de Janeiro", signs: "♏ ☉  ♎ ☽  ♐ As" },
    { name: "Júlia (irmã)", short: "J", meta: "1991-08-15 · ??:?? · Rio de Janeiro", signs: "♌ ☉  — ☽  — As", incomplete: true },
    { name: "Bernardo (sócio)", short: "B", meta: "1984-05-30 · 09:00 · Belo Horizonte", signs: "♊ ☉  ♉ ☽  ♋ As" },
  ];
  return (
    <div style={dirAStyles.screen}>
      <div style={dirAStyles.starfield} />
      <DirANav section="Vault" />
      <div
        style={{
          flex: 1,
          padding: "44px 80px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                fontFamily: dirAMono,
                fontSize: 10,
                letterSpacing: "0.28em",
                color: dirAColors.gold,
                textTransform: "uppercase",
              }}
            >
              Vault — pessoas conhecidas
            </div>
            <div
              style={{
                fontFamily: dirASerif,
                fontSize: 38,
                fontWeight: 300,
                color: dirAColors.cream,
                marginTop: 6,
              }}
            >
              Seis nomes que o céu já conhece
            </div>
          </div>
          <div
            style={{
              padding: "10px 18px",
              border: `1px solid ${dirAColors.gold}`,
              color: dirAColors.gold,
              fontSize: 13,
              letterSpacing: "0.04em",
            }}
          >
            + Adicionar pessoa
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            border: `1px solid ${dirAColors.dividerSoft}`,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {people.map((p, i) => (
            <div
              key={p.name}
              style={{
                display: "grid",
                gridTemplateColumns: "44px 1.4fr 1.4fr 1fr 90px",
                gap: 20,
                alignItems: "center",
                padding: "16px 22px",
                borderTop: i === 0 ? "none" : `1px solid ${dirAColors.dividerSoft}`,
                opacity: p.incomplete ? 0.6 : 1,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  border: `1px solid ${dirAColors.divider}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: dirASerif,
                  fontStyle: "italic",
                  fontSize: 14,
                  color: dirAColors.gold,
                }}
              >
                {p.short}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: dirASerif,
                    fontSize: 19,
                    color: dirAColors.cream,
                    fontWeight: 400,
                  }}
                >
                  {p.name}
                </div>
                {p.note && (
                  <div
                    style={{
                      fontFamily: dirAMono,
                      fontSize: 10,
                      letterSpacing: "0.18em",
                      color: dirAColors.gold,
                      textTransform: "uppercase",
                      marginTop: 2,
                    }}
                  >
                    {p.note}
                  </div>
                )}
              </div>
              <div
                style={{
                  fontFamily: dirAMono,
                  fontSize: 12,
                  color: dirAColors.body,
                  letterSpacing: "0.04em",
                }}
              >
                {p.meta}
              </div>
              <div
                style={{
                  fontFamily: dirASerif,
                  fontSize: 14,
                  color: dirAColors.cream,
                  letterSpacing: "0.04em",
                }}
              >
                {p.signs}
              </div>
              <div
                style={{
                  fontFamily: dirAMono,
                  fontSize: 11,
                  color: p.incomplete ? dirAColors.fire : dirAColors.muted,
                  letterSpacing: "0.12em",
                  textAlign: "right",
                  textTransform: "uppercase",
                }}
              >
                {p.incomplete ? "Falta hora" : "Pronto"}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "auto",
            paddingTop: 18,
            fontFamily: dirAMono,
            fontSize: 11,
            color: dirAColors.muted,
            letterSpacing: "0.08em",
          }}
        >
          Pessoas no vault podem ser chamadas pelo nome em qualquer pergunta.
          Sem dados de nascimento, o Oráculo para e avisa.
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirALanding, DirAAsk, DirANatal, DirASynastry, DirAVault });
