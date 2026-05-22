// prototype-app.jsx — top-level shell + chat. Pared way down: no sidebar,
// no Pessoas tab, no magic-link step. Single conversation, today's sky
// always in view, and an inline "confirme seu contato" banner that fades
// out when the user marks it confirmed.

function App() {
  const [view, setView] = React.useState("landing");
  const [me, setMe] = React.useState(null);
  const [pessoas, setPessoas] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const [pendingPerson, setPendingPerson] = React.useState(null);
  const [autoTriggered, setAutoTriggered] = React.useState(false);

  // Auto-dispatch the user's first natal reading once they land in the app.
  React.useEffect(() => {
    if (view === "app" && !autoTriggered && me) {
      const t = setTimeout(() => {
        setAutoTriggered(true);
        setMessages([
          { role: "user", text: "Faz meu mapa natal", _id: "u-auto" },
          { ...buildNatalStream(me), _id: "a-auto" },
        ]);
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [view, me, autoTriggered]);

  const append = (msg) =>
    setMessages((m) => [...m, { ...msg, _id: msg._id || "m-" + Math.random() }]);

  const finishStream = (id) =>
    setMessages((m) => m.map((x) => (x._id === id ? { ...x, streamed: true } : x)));

  const sendMessage = (text) => {
    if (!text.trim() || pendingPerson) return;
    const intent = detectIntent(text);

    if (intent.kind === "sinastry" && intent.other) {
      const known = pessoas.find(
        (p) => p.short.toLowerCase() === intent.other.toLowerCase()
      );
      if (!known) {
        append({ role: "user", text });
        append({
          role: "assistant",
          isStatic: true,
          stub: { kind: "ask-person-data", name: intent.other },
        });
        setPendingPerson({ name: intent.other });
        return;
      }
      append({ role: "user", text });
      append(buildSinastryStream(me, known));
      return;
    }

    append({ role: "user", text });
    append(buildNatalStream(me));
  };

  const addPersonAndContinue = (p) => {
    setPessoas((ps) => [...ps, p]);
    setPendingPerson(null);
    append(buildSinastryStream(me, p));
  };

  // Routing
  if (view === "landing") {
    return <Landing onStart={() => setView("onboarding")} />;
  }
  if (view === "onboarding") {
    return (
      <Onboarding
        onComplete={(person) => {
          setMe(person);
          setView("app");
        }}
      />
    );
  }

  // App
  return (
    <div
      style={{
        height: "100vh",
        background: oraColors.bg,
        color: oraColors.text,
        fontFamily: oraFont.serif,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AppHeader
        me={me}
        onChannels={() => setModal({ kind: "channels" })}
      />
      {me && !me.contactVerified && (
        <ConfirmBanner
          me={me}
          onConfirmed={() =>
            setMe((m) => ({ ...m, contactVerified: true }))
          }
        />
      )}
      <ChatView
        me={me}
        pessoas={pessoas}
        messages={messages}
        onSend={sendMessage}
        onFinishStream={finishStream}
        onSendTelegram={() => setModal({ kind: "telegram" })}
        pendingPerson={pendingPerson}
        onAddPerson={addPersonAndContinue}
        onCancelPending={() => setPendingPerson(null)}
        autoTriggered={autoTriggered}
      />

      {modal?.kind === "telegram" && (
        <TelegramPreviewModal onClose={() => setModal(null)} me={me} />
      )}
      {modal?.kind === "channels" && (
        <ChannelsModal me={me} onClose={() => setModal(null)} />
      )}
    </div>
  );
}

// ── Top chrome ───────────────────────────────────────────────────────
function AppHeader({ me, onChannels }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "14px 28px",
        background: oraColors.bgDeep,
        borderBottom: `1px solid ${oraColors.divider}`,
        position: "relative",
        zIndex: 10,
      }}
    >
      <OraculoLogo />
      <TodaySkyMini />
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 12, position: "relative" }}>
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: `1px solid ${oraColors.dividerSoft}`,
            padding: "5px 10px 5px 5px",
            cursor: "pointer",
            color: oraColors.text,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              background: oraColors[me.color] || oraColors.earth,
              color: oraColors.bgDeep,
              fontFamily: oraFont.serif,
              fontSize: 13,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {me.initial}
          </span>
          <span style={{ fontFamily: oraFont.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {me.short}
          </span>
          <span style={{ color: oraColors.textDim, fontFamily: oraFont.mono, fontSize: 10 }}>▾</span>
        </button>
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              right: 0,
              minWidth: 220,
              background: oraColors.card,
              border: `1px solid ${oraColors.divider}`,
              padding: 4,
              zIndex: 30,
              animation: "fadeUpOraculo .15s ease",
            }}
            onMouseLeave={() => setMenuOpen(false)}
          >
            <MenuRow
              label="Canais de entrega"
              meta="Email · Telegram · WhatsApp"
              onClick={() => {
                setMenuOpen(false);
                onChannels();
              }}
            />
            <MenuRow
              label="Meu mapa"
              meta={me.date + " · " + me.time}
              onClick={() => setMenuOpen(false)}
            />
            <MenuRow
              label="Sair"
              meta=""
              danger
              onClick={() => setMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function MenuRow({ label, meta, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        background: "transparent",
        border: "none",
        padding: "10px 12px",
        textAlign: "left",
        cursor: "pointer",
        color: danger ? oraColors.fire : oraColors.text,
        fontFamily: oraFont.serif,
        fontSize: 14,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = oraColors.surface;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <div>{label}</div>
      {meta && (
        <div
          style={{
            fontFamily: oraFont.mono,
            fontSize: 10,
            color: oraColors.textDim,
            letterSpacing: "0.06em",
            marginTop: 2,
          }}
        >
          {meta}
        </div>
      )}
    </button>
  );
}

function ConfirmBanner({ me, onConfirmed }) {
  const [sent, setSent] = React.useState(false);
  return (
    <div
      style={{
        background: "rgba(214,92,92,0.08)",
        borderBottom: `1px solid ${oraColors.fireSoft}`,
        padding: "8px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: oraFont.mono,
        fontSize: 11,
        color: oraColors.text,
        letterSpacing: "0.06em",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ color: oraColors.fire, letterSpacing: "0.22em", textTransform: "uppercase" }}>
          ✦ Não confirmado
        </span>
        <span style={{ color: oraColors.textMuted, fontFamily: oraFont.serif, fontStyle: "italic", letterSpacing: 0, fontSize: 13 }}>
          Você já está dentro — mas confirma seu {me.contactKind === "phone" ? "telefone" : "email"} pra não perder esse mapa.
        </span>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {!sent ? (
          <button
            onClick={() => setSent(true)}
            style={{
              padding: "6px 12px",
              background: "transparent",
              border: `1px solid ${oraColors.fire}`,
              color: oraColors.fire,
              fontFamily: oraFont.mono,
              fontSize: 10,
              letterSpacing: "0.2em",
              cursor: "pointer",
              textTransform: "uppercase",
            }}
          >
            Reenviar link
          </button>
        ) : (
          <span style={{ color: oraColors.trine, fontFamily: oraFont.mono, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            ✓ Enviado pra {me.contact}
          </span>
        )}
        <button
          onClick={onConfirmed}
          style={{
            padding: "6px 12px",
            background: oraColors.fire,
            color: oraColors.bgDeep,
            border: "none",
            fontFamily: oraFont.mono,
            fontSize: 10,
            letterSpacing: "0.2em",
            cursor: "pointer",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          Já confirmei
        </button>
      </div>
    </div>
  );
}

// ── Stream builders (extracted from App for clarity) ─────────────────
function buildNatalStream(person) {
  return {
    role: "assistant",
    stream: {
      openerFirst: person.short + ",",
      opener:
        person.short +
        ", seu Sol em Capricórnio quer construir o que dura — e sua Lua em Câncer pede que isso tenha casa, cheiro, memória.",
      body: NATAL_BODY,
      resultKind: "natal",
      resultPerson: person,
    },
  };
}

function buildSinastryStream(a, b) {
  return {
    role: "assistant",
    stream: {
      openerFirst: "",
      opener: SINASTRY_OPENER,
      body: SINASTRY_BODY,
      resultKind: "sinastry",
      resultA: a,
      resultB: b,
    },
  };
}

// ── Chat view ────────────────────────────────────────────────────────
function ChatView({
  me,
  pessoas,
  messages,
  onSend,
  onFinishStream,
  onSendTelegram,
  pendingPerson,
  onAddPerson,
  onCancelPending,
  autoTriggered,
}) {
  const [composer, setComposer] = React.useState("");
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const submit = (text) => {
    onSend(text);
    setComposer("");
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        ref={scrollRef}
        style={{ flex: 1, overflowY: "auto", padding: "32px 0 24px" }}
      >
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 32px" }}>
          {messages.length === 0 && !autoTriggered && <WelcomeIntro me={me} />}

          {messages.map((m) => {
            if (m.role === "user") {
              return (
                <div
                  key={m._id}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: 22,
                  }}
                >
                  <div
                    style={{
                      background: oraColors.fire,
                      color: oraColors.bgDeep,
                      padding: "12px 16px",
                      maxWidth: 520,
                      fontFamily: oraFont.serif,
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            }
            if (m.isStatic && m.stub?.kind === "ask-person-data") {
              return (
                <AskPersonInline
                  key={m._id}
                  name={m.stub.name}
                  onCancel={onCancelPending}
                  onSubmit={(p) => onAddPerson(p)}
                />
              );
            }
            if (m.stream && !m.streamed) {
              return (
                <StreamingExchange
                  key={m._id}
                  message={{
                    openerFirst: m.stream.openerFirst,
                    opener: m.stream.opener,
                    body: m.stream.body,
                    result:
                      m.stream.resultKind === "natal" ? (
                        <NatalResultCard
                          me={m.stream.resultPerson}
                          onSendTelegram={onSendTelegram}
                        />
                      ) : (
                        <SinastryResultCard a={m.stream.resultA} b={m.stream.resultB} />
                      ),
                  }}
                  onDone={() => onFinishStream(m._id)}
                />
              );
            }
            return (
              <StaticAssistantBlock
                key={m._id}
                stream={m.stream}
                onSendTelegram={onSendTelegram}
              />
            );
          })}

          {messages.length > 0 &&
            messages[messages.length - 1].streamed &&
            !pendingPerson && <NextStepsHints me={me} onPick={submit} />}
        </div>
      </div>
      <Composer
        value={composer}
        onChange={setComposer}
        onSubmit={submit}
        disabled={!!pendingPerson}
      />
    </div>
  );
}

function WelcomeIntro({ me }) {
  return (
    <div
      style={{
        padding: "40px 0",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        animation: "fadeUpOraculo .35s ease",
      }}
    >
      <div
        style={{
          fontFamily: oraFont.mono,
          fontSize: 10,
          letterSpacing: "0.32em",
          color: oraColors.fire,
          textTransform: "uppercase",
        }}
      >
        ✦ Bem-vindo
      </div>
      <div
        style={{
          fontFamily: oraFont.serif,
          fontSize: 44,
          lineHeight: 1.05,
          color: oraColors.text,
          fontWeight: 400,
        }}
      >
        Pronto, {me.short}.{" "}
        <span style={{ fontStyle: "italic", color: oraColors.air }}>
          O céu já te conhece.
        </span>
      </div>
      <div
        style={{
          marginTop: 4,
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontFamily: oraFont.mono,
          fontSize: 11,
          letterSpacing: "0.18em",
          color: oraColors.textMuted,
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: oraColors.fire,
            animation: "pulseOraculo 1.4s ease-in-out infinite",
          }}
        />
        Preparando seu mapa natal…
      </div>
    </div>
  );
}

function NextStepsHints({ me, onPick }) {
  const hints = [
    "Comparar meu mapa com outra pessoa (sinastria)",
    "Como o céu de hoje me afeta?",
    "Falar mais sobre meu Marte",
  ];
  return (
    <div
      style={{
        marginTop: 28,
        paddingTop: 18,
        borderTop: `1px solid ${oraColors.dividerSoft}`,
        animation: "fadeUpOraculo .5s ease",
      }}
    >
      <div
        style={{
          fontFamily: oraFont.mono,
          fontSize: 10,
          letterSpacing: "0.22em",
          color: oraColors.textDim,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        Onde ir agora
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {hints.map((h) => (
          <button
            key={h}
            onClick={() => onPick(h)}
            style={{
              padding: "9px 14px",
              background: "transparent",
              border: `1px solid ${oraColors.dividerSoft}`,
              color: oraColors.text,
              fontFamily: oraFont.serif,
              fontSize: 14,
              fontStyle: "italic",
              cursor: "pointer",
              transition: "border-color .12s, background .12s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = oraColors.fire;
              e.currentTarget.style.background = oraColors.card;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = oraColors.dividerSoft;
              e.currentTarget.style.background = "transparent";
            }}
          >
            "{h}"
          </button>
        ))}
      </div>
    </div>
  );
}

function StaticAssistantBlock({ stream, onSendTelegram }) {
  return (
    <div style={{ display: "flex", gap: 14, marginTop: 22 }}>
      <AssistantAvatar />
      <div style={{ flex: 1, minWidth: 0 }}>
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
          <span style={{ color: oraColors.air }}>{stream.openerFirst}</span>
          {stream.opener.slice((stream.openerFirst || "").length)}
        </div>
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
          {stream.body}
        </div>
        {stream.resultKind === "natal" ? (
          <NatalResultCard
            me={stream.resultPerson}
            onSendTelegram={onSendTelegram}
            reveal={false}
          />
        ) : (
          <SinastryResultCard a={stream.resultA} b={stream.resultB} />
        )}
      </div>
    </div>
  );
}

function Composer({ value, onChange, onSubmit, disabled }) {
  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(value);
    }
  };
  return (
    <div
      style={{
        background: oraColors.bgDeep,
        borderTop: `1px solid ${oraColors.divider}`,
        padding: "16px 32px 18px",
      }}
    >
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: oraColors.surface,
            border: `1px solid ${oraColors.divider}`,
            padding: 4,
            opacity: disabled ? 0.5 : 1,
          }}
        >
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKey}
            disabled={disabled}
            placeholder={
              disabled
                ? "Preencha os dados da nova pessoa pra continuar…"
                : "Pergunte ao Oráculo…"
            }
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              padding: "10px 14px",
              fontFamily: oraFont.serif,
              fontStyle: value ? "normal" : "italic",
              fontSize: 16,
              color: oraColors.text,
            }}
          />
          <span
            style={{
              fontFamily: oraFont.mono,
              fontSize: 10,
              color: oraColors.textDim,
              letterSpacing: "0.2em",
              marginRight: 12,
            }}
          >
            ⌘↵
          </span>
          <button
            onClick={() => onSubmit(value)}
            disabled={disabled || !value.trim()}
            style={{
              padding: "10px 18px",
              background:
                value.trim() && !disabled ? oraColors.fire : oraColors.card,
              color:
                value.trim() && !disabled ? oraColors.bgDeep : oraColors.textDim,
              border: "none",
              fontFamily: oraFont.mono,
              fontSize: 11,
              letterSpacing: "0.2em",
              fontWeight: 600,
              cursor:
                value.trim() && !disabled ? "pointer" : "not-allowed",
              textTransform: "uppercase",
            }}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Inline ask-for-person (when sinastry references an unknown name) ─
function AskPersonInline({ name, onCancel, onSubmit }) {
  const [form, setForm] = React.useState({
    name: name || "",
    date: "",
    time: "",
    city: "",
  });
  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));
  const valid = form.name && form.date && form.time && form.city;
  const colors = ["fire", "earth", "air", "water", "trine", "conj"];

  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        marginTop: 22,
        animation: "fadeUpOraculo .35s ease",
      }}
    >
      <AssistantAvatar />
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: oraFont.serif,
            fontSize: 19,
            color: oraColors.text,
            marginBottom: 10,
            lineHeight: 1.4,
          }}
        >
          Eu ainda não conheço a{" "}
          <span style={{ color: oraColors.air, fontStyle: "italic" }}>
            {name}
          </span>
          . Me passa os dados de nascimento dela e eu calculo a sinastria
          imediatamente.
        </div>
        <div
          style={{
            background: oraColors.card,
            border: `1px solid ${oraColors.divider}`,
            padding: "16px 18px",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <InlineField
              label="Nome completo"
              value={form.name}
              onChange={update("name")}
              placeholder={`${name} …`}
            />
            <InlineField
              label="Cidade"
              value={form.city}
              onChange={update("city")}
              placeholder="São Paulo, Brasil"
            />
            <InlineField
              label="Data"
              value={form.date}
              onChange={update("date")}
              placeholder="1989-07-04"
              mono
            />
            <InlineField
              label="Hora · obrigatória"
              value={form.time}
              onChange={update("time")}
              placeholder="22:14"
              mono
              warn={!form.time}
            />
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
            <button
              onClick={() => {
                if (!valid) return;
                onSubmit({
                  id: form.name.toLowerCase().replace(/\s+/g, "-"),
                  name: form.name,
                  short: form.name.split(" ")[0],
                  initial: form.name[0]?.toUpperCase(),
                  color: colors[Math.floor(Math.random() * colors.length)],
                  date: form.date,
                  time: form.time,
                  city: form.city,
                  sun: "♋",
                  moon: "♉",
                  asc: "♍",
                });
              }}
              disabled={!valid}
              style={{
                padding: "10px 18px",
                background: valid ? oraColors.fire : oraColors.surface,
                color: valid ? oraColors.bgDeep : oraColors.textDim,
                border: "none",
                fontFamily: oraFont.mono,
                fontSize: 11,
                letterSpacing: "0.2em",
                fontWeight: 600,
                cursor: valid ? "pointer" : "not-allowed",
                textTransform: "uppercase",
              }}
            >
              Salvar e calcular sinastria
            </button>
            <button
              onClick={onCancel}
              style={{
                padding: "10px 14px",
                background: "transparent",
                color: oraColors.textMuted,
                border: `1px solid ${oraColors.divider}`,
                fontFamily: oraFont.mono,
                fontSize: 11,
                letterSpacing: "0.18em",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InlineField({ label, value, onChange, placeholder, mono, warn }) {
  return (
    <div>
      <div
        style={{
          fontFamily: oraFont.mono,
          fontSize: 9.5,
          letterSpacing: "0.22em",
          color: warn ? oraColors.fire : oraColors.textDim,
          textTransform: "uppercase",
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          background: oraColors.bgDeep,
          border: `1px solid ${warn ? oraColors.fireSoft : oraColors.dividerSoft}`,
          padding: "9px 12px",
          fontFamily: mono ? oraFont.mono : oraFont.serif,
          fontSize: mono ? 13 : 14,
          color: oraColors.text,
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

// ── Modals ───────────────────────────────────────────────────────────
function ModalShell({ onClose, children, width = 880 }) {
  React.useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,8,22,0.78)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        zIndex: 100,
        animation: "fadeUpOraculo .2s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width,
          maxWidth: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          background: oraColors.bgRaised,
          border: `1px solid ${oraColors.divider}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function TelegramPreviewModal({ onClose, me }) {
  return (
    <ModalShell onClose={onClose} width={420}>
      <div
        style={{
          padding: "16px 22px",
          borderBottom: `1px solid ${oraColors.divider}`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: oraFont.mono,
            fontSize: 10,
            letterSpacing: "0.3em",
            color: oraColors.fire,
            textTransform: "uppercase",
          }}
        >
          Pré-visualização · Telegram
        </div>
        <button
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            color: oraColors.text,
            fontFamily: oraFont.mono,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      </div>
      <div
        style={{
          padding: 18,
          background: "#17212b",
          color: "#fff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            background: "#182533",
            padding: "10px 14px",
            borderRadius: 10,
            maxWidth: 320,
            marginBottom: 10,
          }}
        >
          <div style={{ fontSize: 11, color: "#5eb5f0", marginBottom: 4 }}>
            Oráculo Bot
          </div>
          <div style={{ fontSize: 14, fontWeight: 600 }}>
            Seu mapa natal está pronto, {me.short}.
          </div>
          <div
            style={{
              fontSize: 13,
              color: "#aabac8",
              marginTop: 4,
              lineHeight: 1.4,
            }}
          >
            <em>
              Sol em Capricórnio · Lua em Câncer · Asc Capricórnio
            </em>
          </div>
        </div>
        <div
          style={{
            background: "#182533",
            padding: 8,
            borderRadius: 10,
            maxWidth: 320,
          }}
        >
          <div
            style={{
              background: oraColors.bgRaised,
              padding: 10,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ChartWheel
              size={200}
              variant="kerykeion"
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
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#aabac8",
              marginTop: 8,
              padding: "0 4px",
            }}
          >
            Markdown completo: static.oraculo.network/astrology/{me.id}
          </div>
        </div>
      </div>
      <div
        style={{
          padding: "14px 22px",
          display: "flex",
          gap: 8,
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={onClose}
          style={{
            padding: "10px 14px",
            background: "transparent",
            border: `1px solid ${oraColors.divider}`,
            color: oraColors.text,
            fontFamily: oraFont.mono,
            fontSize: 11,
            letterSpacing: "0.18em",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Cancelar
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "10px 16px",
            background: oraColors.fire,
            color: oraColors.bgDeep,
            border: "none",
            fontFamily: oraFont.mono,
            fontSize: 11,
            letterSpacing: "0.18em",
            fontWeight: 600,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          ↗ Enviar agora
        </button>
      </div>
    </ModalShell>
  );
}

function ChannelsModal({ me, onClose }) {
  return (
    <ModalShell onClose={onClose} width={520}>
      <div style={{ padding: 28 }}>
        <div
          style={{
            fontFamily: oraFont.mono,
            fontSize: 10,
            letterSpacing: "0.3em",
            color: oraColors.fire,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Canais de entrega
        </div>
        <div
          style={{
            fontFamily: oraFont.serif,
            fontSize: 24,
            color: oraColors.text,
            marginBottom: 18,
          }}
        >
          Por onde o Oráculo pode te alcançar
        </div>
        {[
          {
            name: me.contactKind === "phone" ? "Telefone (SMS)" : "Email",
            id: me.contact || "—",
            on: !!me.contactVerified,
            sub: me.contactVerified
              ? "Confirmado"
              : "Confirme pra garantir entrega",
          },
          {
            name: "Telegram",
            id: "Conectar",
            on: false,
            sub: "Mapa entregue como foto + texto",
          },
          {
            name: "WhatsApp",
            id: "Conectar",
            on: false,
            sub: "Em breve — via bot oficial",
          },
        ].map((c) => (
          <div
            key={c.name}
            style={{
              padding: "14px 16px",
              background: oraColors.card,
              border: `1px solid ${oraColors.dividerSoft}`,
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: oraFont.serif,
                  fontSize: 17,
                  color: oraColors.text,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontFamily: oraFont.mono,
                  fontSize: 11,
                  color: oraColors.textMuted,
                  letterSpacing: "0.04em",
                  marginTop: 2,
                }}
              >
                {c.sub}
              </div>
            </div>
            <div
              style={{
                fontFamily: oraFont.mono,
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: c.on ? oraColors.trine : oraColors.textDim,
                padding: "4px 10px",
                border: `1px solid ${c.on ? oraColors.trine : oraColors.divider}`,
              }}
            >
              {c.on ? "✓ " + c.id : c.id}
            </div>
          </div>
        ))}
        <button
          onClick={onClose}
          style={{
            marginTop: 12,
            padding: "10px 16px",
            background: "transparent",
            border: `1px solid ${oraColors.divider}`,
            color: oraColors.text,
            fontFamily: oraFont.mono,
            fontSize: 11,
            letterSpacing: "0.2em",
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          Fechar
        </button>
      </div>
    </ModalShell>
  );
}

// ── Mount ────────────────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
