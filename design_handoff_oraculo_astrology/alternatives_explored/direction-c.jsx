// direction-c.jsx — Pergaminho Noturno
// A two-surface aesthetic: deep night background, with the prose itself
// living on aged-paper inserts — like reading an old astrological
// manuscript by candlelight. Oxidized gold + burgundy ink, Cardo serif for
// running text, IBM Plex Mono for marginalia and captions. The chart is
// rendered as ink on cream paper inside its own framed plate.

const dirCColors = {
  night: "#0e0c08",
  nightUp: "#161310",
  inkOnNight: "#d6c08a",
  inkOnNightSoft: "#a18a5c",
  gold: "#b08542",
  goldDim: "#7c5a2a",
  burgundy: "#8a3a3a",
  burgundyDim: "#5e2828",
  paper: "#ebe1cb",
  paperShadow: "#d3c39c",
  paperEdge: "#b8a778",
  ink: "#1c140a",
  inkSoft: "#52432a",
  inkMuted: "#857255",
};

const dirCSerif = "'Cardo', 'EB Garamond', Georgia, serif";
const dirCMono = "'IBM Plex Mono', ui-monospace, monospace";
const dirCSans = "'Manrope', sans-serif";

// Reusable paper card with a subtle grain + deckled edge effect.
function PaperCard({ children, style = {}, padding = "26px 30px" }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, #ede3cd 0%, #e7dcc0 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.4) inset, 0 -1px 0 rgba(0,0,0,0.05) inset, 0 6px 22px rgba(0,0,0,0.55), 0 0 0 1px #b8a778",
        color: dirCColors.ink,
        padding,
        position: "relative",
        ...style,
      }}
    >
      {/* grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(140,100,40,0.06), transparent 40%)," +
            "radial-gradient(circle at 78% 68%, rgba(140,100,40,0.05), transparent 40%)," +
            "radial-gradient(circle at 50% 90%, rgba(120,80,30,0.07), transparent 50%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
}

const dirCStyles = {
  screen: {
    width: "100%",
    height: "100%",
    background: dirCColors.night,
    color: dirCColors.inkOnNight,
    fontFamily: dirCSerif,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
};

function DirCNav({ section = "Introito" }) {
  const items = ["Introito", "Indagar", "Sinastria", "Vault", "Conta"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 56px",
        borderBottom: `1px solid rgba(176,133,66,0.18)`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <circle cx="14" cy="14" r="12" fill="none" stroke={dirCColors.gold} strokeWidth="0.6" />
          <circle cx="14" cy="14" r="9" fill="none" stroke={dirCColors.gold} strokeWidth="0.4" opacity="0.6" />
          <path d="M 14 2 L 16 11 L 14 14 L 12 11 Z" fill={dirCColors.gold} opacity="0.7" />
          <circle cx="14" cy="14" r="1.4" fill={dirCColors.burgundy} />
        </svg>
        <div>
          <div
            style={{
              fontFamily: dirCSerif,
              fontSize: 22,
              color: dirCColors.inkOnNight,
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            Oráculo
          </div>
          <div
            style={{
              fontFamily: dirCMono,
              fontSize: 9,
              color: dirCColors.inkOnNightSoft,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              marginTop: 2,
            }}
          >
            Astrologia
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 36, fontFamily: dirCSerif, fontSize: 14.5 }}>
        {items.map((it) => (
          <span
            key={it}
            style={{
              color: it === section ? dirCColors.gold : dirCColors.inkOnNightSoft,
              fontStyle: it === section ? "italic" : "normal",
              letterSpacing: "0.04em",
            }}
          >
            {it}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ fontFamily: dirCMono, fontSize: 11, color: dirCColors.inkOnNightSoft, letterSpacing: "0.14em" }}>
          PT · <span style={{ color: dirCColors.gold }}>EN</span>
        </span>
        <div
          style={{
            padding: "6px 12px",
            border: `1px solid ${dirCColors.goldDim}`,
            color: dirCColors.gold,
            fontFamily: dirCSerif,
            fontStyle: "italic",
            fontSize: 13,
            letterSpacing: "0.04em",
          }}
        >
          Diogo
        </div>
      </div>
    </div>
  );
}

// ── 1. Landing ────────────────────────────────────────────────────────
function DirCLanding() {
  return (
    <div style={dirCStyles.screen}>
      <DirCNav section="Introito" />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 56,
          padding: "44px 64px",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: dirCMono,
              fontSize: 11,
              letterSpacing: "0.34em",
              color: dirCColors.gold,
              textTransform: "uppercase",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            ✦ <span>Liber Astrorum · MMXXVI</span>
          </div>
          <div
            style={{
              fontFamily: dirCSerif,
              fontSize: 76,
              lineHeight: 1.02,
              color: dirCColors.inkOnNight,
              letterSpacing: "-0.005em",
              marginBottom: 14,
            }}
          >
            O céu não responde<br />
            por enigmas.
          </div>
          <div
            style={{
              fontFamily: dirCSerif,
              fontStyle: "italic",
              fontSize: 30,
              color: dirCColors.gold,
              marginBottom: 28,
            }}
          >
            Responde por prosa.
          </div>
          <div
            style={{
              fontFamily: dirCSerif,
              fontSize: 17,
              lineHeight: 1.65,
              color: dirCColors.inkOnNight,
              maxWidth: 460,
              marginBottom: 32,
              opacity: 0.92,
            }}
          >
            Um oráculo conversacional para mapas natais e sinastrias em
            português. Você pergunta. Ele lê o céu, calcula com efemérides
            suíças e devolve uma leitura inteira — quente, simbólica, direta.
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <div
              style={{
                background: dirCColors.gold,
                color: dirCColors.night,
                padding: "13px 26px",
                fontFamily: dirCSerif,
                fontSize: 15,
                fontStyle: "italic",
                fontWeight: 700,
                letterSpacing: "0.02em",
              }}
            >
              Fazer meu mapa
            </div>
            <div
              style={{
                color: dirCColors.inkOnNight,
                fontFamily: dirCSerif,
                fontSize: 15,
                fontStyle: "italic",
                paddingBottom: 2,
                borderBottom: `1px solid ${dirCColors.gold}`,
              }}
            >
              Ler um exemplo →
            </div>
          </div>

          {/* tiers */}
          <div style={{ marginTop: "auto", paddingTop: 32, display: "flex", gap: 14 }}>
            {[
              { tag: "Gratuito", title: "Mapa natal", body: "Sol, Lua, Ascendente, aspectos, MC, Marte. PNG + SVG." },
              { tag: "Gratuito", title: "Sinastria", body: "Método Ciro Discepolo. Prose entre duas pessoas." },
              { tag: "Em breve", title: "Trânsitos · Composto", body: "Camadas pagas — entre na lista de espera.", warn: true },
            ].map((t) => (
              <div key={t.title} style={{ flex: 1, borderLeft: `1px solid ${t.warn ? dirCColors.burgundy : dirCColors.goldDim}`, paddingLeft: 14 }}>
                <div
                  style={{
                    fontFamily: dirCMono,
                    fontSize: 9.5,
                    letterSpacing: "0.24em",
                    color: t.warn ? dirCColors.burgundy : dirCColors.gold,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {t.tag}
                </div>
                <div style={{ fontFamily: dirCSerif, fontSize: 19, color: dirCColors.inkOnNight, lineHeight: 1.2 }}>
                  {t.title}
                </div>
                <div style={{ fontFamily: dirCSerif, fontSize: 13, color: dirCColors.inkOnNightSoft, marginTop: 6, lineHeight: 1.5 }}>
                  {t.body}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — chart plate on paper */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <PaperCard padding="22px 22px 14px" style={{ width: 380 }}>
            <div
              style={{
                fontFamily: dirCMono,
                fontSize: 9,
                letterSpacing: "0.28em",
                color: dirCColors.inkSoft,
                textTransform: "uppercase",
                textAlign: "center",
                marginBottom: 4,
              }}
            >
              Tabula Genethliaca
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 22,
                color: dirCColors.ink,
                textAlign: "center",
                fontStyle: "italic",
                marginBottom: 10,
              }}
            >
              D. M. Machado
            </div>
            <ChartWheel
              size={336}
              variant="minimal"
              palette={{
                ring: dirCColors.ink,
                text: dirCColors.ink,
                hub: "transparent",
                house: "rgba(28,20,10,0.25)",
                aspect: dirCColors.burgundy,
              }}
            />
            <div
              style={{
                fontFamily: dirCMono,
                fontSize: 9,
                letterSpacing: "0.16em",
                color: dirCColors.inkSoft,
                textAlign: "center",
                marginTop: 4,
              }}
            >
              VII·XII·MCMLXXXVII · XV·III · Rio de Janeiro
            </div>
          </PaperCard>
          <div
            style={{
              fontFamily: dirCSerif,
              fontStyle: "italic",
              color: dirCColors.inkOnNightSoft,
              fontSize: 13,
              marginTop: 16,
              letterSpacing: "0.02em",
            }}
          >
            "Tropical, casas Placidus, efeméride suíça — sem APIs externas."
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 2. Ask UI ─────────────────────────────────────────────────────────
function DirCAsk() {
  return (
    <div style={dirCStyles.screen}>
      <DirCNav section="Indagar" />
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "44px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: dirCMono,
            fontSize: 10,
            letterSpacing: "0.32em",
            color: dirCColors.gold,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          ✦ Indagação ✦
        </div>
        <div style={{ fontFamily: dirCSerif, fontStyle: "italic", fontSize: 28, color: dirCColors.inkOnNight, marginBottom: 26 }}>
          Pergunte ao Oráculo
        </div>

        <div style={{ width: 720, display: "flex", flexDirection: "column", gap: 22 }}>
          {/* user question — also on paper but with different tint */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div
              style={{
                background: dirCColors.burgundyDim,
                color: dirCColors.paper,
                padding: "12px 18px",
                fontFamily: dirCSerif,
                fontSize: 16,
                maxWidth: 520,
                boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
              }}
            >
              Faz o meu mapa natal e manda pro Telegram com a imagem
            </div>
          </div>

          {/* trace as marginalia */}
          <div
            style={{
              fontFamily: dirCMono,
              fontSize: 10.5,
              letterSpacing: "0.06em",
              color: dirCColors.inkOnNightSoft,
              lineHeight: 1.9,
              paddingLeft: 22,
              borderLeft: `1px solid ${dirCColors.goldDim}`,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>i.   resolvendo do vault → Diogo Magalhães Machado</span>
            <span>ii.  data, hora, lugar verificados</span>
            <span>iii. computando · Swiss Ephemeris · Placidus</span>
            <span style={{ color: dirCColors.gold }}>iv.  interpretando ✦</span>
          </div>

          {/* assistant reply — full paper card */}
          <PaperCard padding="22px 28px" style={{ marginTop: 4 }}>
            <div
              style={{
                fontFamily: dirCMono,
                fontSize: 9,
                letterSpacing: "0.3em",
                color: dirCColors.inkSoft,
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Responsum · Liber Diogonis
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 22,
                fontStyle: "italic",
                color: dirCColors.ink,
                lineHeight: 1.35,
                marginBottom: 10,
              }}
            >
              Diogo, seu Sol em Capricórnio quer construir o que dura — e
              sua Lua em Câncer pede que isso tenha casa, cheiro, memória.
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 14,
                lineHeight: 1.7,
                color: dirCColors.inkSoft,
                marginBottom: 14,
              }}
            >
              Mapa pronto. Enviei o PNG no seu Telegram e salvei o markdown
              em <span style={{ color: dirCColors.burgundy, fontStyle: "italic" }}>static.oraculo.network/astrology/diogo</span>.
              Quer abrir a leitura completa aqui?
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <div
                style={{
                  fontFamily: dirCSerif,
                  fontStyle: "italic",
                  fontSize: 13,
                  background: dirCColors.ink,
                  color: dirCColors.paper,
                  padding: "8px 14px",
                }}
              >
                Abrir leitura completa →
              </div>
              <div
                style={{
                  fontFamily: dirCSerif,
                  fontStyle: "italic",
                  fontSize: 13,
                  color: dirCColors.inkSoft,
                  padding: "8px 14px",
                  borderBottom: `1px solid ${dirCColors.inkSoft}`,
                }}
              >
                Ver chart no Telegram
              </div>
            </div>
          </PaperCard>
        </div>

        <div style={{ flex: 1 }} />

        {/* composer */}
        <div
          style={{
            width: 720,
            background: dirCColors.nightUp,
            border: `1px solid ${dirCColors.goldDim}`,
            display: "flex",
            alignItems: "center",
            padding: 4,
            marginTop: 24,
          }}
        >
          <span
            style={{
              flex: 1,
              padding: "12px 16px",
              fontFamily: dirCSerif,
              fontStyle: "italic",
              fontSize: 16,
              color: dirCColors.inkOnNightSoft,
            }}
          >
            Faz a sinastria entre Lorena e Diogo
          </span>
          <span style={{ fontFamily: dirCMono, fontSize: 10, color: dirCColors.inkOnNightSoft, letterSpacing: "0.18em", marginRight: 12 }}>
            ⏎
          </span>
          <div
            style={{
              padding: "10px 18px",
              background: dirCColors.gold,
              color: dirCColors.night,
              fontFamily: dirCSerif,
              fontStyle: "italic",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Indagar
          </div>
        </div>
        <div
          style={{
            width: 720,
            marginTop: 8,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: dirCMono,
            fontSize: 10,
            color: dirCColors.inkOnNightSoft,
            letterSpacing: "0.1em",
          }}
        >
          <span>POST /astrology/ask · Português</span>
          <span>Telegram conectado · @diogomm</span>
        </div>
      </div>
    </div>
  );
}

// ── 3. Natal result ───────────────────────────────────────────────────
function DirCNatal() {
  return (
    <div style={dirCStyles.screen}>
      <DirCNav section="Indagar" />
      <div
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 28,
          padding: "32px 48px",
          overflow: "hidden",
        }}
      >
        {/* Left — chart plate + meta */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div
              style={{
                fontFamily: dirCMono,
                fontSize: 10,
                letterSpacing: "0.3em",
                color: dirCColors.gold,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Tabula Genethliaca · Pars Prima
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 36,
                color: dirCColors.inkOnNight,
                lineHeight: 1.05,
              }}
            >
              Diogo Magalhães Machado
            </div>
            <div
              style={{
                fontFamily: dirCMono,
                fontSize: 10.5,
                color: dirCColors.inkOnNightSoft,
                marginTop: 6,
                letterSpacing: "0.06em",
                lineHeight: 1.7,
              }}
            >
              VII · XII · MCMLXXXVII — XV:III (−02:00)<br />
              Rio de Janeiro · 22°53′S · 43°21′W
            </div>
          </div>

          <PaperCard padding="18px">
            <ChartWheel
              size={332}
              variant="minimal"
              palette={{
                ring: dirCColors.ink,
                text: dirCColors.ink,
                hub: "transparent",
                house: "rgba(28,20,10,0.25)",
                aspect: dirCColors.burgundy,
              }}
            />
          </PaperCard>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              fontFamily: dirCMono,
              fontSize: 11,
              color: dirCColors.inkOnNight,
              letterSpacing: "0.06em",
              borderTop: `1px solid ${dirCColors.goldDim}`,
              paddingTop: 12,
            }}
          >
            {[
              ["Fogo", "45%", dirCColors.burgundy],
              ["Terra", "16%", dirCColors.gold],
              ["Ar", "0%", dirCColors.inkOnNightSoft],
              ["Água", "39%", dirCColors.gold],
            ].map(([n, v, c]) => (
              <div key={n} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: dirCSerif, fontSize: 22, color: c, fontStyle: "italic" }}>{v}</div>
                <div style={{ color: dirCColors.inkOnNightSoft, fontSize: 9.5, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>{n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — manuscript pages */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              gap: 22,
              fontFamily: dirCSerif,
              fontStyle: "italic",
              fontSize: 14,
              color: dirCColors.inkOnNightSoft,
              borderBottom: `1px solid ${dirCColors.goldDim}`,
              paddingBottom: 10,
            }}
          >
            <span style={{ color: dirCColors.gold, borderBottom: `1px solid ${dirCColors.gold}`, paddingBottom: 8, marginBottom: -8 }}>
              Síntese
            </span>
            <span>Sol</span>
            <span>Lua</span>
            <span>Ascendente</span>
            <span>Aspectos</span>
            <span>Mc · Marte</span>
          </div>

          <PaperCard padding="22px 28px">
            <div
              style={{
                fontFamily: dirCMono,
                fontSize: 9.5,
                letterSpacing: "0.3em",
                color: dirCColors.inkSoft,
                textTransform: "uppercase",
              }}
            >
              Cap. I · Síntese
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.35,
                color: dirCColors.ink,
                marginTop: 8,
              }}
            >
              Você é uma estrutura de inverno por fora, uma maré por dentro.
              Constrói lentamente, mas é a memória que faz o trabalho durar.
            </div>
          </PaperCard>

          <PaperCard padding="22px 28px">
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: dirCMono,
                  fontSize: 9.5,
                  letterSpacing: "0.3em",
                  color: dirCColors.inkSoft,
                  textTransform: "uppercase",
                }}
              >
                Cap. II
              </span>
              <span style={{ fontFamily: dirCSerif, fontSize: 22, color: dirCColors.burgundy, fontStyle: "italic" }}>
                ☉ Sol em Capricórnio, casa XII
              </span>
              <span style={{ fontFamily: dirCMono, fontSize: 10, color: dirCColors.inkMuted, marginLeft: "auto", letterSpacing: "0.06em" }}>
                15°02′57″
              </span>
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 15,
                lineHeight: 1.75,
                color: dirCColors.inkSoft,
                marginTop: 10,
              }}
            >
              Há em você uma vontade que prefere o silêncio à proclamação.
              Capricórnio na XII faz da sua autoridade algo subterrâneo —
              você governa por dentro antes de aparecer por fora, e o
              reconhecimento, quando vem, sempre chega tarde demais para te
              impressionar.
            </div>
          </PaperCard>

          <PaperCard padding="22px 28px">
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span
                style={{
                  fontFamily: dirCMono,
                  fontSize: 9.5,
                  letterSpacing: "0.3em",
                  color: dirCColors.inkSoft,
                  textTransform: "uppercase",
                }}
              >
                Cap. III
              </span>
              <span style={{ fontFamily: dirCSerif, fontSize: 22, color: dirCColors.burgundy, fontStyle: "italic" }}>
                ☽ Lua em Câncer, casa VI
              </span>
              <span style={{ fontFamily: dirCMono, fontSize: 10, color: dirCColors.inkMuted, marginLeft: "auto", letterSpacing: "0.06em" }}>
                12°06′53″
              </span>
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 15,
                lineHeight: 1.75,
                color: dirCColors.inkSoft,
                marginTop: 10,
              }}
            >
              Sua sensibilidade é doméstica e operacional ao mesmo tempo.
              Você cuida fazendo. A oposição com seu Sol é a tensão que move
              tudo — o que constrói de dia, o íntimo desfaz à noite.
            </div>
          </PaperCard>

          <div
            style={{
              marginTop: "auto",
              display: "flex",
              justifyContent: "space-between",
              fontFamily: dirCMono,
              fontSize: 10,
              color: dirCColors.inkOnNightSoft,
              letterSpacing: "0.1em",
            }}
          >
            <span>SALVO · static.oraculo.network/astrology/diogo</span>
            <span style={{ display: "flex", gap: 18 }}>
              <span style={{ color: dirCColors.gold }}>↓ PNG</span>
              <span style={{ color: dirCColors.gold }}>↓ SVG</span>
              <span style={{ color: dirCColors.gold }}>↗ TELEGRAM</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── 4. Synastry ───────────────────────────────────────────────────────
