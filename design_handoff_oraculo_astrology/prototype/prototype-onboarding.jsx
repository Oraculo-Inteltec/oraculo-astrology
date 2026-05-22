// prototype-onboarding.jsx — single form. Contact (email or phone) is
// collected alongside birth data; access is granted immediately. The
// magic-link confirmation just upgrades the user's status to "validado"
// later — it doesn't block the first reading.

function Onboarding({ onComplete }) {
  const [form, setForm] = React.useState({
    contact: "",
    name: "",
    date: "",
    time: "",
    city: "",
  });
  const [showTimeExplain, setShowTimeExplain] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const update = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  // Contact detection: email or phone.
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact);
  const digits = form.contact.replace(/\D/g, "");
  const isPhone =
    /^\+?[\d\s\-()]+$/.test(form.contact) && digits.length >= 10;
  const contactKind = isEmail ? "email" : isPhone ? "phone" : null;

  const cityResolved =
    form.city.length > 2
      ? {
          coords: form.city.toLowerCase().includes("rio")
            ? "22°53′S · 43°21′W"
            : form.city.toLowerCase().includes("são") ||
              form.city.toLowerCase().includes("sao")
            ? "23°33′S · 46°38′W"
            : "—",
          tz: "−03:00 (auto)",
        }
      : null;

  const valid =
    contactKind && form.name && form.date && form.time && form.city;

  const submit = () => {
    if (!valid) {
      if (!form.time) setShowTimeExplain(true);
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      onComplete({
        ...INITIAL_ME,
        name: form.name,
        short: form.name.split(" ")[0],
        initial: form.name[0]?.toUpperCase() || "?",
        date: form.date,
        time: form.time,
        city: form.city,
        contact: form.contact,
        contactKind,
        contactVerified: false,
      });
    }, 1100);
  };

  return (
    <AuthShell caption="Dados de nascimento">
      <div
        style={{
          fontFamily: oraFont.serif,
          fontSize: 32,
          lineHeight: 1.1,
          color: oraColors.text,
          marginBottom: 8,
          fontWeight: 400,
        }}
      >
        Quem é você,
        <br />
        <span style={{ fontStyle: "italic", color: oraColors.air }}>
          do ponto de vista do céu?
        </span>
      </div>
      <div
        style={{
          fontFamily: oraFont.serif,
          fontSize: 15,
          color: oraColors.textMuted,
          marginBottom: 22,
          lineHeight: 1.6,
        }}
      >
        Cinco coisas. Exatamente como aparecem na sua certidão.
      </div>

      {/* Contact */}
      <div style={{ marginBottom: 14 }}>
        <FieldLabel
          right={
            contactKind && (
              <span style={{ color: oraColors.trine, letterSpacing: "0.18em" }}>
                ✓ via {contactKind === "email" ? "email" : "SMS"}
              </span>
            )
          }
        >
          Email ou telefone
        </FieldLabel>
        <Input
          value={form.contact}
          onChange={update("contact")}
          placeholder="seu@email.com   ·   +55 11 9 9999-0000"
          autoFocus
        />
        <Helper>
          Pra confirmar depois e guardar seu mapa. Você já entra sem
          confirmar — o link de confirmação chega em paralelo.
        </Helper>
      </div>

      {/* Name */}
      <FieldLabel>Nome completo</FieldLabel>
      <Input
        value={form.name}
        onChange={update("name")}
        placeholder="Como você se apresenta"
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 1fr",
          gap: 10,
          marginTop: 14,
        }}
      >
        <div>
          <FieldLabel>Data de nascimento</FieldLabel>
          <Input
            value={form.date}
            onChange={update("date")}
            placeholder="1987-12-07"
            mono
          />
        </div>
        <div>
          <FieldLabel highlight={showTimeExplain && !form.time}>
            Hora <span style={{ color: oraColors.fire }}>·</span> obrigatória
          </FieldLabel>
          <Input
            value={form.time}
            onChange={update("time")}
            placeholder="15:03"
            mono
            invalid={showTimeExplain && !form.time}
          />
        </div>
      </div>

      {showTimeExplain && !form.time && <TimeExplainer />}

      <div style={{ marginTop: 14 }}>
        <FieldLabel>Cidade de nascimento</FieldLabel>
        <Input
          value={form.city}
          onChange={update("city")}
          placeholder="Rio de Janeiro, Brasil"
        />
        {cityResolved && (
          <div
            style={{
              marginTop: 6,
              fontFamily: oraFont.mono,
              fontSize: 10.5,
              color: oraColors.trine,
              letterSpacing: "0.06em",
            }}
          >
            ✓ {cityResolved.coords} · fuso {cityResolved.tz}
          </div>
        )}
      </div>

      <button
        onClick={submit}
        disabled={submitting}
        style={{
          width: "100%",
          marginTop: 24,
          padding: "14px 20px",
          background: valid ? oraColors.fire : oraColors.surface,
          color: valid ? oraColors.bgDeep : oraColors.textDim,
          border: "none",
          fontFamily: oraFont.mono,
          fontSize: 12,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          fontWeight: 600,
          cursor: valid ? "pointer" : "not-allowed",
          position: "relative",
          opacity: submitting ? 0.6 : 1,
        }}
      >
        {submitting ? "Lendo o céu…" : "Ler meu céu ✦"}
      </button>
    </AuthShell>
  );
}

