// prototype-data.jsx — palette, fonts, mock data, helpers shared across the
// prototype screens. All exported to window so each script can grab them.

const oraColors = {
  bg: "#1f1a30",
  bgDeep: "#171326",
  bgRaised: "#28233e",
  surface: "#322a48",
  surfaceUp: "#3d3554",
  card: "#231e36",
  divider: "rgba(232,216,168,0.14)",
  dividerSoft: "rgba(232,216,168,0.07)",
  text: "#eadfb8",
  textMuted: "#a89e80",
  textDim: "#7a7260",
  textFaint: "#5a5340",
  fire: "#d65c5c",
  fireSoft: "#a64646",
  earth: "#b27a4a",
  air: "#82b5b5",
  water: "#3e7080",
  trine: "#7aae74",
  square: "#c45a52",
  conj: "#d4a16a",
};

const oraFont = {
  serif: "'Spectral', Georgia, serif",
  sans: "'Manrope', sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace",
};

// ── Mock conversational content ─────────────────────────────────────
// Pre-written natal interpretation streamed character-by-character.
const NATAL_OPENER =
  "Diogo, seu Sol em Capricórnio quer construir o que dura — e sua Lua em Câncer pede que isso tenha casa, cheiro, memória.";

const NATAL_BODY = `Mapa pronto. Salvei o markdown em static.oraculo.network/astrology/diogo e gerei a imagem em 300dpi (PNG e SVG). Quer que eu abra a leitura completa aqui, ou prefere receber no Telegram?`;

const NATAL_FULL_SECTIONS = [
  {
    glyph: "☉",
    color: "fire",
    title: "Sol em Capricórnio, casa XII",
    deg: "15°02′57″",
    body:
      "Há em você uma vontade que prefere o silêncio à proclamação. Capricórnio na XII faz da sua autoridade algo subterrâneo — você governa por dentro antes de aparecer por fora, e o reconhecimento, quando vem, sempre chega tarde demais para te impressionar.",
  },
  {
    glyph: "☽",
    color: "water",
    title: "Lua em Câncer, casa VI",
    deg: "12°06′53″",
    body:
      "Sua sensibilidade é doméstica e operacional ao mesmo tempo. Você cuida fazendo — cozinha, organiza, lembra de datas. A oposição com seu Sol é a tensão que move tudo: o que constrói de dia, o íntimo desfaz à noite e refaz com mais ternura.",
  },
  {
    glyph: "As",
    color: "earth",
    title: "Ascendente em Capricórnio",
    deg: "16°50′09″",
    body:
      "O mundo te vê mais velho do que você é. Isso é útil — ganha tempo até descobrirem a brincadeira que mora atrás. Saturno como regente da personagem te dá paciência, mas pede ritmo: cobra de você o trabalho que te respeita.",
  },
];

const SINASTRY_OPENER =
  "O eixo Câncer–Capricórnio cruza vocês duas vezes — Sol dele oposto ao Sol dela, Lua dele em conjunção ao Sol dela. É a relação como casa: ele constrói as paredes, ela escolhe a luz.";

const SINASTRY_BODY = `Doméstica antes de tudo. Vocês se reconhecem na rotina, no que se repete e ganha sentido. A erotização aparece pela continuidade. Pode faltar surpresa; nunca falta retorno.\n\nSaturno dele quadrando a Lua dela é o trabalho lento desta relação — anos, não meses. A maturidade afetiva entra como peso e como abrigo, depende de como cada um carrega o próprio inverno.`;

// ── Initial state ───────────────────────────────────────────────────
const INITIAL_ME = {
  id: "me",
  name: "Diogo Magalhães Machado",
  short: "Diogo",
  initial: "D",
  color: "earth",
  date: "1987-12-07",
  time: "15:03",
  city: "Rio de Janeiro, Brasil",
  lat: "22°53′S",
  lon: "43°21′W",
  tz: "-02:00",
  sun: "♑",
  moon: "♋",
  asc: "♑",
};

const INITIAL_PEOPLE = [
  // intentionally empty — the user starts fresh and the experience
  // builds people up as they're requested.
];

// ── Streaming helpers ───────────────────────────────────────────────
// Words-per-tick streamer. Calls onChunk with accumulated text after each
// chunk. Returns a cancel handle.
function streamText(text, onChunk, onDone, opts = {}) {
  const { chunkSize = 4, intervalMs = 30 } = opts;
  const words = text.split(/(\s+)/);
  let i = 0;
  const id = setInterval(() => {
    i += chunkSize;
    const slice = words.slice(0, i).join("");
    onChunk(slice);
    if (i >= words.length) {
      clearInterval(id);
      onChunk(text);
      onDone && onDone();
    }
  }, intervalMs);
  return () => clearInterval(id);
}

// Trace-line revealer. Calls onLine(index) at staggered intervals.
function streamTrace(count, onLine, onDone, opts = {}) {
  const { stepMs = 380 } = opts;
  let i = 0;
  onLine(i);
  i++;
  const id = setInterval(() => {
    if (i >= count) {
      clearInterval(id);
      onDone && onDone();
      return;
    }
    onLine(i);
    i++;
  }, stepMs);
  return () => clearInterval(id);
}

// Detect natural-language intent in the user's prompt.
function detectIntent(text) {
  const t = text.toLowerCase();
  if (/sinastr|combina|com\s+\w+/.test(t)) {
    const matches = t.match(/com\s+([a-záéíóúâêôãõç]+)/);
    return { kind: "sinastry", other: matches ? cap(matches[1]) : null };
  }
  if (/lua\s+(de\s+)?hoje|trânsito|hoje/.test(t)) {
    return { kind: "transit" };
  }
  if (/mapa|natal|carta|astral|leitura/.test(t)) {
    return { kind: "natal" };
  }
  return { kind: "natal" };
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const ELEMENT_BY_SIGN = {
  "♈": "fire", "♉": "earth", "♊": "air", "♋": "water",
  "♌": "fire", "♍": "earth", "♎": "air", "♏": "water",
  "♐": "fire", "♑": "earth", "♒": "air", "♓": "water",
};

Object.assign(window, {
  oraColors,
  oraFont,
  NATAL_OPENER,
  NATAL_BODY,
  NATAL_FULL_SECTIONS,
  SINASTRY_OPENER,
  SINASTRY_BODY,
  INITIAL_ME,
  INITIAL_PEOPLE,
  streamText,
  streamTrace,
  detectIntent,
  ELEMENT_BY_SIGN,
});
