// prototype-chat.jsx — streaming + result cards.
// No more performative trace lines — one pulsing "lendo seu céu" beat, then
// the opener streams, then the body, then the chart card appears with its
// own choreographed reveal. The full natal interpretation expands *inline*
// when requested (no modal).

function StreamingExchange({ message, onDone }) {
  const [phase, setPhase] = React.useState("warmup"); // 'warmup' | 'opener' | 'body' | 'done'
  const [openerText, setOpenerText] = React.useState("");
  const [bodyText, setBodyText] = React.useState("");

  React.useEffect(() => {
    const cancels = [];
    // 1. Brief warmup pulse (~1.4s) — the only "we're working" moment.
    const t = setTimeout(() => {
      setPhase("opener");
      cancels.push(
        streamText(
          message.opener,
          setOpenerText,
          () => {
            setPhase("body");
            cancels.push(
              streamText(
                message.body,
                setBodyText,
                () => {
                  setPhase("done");
                  onDone && onDone();
                },
                { chunkSize: 6, intervalMs: 24 }
              )
            );
          },
          { chunkSize: 3, intervalMs: 30 }
        )
      );
    }, 1400);
    cancels.push(() => clearTimeout(t));
    return () => cancels.forEach((c) => c && c());
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ display: "flex", gap: 14, marginTop: 22 }}>
      <AssistantAvatar />
      <div style={{ flex: 1, minWidth: 0 }}>
        {phase === "warmup" && <WarmupPulse />}

        {phase !== "warmup" && (
          <div
            style={{
              fontFamily: oraFont.serif,
              fontSize: 22,
              lineHeight: 1.4,
              color: oraColors.text,
              marginBottom: 14,
              fontStyle: "italic",
            }}
          >
            <span style={{ color: oraColors.air }}>
              {message.openerFirst || ""}
            </span>
            {openerText.slice((message.openerFirst || "").length)}
            {phase === "opener" && <Caret />}
          </div>
        )}

        {(phase === "body" || phase === "done") && (
          <div
            style={{
              fontFamily: oraFont.serif,
              fontSize: 15,
              lineHeight: 1.7,
              color: oraColors.text,
              opacity: 0.9,
              marginBottom: 14,
              whiteSpace: "pre-wrap",
            }}
          >
            {bodyText}
            {phase === "body" && <Caret />}
          </div>
        )}

        {phase === "done" && message.result && (
          <div style={{ animation: "fadeUpOraculo .4s ease" }}>
            {message.result}
          </div>
        )}
      </div>
    </div>
  );
}

function WarmupPulse() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontFamily: oraFont.serif,
        fontStyle: "italic",
        fontSize: 17,
        color: oraColors.textMuted,
        padding: "8px 0",
        animation: "fadeUpOraculo .3s ease",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: oraColors.fire,
          animation: "pulseOraculo 1.3s ease-in-out infinite",
        }}
      />
      Lendo seu céu…
    </div>
  );
}

function AssistantAvatar() {
  return (
    <div
      style={{
        width: 30,
        height: 30,
        background: oraColors.fire,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: oraFont.serif,
        color: oraColors.bgDeep,
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      O
    </div>
  );
}

function Caret() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 8,
        height: "1em",
        background: oraColors.fire,
        marginLeft: 3,
        verticalAlign: "text-bottom",
        animation: "caretBlink 0.9s steps(2) infinite",
      }}
    />
  );
}