function DirCSynastry() {
  return (
    <div style={dirCStyles.screen}>
      <DirCNav section="Sinastria" />
      <div
        style={{
          flex: 1,
          padding: "40px 64px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontFamily: dirCMono,
            fontSize: 10,
            letterSpacing: "0.32em",
            color: dirCColors.gold,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          ✦ Liber Synastriae · Método Ciro Discepolo ✦
        </div>
        <div
          style={{
            fontFamily: dirCSerif,
            fontSize: 44,
            fontStyle: "italic",
            color: dirCColors.inkOnNight,
            textAlign: "center",
            marginTop: 10,
            lineHeight: 1.05,
          }}
        >
          Lorena <span style={{ color: dirCColors.gold, fontStyle: "normal" }}>×</span> Diogo
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginTop: 28,
          }}
        >
          <PaperCard padding="20px 24px">
            <div style={{ fontFamily: dirCMono, fontSize: 9.5, color: dirCColors.inkSoft, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Persona prima
            </div>
            <div style={{ fontFamily: dirCSerif, fontSize: 26, color: dirCColors.ink, fontStyle: "italic", marginTop: 2 }}>
              Lorena Ávila
            </div>
            <div style={{ fontFamily: dirCMono, fontSize: 10.5, color: dirCColors.inkMuted, marginTop: 6, letterSpacing: "0.04em" }}>
              IV · VII · MCMLXXXIX — XXII:XIV · São Paulo
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 24,
                color: dirCColors.burgundy,
                marginTop: 14,
                letterSpacing: "0.08em",
              }}
            >
              ☉ ♋ &nbsp; ☽ ♉ &nbsp; As ♍
            </div>
          </PaperCard>
          <PaperCard padding="20px 24px">
            <div style={{ fontFamily: dirCMono, fontSize: 9.5, color: dirCColors.inkSoft, letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Persona altera
            </div>
            <div style={{ fontFamily: dirCSerif, fontSize: 26, color: dirCColors.ink, fontStyle: "italic", marginTop: 2 }}>
              Diogo Magalhães
            </div>
            <div style={{ fontFamily: dirCMono, fontSize: 10.5, color: dirCColors.inkMuted, marginTop: 6, letterSpacing: "0.04em" }}>
              VII · XII · MCMLXXXVII — XV:III · Rio de Janeiro
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 24,
                color: dirCColors.burgundy,
                marginTop: 14,
                letterSpacing: "0.08em",
              }}
            >
              ☉ ♑ &nbsp; ☽ ♋ &nbsp; As ♑
            </div>
          </PaperCard>
        </div>

        {/* Connection prose — long manuscript */}
        <PaperCard padding="28px 36px" style={{ marginTop: 22 }}>
          <div
            style={{
              fontFamily: dirCMono,
              fontSize: 9.5,
              color: dirCColors.inkSoft,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            De Coniunctione · qualidade da conexão
          </div>
          <div
            style={{
              fontFamily: dirCSerif,
              fontStyle: "italic",
              fontSize: 22,
              lineHeight: 1.4,
              color: dirCColors.ink,
              textAlign: "center",
              marginTop: 10,
            }}
          >
            O eixo Câncer–Capricórnio cruza vocês duas vezes — Sol dele oposto
            ao Sol dela, Lua dele em conjunção ao Sol dela.<br />
            <span style={{ color: dirCColors.burgundy }}>
              É a relação como casa: ele constrói as paredes, ela escolhe a luz.
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 24,
              marginTop: 20,
              fontFamily: dirCSerif,
              fontSize: 14,
              lineHeight: 1.7,
              color: dirCColors.inkSoft,
            }}
          >
            <div>
              <div style={{ fontFamily: dirCMono, fontSize: 9.5, letterSpacing: "0.24em", textTransform: "uppercase", color: dirCColors.burgundy, marginBottom: 6 }}>
                i · Aspectos
              </div>
              ☉ ☍ ☉ — oposição luminar.<br />
              ☽ ☌ ☉ — Lua dele reconhece o Sol dela.<br />
              ♀ △ ♂ — desejo em fluxo.<br />
              ♄ □ ☽ — peso e tempo.
            </div>
            <div>
              <div style={{ fontFamily: dirCMono, fontSize: 9.5, letterSpacing: "0.24em", textTransform: "uppercase", color: dirCColors.burgundy, marginBottom: 6 }}>
                ii · Núcleo
              </div>
              Doméstica antes de tudo. Vocês se reconhecem na rotina, no que
              se repete e ganha sentido. A erotização aparece pela
              continuidade.
            </div>
            <div>
              <div style={{ fontFamily: dirCMono, fontSize: 9.5, letterSpacing: "0.24em", textTransform: "uppercase", color: dirCColors.burgundy, marginBottom: 6 }}>
                iii · Tempo
              </div>
              Saturno dele quadrando a Lua dela é o trabalho lento desta
              relação — anos, não meses. Maturidade afetiva como peso e como
              abrigo.
            </div>
          </div>
        </PaperCard>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 16,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: dirCMono,
            fontSize: 10,
            color: dirCColors.inkOnNightSoft,
            letterSpacing: "0.1em",
          }}
        >
          <span>SALVO · static.oraculo.network/astrology/lorena-diogo</span>
          <span style={{ color: dirCColors.gold, fontStyle: "italic", fontFamily: dirCSerif, letterSpacing: 0, fontSize: 13 }}>
            wheel da sinastria — em breve
          </span>
        </div>
      </div>
    </div>
  );
}