function FieldLabel({ children, highlight, right }) {
  return (
    <div
      style={{
        fontFamily: oraFont.mono,
        fontSize: 10,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: highlight ? oraColors.fire : oraColors.textDim,
        marginBottom: 6,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
      }}
    >
      <span>{children}</span>
      {right}
    </div>
  );
}

function Helper({ children }) {
  return (
    <div
      style={{
        marginTop: 6,
        fontFamily: oraFont.mono,
        fontSize: 10,
        color: oraColors.textDim,
        letterSpacing: "0.04em",
        lineHeight: 1.6,
      }}
    >
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, mono, autoFocus, invalid }) {
  return (
    <input
      autoFocus={autoFocus}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: "100%",
        background: oraColors.surface,
        border: `1px solid ${invalid ? oraColors.fire : oraColors.divider}`,
        padding: "12px 14px",
        fontFamily: mono ? oraFont.mono : oraFont.serif,
        fontSize: mono ? 15 : 16,
        color: oraColors.text,
        outline: "none",
        boxSizing: "border-box",
        letterSpacing: mono ? "0.04em" : "normal",
      }}
    />
  );
}

function TimeExplainer() {
  return (
    <div
      style={{
        marginTop: 10,
        padding: "12px 14px",
        border: `1px solid ${oraColors.fireSoft}`,
        background: "rgba(214,92,92,0.06)",
        fontFamily: oraFont.serif,
        fontSize: 13.5,
        lineHeight: 1.6,
        color: oraColors.text,
        animation: "fadeUpOraculo .25s ease",
      }}
    >
      <div
        style={{
          fontFamily: oraFont.mono,
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: oraColors.fire,
          marginBottom: 6,
        }}
      >
        Por que a hora é obrigatória
      </div>
      A hora exata é o que rotaciona o céu sobre o seu lugar de nascimento.
      Sem ela, eu não posso te dizer onde o Ascendente cruza o horizonte —
      e sem Ascendente não há casas. O mapa fica sem chão.
      <div
        style={{
          marginTop: 8,
          fontFamily: oraFont.serif,
          fontStyle: "italic",
          color: oraColors.textMuted,
        }}
      >
        Pergunta na maternidade, olha sua certidão, ou pede pra família. Pode
        ser aproximada (15:00 em vez de 15:03) — só não pode faltar.
      </div>
    </div>
  );
}

Object.assign(window, { Onboarding });