// ── Natal result — chart card + inline-expandable full reading ───────
function NatalResultCard({ me, onSendTelegram, reveal = true }) {
  const [expanded, setExpanded] = React.useState(false);
  return (
    <div
      style={{
        background: oraColors.card,
        border: `1px solid ${oraColors.divider}`,
        padding: 18,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 22 }}>
        <ChartWheel
          size={220}
          variant="kerykeion"
          reveal={reveal}
          palette={{
            ring: "rgba(232,216,168,0.4)",
            text: oraColors.text,
            hub: oraColors.bgDeep,
            house: "rgba(232,216,168,0.2)",
            fire: oraColors.fire,
            earth: oraColors.earth,
            air: oraColors.air,
            water: oraColors.water,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: oraFont.mono,
              fontSize: 10,
              color: oraColors.fire,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Mapa natal · {me.name}
          </div>
          <div
            style={{
              fontFamily: oraFont.serif,
              fontSize: 22,
              color: oraColors.text,
              marginTop: 4,
              marginBottom: 12,
              letterSpacing: "0.04em",
            }}
          >
            {me.sun} Sol · {me.moon} Lua · {me.asc} Ascendente
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 4,
              marginBottom: 16,
            }}
          >
            {[
              ["Fogo", 45, oraColors.fire],
              ["Terra", 16, oraColors.earth],
              ["Ar", 0, oraColors.air],
              ["Água", 39, oraColors.water],
            ].map(([n, pct, c]) => (
              <div key={n}>
                <div
                  style={{
                    fontFamily: oraFont.mono,
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: oraColors.textMuted,
                    textTransform: "uppercase",
                  }}
                >
                  {n}
                </div>
                <div
                  style={{
                    fontFamily: oraFont.serif,
                    fontSize: 18,
                    fontStyle: "italic",
                    color: c,
                  }}
                >
                  {pct}%
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <ActionChip onClick={() => setExpanded(!expanded)}>
              {expanded ? "Recolher leitura ↑" : "Abrir leitura completa →"}
            </ActionChip>
            <ActionChip onClick={onSendTelegram} subtle>↗ Telegram</ActionChip>
            <ActionChip subtle>↓ PNG</ActionChip>
            <ActionChip subtle>↓ SVG</ActionChip>
            <ActionChip subtle>⎘ Markdown</ActionChip>
          </div>
        </div>
      </div>

      {expanded && <InlineReading />}
    </div>
  );
}

// The "open completa" expansion: same content the old modal had, now inline.
function InlineReading() {
  return (
    <div
      style={{
        marginTop: 18,
        paddingTop: 18,
        borderTop: `1px solid ${oraColors.dividerSoft}`,
        animation: "fadeUpOraculo .35s ease",
      }}
    >
      <div
        style={{
          fontFamily: oraFont.serif,
          fontStyle: "italic",
          fontSize: 20,
          lineHeight: 1.4,
          color: oraColors.text,
          borderLeft: `2px solid ${oraColors.fire}`,
          paddingLeft: 14,
          marginBottom: 22,
        }}
      >
        Capricórnio que constrói por dentro, Câncer que sente por fora.
        Sem Ar em casa nenhuma, o pensamento entra pela ação.
      </div>
      {NATAL_FULL_SECTIONS.map((s, i) => (
        <div
          key={s.title}
          style={{
            marginBottom: 18,
            animation: `fadeUpOraculo .4s ${0.08 * i}s both`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              marginBottom: 6,
            }}
          >
            <span
              style={{
                color: oraColors[s.color],
                fontFamily: oraFont.serif,
                fontSize: 22,
              }}
            >
              {s.glyph}
            </span>
            <span
              style={{
                fontFamily: oraFont.serif,
                fontSize: 17,
                color: oraColors.text,
              }}
            >
              {s.title}
            </span>
            <span
              style={{
                fontFamily: oraFont.mono,
                fontSize: 11,
                color: oraColors.textMuted,
                marginLeft: "auto",
                letterSpacing: "0.06em",
              }}
            >
              {s.deg}
            </span>
          </div>
          <div
            style={{
              fontFamily: oraFont.serif,
              fontSize: 14.5,
              lineHeight: 1.75,
              color: oraColors.text,
              opacity: 0.9,
            }}
          >
            {s.body}
          </div>
        </div>
      ))}
      <div
        style={{
          marginTop: 6,
          paddingTop: 14,
          borderTop: `1px solid ${oraColors.dividerSoft}`,
          fontFamily: oraFont.mono,
          fontSize: 10,
          color: oraColors.textDim,
          letterSpacing: "0.12em",
        }}
      >
        SALVO EM MEMÓRIA · static.oraculo.network/astrology
      </div>
    </div>
  );
}

function SinastryResultCard({ a, b }) {
  return (
    <div
      style={{
        background: oraColors.card,
        border: `1px solid ${oraColors.divider}`,
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          fontFamily: oraFont.mono,
          fontSize: 10,
          color: oraColors.fire,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Sinastria · {a.short} × {b.short}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          marginBottom: 14,
        }}
      >
        {[a, b].map((p) => (
          <div
            key={p.id}
            style={{
              padding: "12px 14px",
              background: oraColors.bgDeep,
              border: `1px solid ${oraColors.dividerSoft}`,
            }}
          >
            <div
              style={{
                fontFamily: oraFont.serif,
                fontSize: 17,
                color: oraColors.text,
              }}
            >
              {p.name}
            </div>
            <div
              style={{
                fontFamily: oraFont.serif,
                fontSize: 22,
                color: oraColors[p.color] || oraColors.earth,
                marginTop: 6,
                letterSpacing: "0.06em",
              }}
            >
              ☉{p.sun} ☽{p.moon} As{p.asc}
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: 16,
          fontFamily: oraFont.mono,
          fontSize: 11,
          color: oraColors.text,
        }}
      >
        <div>
          ☉ <span style={{ color: oraColors.square }}>☍</span> ☉
        </div>
        <div>
          ☽ <span style={{ color: oraColors.conj }}>☌</span> ☉
        </div>
        <div>
          ♀ <span style={{ color: oraColors.trine }}>△</span> ♂
        </div>
        <div>
          ♄ <span style={{ color: oraColors.square }}>□</span> ☽
        </div>
        <div
          style={{
            marginLeft: "auto",
            color: oraColors.textMuted,
            fontStyle: "italic",
            fontFamily: oraFont.serif,
          }}
        >
          (chart wheel — em breve)
        </div>
      </div>
    </div>
  );
}

function ActionChip({ children, subtle, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 12px",
        border: `1px solid ${subtle ? oraColors.dividerSoft : oraColors.fire}`,
        background: "transparent",
        color: subtle ? oraColors.text : oraColors.fire,
        fontFamily: oraFont.mono,
        fontSize: 10.5,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

Object.assign(window, {
  StreamingExchange,
  NatalResultCard,
  SinastryResultCard,
  ActionChip,
  Caret,
  AssistantAvatar,
});