// ── 5. Vault ──────────────────────────────────────────────────────────
function DirCVault() {
  const people = [
    { n: "Diogo Magalhães Machado", k: "D", you: true, meta: "VII · XII · MCMLXXXVII · 15:03 · Rio de Janeiro", signs: "☉♑ ☽♋ As♑" },
    { n: "Lorena Ávila", k: "L", meta: "IV · VII · MCMLXXXIX · 22:14 · São Paulo", signs: "☉♋ ☽♉ As♍" },
    { n: "Roberto (pai)", k: "R", meta: "XXI · III · MCMLV · 06:40 · Niterói", signs: "☉♈ ☽♍ As♓" },
    { n: "Cláudia (mãe)", k: "C", meta: "II · XI · MCMLIX · 12:30 · Rio de Janeiro", signs: "☉♏ ☽♎ As♐" },
    { n: "Júlia (irmã)", k: "J", meta: "XV · VIII · MCMXCI · sem hora · Rio de Janeiro", signs: "☉♌ ☽— As—", warn: true },
    { n: "Bernardo (sócio)", k: "B", meta: "XXX · V · MCMLXXXIV · 09:00 · Belo Horizonte", signs: "☉♊ ☽♉ As♋" },
  ];
  return (
    <div style={dirCStyles.screen}>
      <DirCNav section="Vault" />
      <div
        style={{
          flex: 1,
          padding: "40px 64px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div>
            <div
              style={{
                fontFamily: dirCMono,
                fontSize: 10,
                letterSpacing: "0.32em",
                color: dirCColors.gold,
                textTransform: "uppercase",
              }}
            >
              ✦ Index Personarum
            </div>
            <div
              style={{
                fontFamily: dirCSerif,
                fontSize: 36,
                color: dirCColors.inkOnNight,
                marginTop: 4,
                fontStyle: "italic",
              }}
            >
              Vault — seis nomes
            </div>
          </div>
          <div
            style={{
              padding: "10px 18px",
              background: dirCColors.gold,
              color: dirCColors.night,
              fontFamily: dirCSerif,
              fontStyle: "italic",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            + Adicionar pessoa
          </div>
        </div>

        <PaperCard padding="0" style={{ marginTop: 26 }}>
          {people.map((p, i) => (
            <div
              key={p.n}
              style={{
                display: "grid",
                gridTemplateColumns: "48px 1.4fr 1.6fr 1fr 90px",
                gap: 18,
                alignItems: "center",
                padding: "16px 26px",
                borderTop: i === 0 ? "none" : `1px solid rgba(28,20,10,0.12)`,
                background: p.you ? "rgba(176,133,66,0.08)" : "transparent",
                opacity: p.warn ? 0.7 : 1,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: dirCColors.ink,
                  color: dirCColors.paper,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: dirCSerif,
                  fontStyle: "italic",
                  fontSize: 16,
                }}
              >
                {p.k}
              </div>
              <div>
                <div style={{ fontFamily: dirCSerif, fontSize: 19, color: dirCColors.ink }}>{p.n}</div>
                {p.you && (
                  <div style={{ fontFamily: dirCMono, fontSize: 9.5, color: dirCColors.gold, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 2 }}>
                    Tu
                  </div>
                )}
              </div>
              <div style={{ fontFamily: dirCMono, fontSize: 11, color: dirCColors.inkMuted, letterSpacing: "0.04em" }}>
                {p.meta}
              </div>
              <div style={{ fontFamily: dirCSerif, fontSize: 17, color: dirCColors.burgundy, letterSpacing: "0.06em" }}>
                {p.signs}
              </div>
              <div
                style={{
                  fontFamily: dirCMono,
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  textAlign: "right",
                  color: p.warn ? dirCColors.burgundy : dirCColors.inkSoft,
                }}
              >
                {p.warn ? "Falta hora" : "Pronto"}
              </div>
            </div>
          ))}
        </PaperCard>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 18,
            fontFamily: dirCSerif,
            fontStyle: "italic",
            fontSize: 14,
            color: dirCColors.inkOnNightSoft,
            textAlign: "center",
          }}
        >
          "Sem nascimento conhecido, o oráculo se cala. O céu não inventa quem
          ele não conheceu."
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { DirCLanding, DirCAsk, DirCNatal, DirCSynastry, DirCVault });
