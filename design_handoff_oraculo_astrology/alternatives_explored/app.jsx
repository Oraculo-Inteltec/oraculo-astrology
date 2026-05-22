// app.jsx — Top-level canvas wiring three directions × five screens.

const W = 1280;
const H = 860;

function App() {
  return (
    <DesignCanvas>
      <DCSection
        id="overview"
        title="Oráculo Astrology — design explorations"
        subtitle="Three directions, same content. Static screens at 1280×860. Same person (Diogo) across all so directions compare directly."
      >
        <DCArtboard id="readme" label="Leitura" width={420} height={H}>
          <ReadmeCard />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="dir-a"
        title="A · Noite Profunda"
        subtitle="Editorial mystical — near-black + antique gold, Cormorant Garamond, minimal gold-line chart. Restraint over decoration; reads like an essay."
      >
        <DCArtboard id="a-landing" label="01 · Landing" width={W} height={H}>
          <DirALanding />
        </DCArtboard>
        <DCArtboard id="a-ask" label="02 · Pedir mapa" width={W} height={H}>
          <DirAAsk />
        </DCArtboard>
        <DCArtboard id="a-natal" label="03 · Mapa natal" width={W} height={H}>
          <DirANatal />
        </DCArtboard>
        <DCArtboard id="a-synastry" label="04 · Sinastria" width={W} height={H}>
          <DirASynastry />
        </DCArtboard>
        <DCArtboard id="a-vault" label="05 · Vault" width={W} height={H}>
          <DirAVault />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="dir-b"
        title="B · Kerykeion"
        subtitle="Palette pulled from your reference chart — slate-purple ground, fire/earth/air/water as primary accent codes, JetBrains Mono planet table. Data-rich, technical-mystical."
      >
        <DCArtboard id="b-landing" label="01 · Landing" width={W} height={H}>
          <DirBLanding />
        </DCArtboard>
        <DCArtboard id="b-ask" label="02 · Pedir mapa" width={W} height={H}>
          <DirBAsk />
        </DCArtboard>
        <DCArtboard id="b-natal" label="03 · Mapa natal" width={W} height={H}>
          <DirBNatal />
        </DCArtboard>
        <DCArtboard id="b-synastry" label="04 · Sinastria" width={W} height={H}>
          <DirBSynastry />
        </DCArtboard>
        <DCArtboard id="b-vault" label="05 · Vault" width={W} height={H}>
          <DirBVault />
        </DCArtboard>
      </DCSection>

      <DCSection
        id="dir-c"
        title="C · Pergaminho Noturno"
        subtitle="Two surfaces: deep night background with aged-paper inserts for prose. Cardo serif, oxidized gold + burgundy. Like reading an old astrological manuscript by candlelight."
      >
        <DCArtboard id="c-landing" label="01 · Landing" width={W} height={H}>
          <DirCLanding />
        </DCArtboard>
        <DCArtboard id="c-ask" label="02 · Indagar" width={W} height={H}>
          <DirCAsk />
        </DCArtboard>
        <DCArtboard id="c-natal" label="03 · Mapa natal" width={W} height={H}>
          <DirCNatal />
        </DCArtboard>
        <DCArtboard id="c-synastry" label="04 · Sinastria" width={W} height={H}>
          <DirCSynastry />
        </DCArtboard>
        <DCArtboard id="c-vault" label="05 · Vault" width={W} height={H}>
          <DirCVault />
        </DCArtboard>
      </DCSection>
    </DesignCanvas>
  );
}

function ReadmeCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#15131f",
        color: "#cfc7b6",
        padding: "40px 36px",
        fontFamily: "'Manrope', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.3em",
          color: "#c9a86a",
          textTransform: "uppercase",
        }}
      >
        Oráculo Astrology · v0
      </div>
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 38,
          lineHeight: 1.05,
          color: "#f4ecd8",
          fontWeight: 300,
        }}
      >
        Three directions, <span style={{ fontStyle: "italic", color: "#c9a86a" }}>same person.</span>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.6, color: "#cfc7b6" }}>
        All three explorations use Diogo's natal data (1987–12–07, 15:03, Rio
        de Janeiro) so you can compare directions directly across the same
        five surfaces:
      </div>
      <ol style={{ paddingLeft: 18, lineHeight: 1.8, fontSize: 13.5, color: "#cfc7b6" }}>
        <li>Landing — hero + tier comparison</li>
        <li>Pedir mapa / Indagar — conversational ask UI</li>
        <li>Mapa natal — chart + interpretation reader</li>
        <li>Sinastria — two-person reading (no wheel yet)</li>
        <li>Vault — known people + add form</li>
      </ol>
      <div
        style={{
          marginTop: 12,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: "#8a8499",
          letterSpacing: "0.04em",
          lineHeight: 1.7,
        }}
      >
        <div style={{ color: "#c9a86a", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 6 }}>How to use</div>
        Pan with space + drag, zoom with scroll. Click any artboard's ⛶ icon
        to open it fullscreen and step through with ←/→. Drag the grip to
        reorder; rename labels inline.
      </div>
      <div
        style={{
          marginTop: "auto",
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: "italic",
          fontSize: 14,
          color: "#8a8499",
          borderTop: "1px solid rgba(244,236,216,0.07)",
          paddingTop: 14,
        }}
      >
        Direction B pulls its palette directly from your reference Kerykeion
        chart image. A is the restrained editorial cousin; C swaps the
        background and the page so prose lives on aged paper over night.
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
