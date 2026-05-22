# Handoff: Oráculo Astrology — Conversational Web Product

## Overview

This handoff bundles a high-fidelity interactive design + flow specification
for **Oráculo Astrology** — a conversational web product that lets users
request natal chart interpretations and synastry readings in Portuguese,
backed by the existing astrology system (POST `/astrology/ask` →
Kerykeion + Swiss Ephemeris, Portuguese interpreter, optional Telegram/
WhatsApp delivery).

The design covers the entire user-facing surface: landing, single-form
onboarding (identity + birth data combined), and the conversational app
where the natal chart and full interpretation are delivered.

## About the design files

**The HTML files in this bundle are design references, not production code
to ship.** They are React prototypes loaded via `<script type="text/babel">`
+ Babel-standalone — useful for running the design at full fidelity in a
browser but not how this should be built in production.

Your task is to **recreate the same UX, layout, and visual language in the
existing Oráculo codebase**, using its established framework, component
library, and styling conventions. Treat the HTML as the spec; the
implementation pattern is whatever the production codebase already uses
(React + Tailwind, Next.js + CSS modules, SvelteKit, whatever).

## Fidelity

**High-fidelity.** Final colors, typography, spacing, component
construction, microcopy (in Portuguese), and choreographed interactions
are all specified. Reproduce the visual language closely. The palette is
derived directly from the user's existing Kerykeion chart output (see
`reference/chart-image.png`) — keeping it cohesive with the wheel image
that the backend already generates was a deliberate decision.

## What's included

```
design_handoff_oraculo_astrology/
├── README.md                       ← this file (the spec)
├── prototype/
│   ├── prototype.html              ← entry; open in a browser to run
│   ├── chart-wheel.jsx             ← shared SVG natal wheel component
│   ├── prototype-data.jsx          ← palette, fonts, mock data, helpers
│   ├── prototype-landing.jsx       ← landing + today-sky ribbon
│   ├── prototype-onboarding.jsx    ← unified contact + birth-data form
│   ├── prototype-chat.jsx          ← streaming exchange + result cards
│   └── prototype-app.jsx           ← top-level shell, chat, modals
├── alternatives_explored/
│   ├── design-canvas.html          ← entry for the three-direction canvas
│   └── direction-{a,b,c}.jsx       ← the three explorations
└── reference/
    └── chart-image.png             ← user's reference Kerykeion output
```

Open `prototype/prototype.html` in any modern browser to run the full
flow end-to-end. Open `alternatives_explored/design-canvas.html` to see
the three directions side-by-side (Direction B was chosen).

---

## Product flow (the part to implement)

```
LANDING                       prototype-landing.jsx · Landing()
  │   Single CTA: "Fazer meu mapa →"
  │   No channel picker on landing — channels are post-account
  ▼
ONBOARDING                    prototype-onboarding.jsx · Onboarding()
  │   Single form, 5 fields:
  │     – email OR phone (auto-detected: regex tells email from phone)
  │     – nome completo
  │     – data (yyyy-mm-dd)
  │     – hora (HH:MM)       ← OBRIGATÓRIA, with inline pedagogical
  │                            explainer when omitted
  │     – cidade             ← city → coords + tz auto-resolve mocked
  │   User is granted access immediately on submit; confirmation of
  │   email/phone happens asynchronously via magic link sent in parallel.
  │   In the backend, mark contact as `verified: false` until magic link
  │   is clicked.
  ▼
APP (single conversation)     prototype-app.jsx · App()
  │   ┌──────────────────────────────────────────────────┐
  │   │  Header: Oráculo logo · Today's sky · avatar     │
  │   ├──────────────────────────────────────────────────┤
  │   │  ConfirmBanner (if !contactVerified)             │
  │   ├──────────────────────────────────────────────────┤
  │   │                                                  │
  │   │      Welcome (Pronto, Diogo. O céu já te         │
  │   │      conhece.) ← shows for ~2.2s                 │
  │   │                                                  │
  │   │  [auto-dispatched] user msg: "Faz meu mapa       │
  │   │                              natal"              │
  │   │  Assistant streaming:                            │
  │   │     – ~1.4s "Lendo seu céu…" pulse               │
  │   │     – opener streams (italic, color-accented)    │
  │   │     – body streams                               │
  │   │     – chart card appears w/ choreographed reveal │
  │   │     – "Onde ir agora" suggestion chips appear    │
  │   │                                                  │
  │   ├──────────────────────────────────────────────────┤
  │   │  Composer: "Pergunte ao Oráculo…"                │
  │   └──────────────────────────────────────────────────┘
```

### Intent detection on user messages

The composer routes user input to the right flow. See
`prototype-data.jsx · detectIntent()`:

- Mentions of "sinastria" or "com <nome>" → sinastry flow
  - If `<nome>` is a known person → run sinastry immediately
  - If unknown → insert inline `AskPersonInline` block requesting that
    person's birth data; submitting it runs the sinastry
- Mentions of "mapa", "natal", "carta", "leitura" → natal flow (defaults
  to the logged-in user)
- "lua hoje", "trânsito" → transit flow (not built in this prototype)

The prototype uses mock streams; the real implementation calls the
existing `POST /astrology/ask` endpoint and streams the response.

---

## Visual system

### Palette (deliberately extends the Kerykeion chart palette)

| Token         | Hex                  | Use |
| ------------- | -------------------- | --- |
| `bg`          | `#1f1a30`            | App background |
| `bgDeep`      | `#171326`            | Header/footer/composer surface |
| `bgRaised`    | `#28233e`            | Slight raised surfaces, modals |
| `surface`     | `#322a48`            | Inputs, composer field |
| `surfaceUp`   | `#3d3554`            | Hovered surfaces |
| `card`        | `#231e36`            | Result cards |
| `divider`     | `rgba(232,216,168,0.14)` | Stronger dividers/borders |
| `dividerSoft` | `rgba(232,216,168,0.07)` | Subtle separators |
| `text`        | `#eadfb8`            | Primary cream (matches Kerykeion glyph color) |
| `textMuted`   | `#a89e80`            | Secondary |
| `textDim`     | `#7a7260`            | Tertiary, captions |
| `textFaint`   | `#5a5340`            | Disabled |
| `fire`        | `#d65c5c`            | Primary accent · element: fire · aspect: square |
| `fireSoft`    | `#a64646`            | Hover/state of fire |
| `earth`       | `#b27a4a`            | Element: earth |
| `air`         | `#82b5b5`            | Element: air · used for italic emphasis |
| `water`       | `#3e7080`            | Element: water |
| `trine`       | `#7aae74`            | Aspect: trine, success |
| `square`      | `#c45a52`            | Aspect: square, error |
| `conj`        | `#d4a16a`            | Aspect: conjunction |

These come from `prototype-data.jsx · oraColors`. **Do not invent new
colors**; use these tokens. If implementing in Tailwind, define these as
custom theme colors.

### Typography

Two families, three roles. No third family — keep it tight.

| Family | Use | Loaded via |
| --- | --- | --- |
| **Spectral** (Google Fonts; 300/400/500/600, italic 300/400/500) | Display, body prose, opener text, headings, italic emphasis | `<link>` |
| **JetBrains Mono** (Google Fonts; 300/400/500/600) | Captions, labels, technical data (planet positions, degrees), uppercase tags, monospace data tables | `<link>` |

Type ramp (use these — don't introduce new sizes):

- 72-84px / 1.0 — landing hero
- 38-44px / 1.1 — page titles, welcome
- 22-28px / 1.4 — opener line, modal titles
- 17-19px / 1.5 — section headings
- 15-16px / 1.65-1.7 — body prose
- 13-14px / 1.6 — secondary text
- 10-11px · letter-spacing 0.18-0.32em · uppercase — mono labels/captions

### Conventions

- Mono uppercase labels in `textDim` with `letter-spacing: 0.22em` mark
  every section/field header
- Italic Spectral in `air` color (`#82b5b5`) is the consistent "poetic
  emphasis" — use it for the opener's name address ("Diogo,") and for
  poetic fragments throughout
- Borders are always 1px, never wider. Most dividers use
  `rgba(232,216,168,0.07–0.14)` — never pure white or black
- No border-radius anywhere — square edges throughout (deliberate; gives
  the product a manuscript/document feel)
- No drop shadows on flat UI. Modals use a `rgba(10,8,22,0.78)` backdrop
  with `backdrop-filter: blur(6px)`

---

## Screen-by-screen spec

### 1. Landing (`prototype-landing.jsx · Landing`)

**Purpose**: Sell the conversational astrology experience and direct the
user to start their first reading.

**Layout**:
- Full-viewport background `oraColors.bgDeep` with a fixed `Starfield`
  decoration (radial-gradient dots — see `Starfield` component)
- Top nav: 56px horizontal padding, 20px vertical, bottom border
  `divider`. Left: `OraculoLogo`. Right: `TodaySkyMini` ribbon.
- Hero grid: 2 columns `1.1fr 1fr`, max-width 1280, 72px top padding,
  56px horizontal, 72px gap
  - **Left column**: mono `fire`-colored elements list ("▲ Fogo · ⬢
    Terra · ◯ Ar · ◇ Água") → 84px Spectral "Seu mapa / como conversa."
    (the "como conversa." line italicized in `air` color) → 19px Spectral
    body explainer → CTA row: orange-red button "Fazer meu mapa →"
    (padding 18×34px, `oraColors.fire` bg, `bgDeep` text) + mono caption
    "Gratuito · ~ 90s · Sem cartão, sem ritual de cadastro"
  - **Bottom of left column**: 3-column "O que você recebe" feature grid
  - **Right column**: `AnnotatedChart` — a 440px `ChartWheel` with three
    floating annotation cards positioned absolutely around it
- Footer: 18px padding, mono small caption with backend method
  ("Tropical · Casas Placidus · Swiss Ephemeris · Ciro Discepolo") and
  endpoint reference

**Interactions**:
- `onStart()` on the CTA → navigates to onboarding view
- Floating annotation cards fade in staggered after chart reveal completes

### 2. Onboarding (`prototype-onboarding.jsx · Onboarding`)

**Purpose**: Collect everything needed in one screen — contact + birth
data — and grant immediate access.

**Layout**:
- Same `AuthShell` frame (`prototype-landing.jsx`): top bar with logo, 
  centered card on Starfield-textured backdrop
- Card: 520×auto, `card` bg, 1px `divider` border, padding 32×36px
- Caption pill: mono uppercase `fire` "Dados de nascimento"
- Heading: 32px Spectral "Quem é você, / do ponto de vista do céu?"
  (the second line italicized in `air`)
- Subheading: 15px Spectral muted "Cinco coisas. Exatamente como aparecem
  na sua certidão."

**Fields** (in this order):
1. **Email ou telefone** — single input that accepts both. Detection:
   - Email regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`
   - Phone: digits-only count ≥ 10, optional `+` prefix
   - When valid, show right-aligned mono "✓ via email" / "✓ via SMS" in
     `trine` color in the label row
   - Helper text below: "Pra confirmar depois e guardar seu mapa. Você
     já entra sem confirmar — o link de confirmação chega em paralelo."
2. **Nome completo** — Spectral input
3. **Data de nascimento** + **Hora · obrigatória** — 2-column grid
   `1.3fr 1fr`, both mono inputs
   - When user submits with empty `time`, expand `TimeExplainer` inline
     below the row (animated `fadeUpOraculo .25s`)
   - Explainer copy is exact and is part of the design — don't shorten
4. **Cidade de nascimento** — Spectral input
   - When ≥ 2 chars, show mono `trine` "✓ <coords> · fuso <tz>" line
     below it. Production: hit a geocoder + tz lookup async

**Submit**:
- Valid when contact + name + date + time + city all set
- Button shows "Lendo o céu… " while submitting (1.1s mock delay)
- `onComplete(person)` returns: `{name, short (first word), initial,
  date, time, city, contact, contactKind: 'email'|'phone',
  contactVerified: false}`

**Critical decisions baked in here**:
- One form, not multi-step — chose by stakeholder
- Hora is hard-required with pedagogical explainer (rather than blocking
  silently or accepting partial)
- No "I agree to terms" line, no privacy footer — out of scope for now

### 3. App shell (`prototype-app.jsx · App` + `AppHeader`)

**Layout** (full viewport, vertical flex):

1. **Header** — `1fr auto 1fr` grid, 14×28px padding, `bgDeep` bg
   - Left: `OraculoLogo`
   - Center: `TodaySkyMini` — shows mono `fire` "Hoje no céu" + mono
     `text` "☉ <sign> · ☽ <sign> <phase>"
     - Phase / signs are mocked from `Date()` in the prototype; production
       must compute today's actual transits server-side
   - Right: avatar pill (initial + short name + `▾`) → opens menu
     - Menu rows: "Canais de entrega" / "Meu mapa" / "Sair"
2. **ConfirmBanner** (only if `!me.contactVerified`)
   - 8px×28px padding, `rgba(214,92,92,0.08)` bg, `fireSoft` bottom border
   - Left: "✦ Não confirmado" pill + italic copy "Você já está dentro —
     mas confirma seu {email/telefone} pra não perder esse mapa."
   - Right: "Reenviar link" button (toggles to "✓ Enviado pra <contact>")
     + filled `fire` "Já confirmei" button (toggles `contactVerified=true`
     and dismisses the banner)
3. **ChatView** — flex 1, scrolls
4. **Composer** — sticky bottom, `bgDeep` bg, top border `divider`

### 4. Chat view (`prototype-app.jsx · ChatView`)

**Layout**: Centered content column, max-width 760px, 32px horizontal
padding.

**First-load auto behavior** (the most important UX moment):
1. App mounts, `messages` is empty, `autoTriggered` is false
2. `WelcomeIntro` renders for ~2.2s — shows the cream `Pronto, <name>.`
   greeting + "Preparando seu mapa natal…" pulse
3. After 2.2s, the App dispatches a synthetic user message "Faz meu mapa
   natal" + an assistant streaming message
4. Welcome disappears; the streaming begins
5. After the stream finishes (`message.streamed = true`), the
   `NextStepsHints` chip row appears below the conversation

**Message types**:

- `user`: right-aligned bubble, `fire` bg, `bgDeep` text, no border
  radius, 12×16px padding, max-width 520px
- `assistant`: avatar (30px `fire` square with "O") + content column
  - When `stream && !streamed`: render `StreamingExchange` (see below)
  - When `streamed`: render `StaticAssistantBlock` (no animation, same
    layout)
- `isStatic + stub.kind === 'ask-person-data'`: render `AskPersonInline`
  (inline form for sinastry with unknown person)

**`StreamingExchange` phases**:
1. **warmup** (1.4s): `WarmupPulse` — italic muted "Lendo seu céu…" with
   a 10px pulsing fire dot
2. **opener**: streams `message.opener` 3 words per ~30ms tick.
   `openerFirst` (e.g. "Diogo,") renders in italic `air`; rest of text
   in cream. Blinking `Caret` follows the cursor.
3. **body**: streams `message.body` 6 words per ~24ms tick. Smaller
   (15px) cream text with `whitespace: pre-wrap`.
4. **done**: reveals `message.result` (the chart card) with a 0.4s
   `fadeUpOraculo` animation.

The opener-then-body cascade is the product's signature moment.

**`NatalResultCard`** (the result of a natal stream):
- `card` bg, 1px `divider` border, 18px padding
- 2-column grid `220px 1fr`:
  - Left: 220px `ChartWheel` (variant="kerykeion", reveal=true)
  - Right:
    - Mono `fire` caption "Mapa natal · <name>"
    - 22px Spectral signs line: "♑ Sol · ♋ Lua · ♑ Ascendente"
    - 4-column element percentages grid (Fogo/Terra/Ar/Água with their
      element colors)
    - Chip row: "Abrir leitura completa →" (primary fire chip),
      "↗ Telegram", "↓ PNG", "↓ SVG", "⎘ Markdown" (subtle chips)
- When user clicks "Abrir leitura completa", expand `InlineReading`
  *below the same card* (NOT a modal):
  - Pull-quote synthesis with `fire` left border
  - Three sections (Sol / Lua / Ascendente) each with glyph in element
    color, title in Spectral, mono degree on the right, body prose in
    Spectral. Sections fade-up staggered (0.08s × index)
  - Footer mono line "SALVO EM MEMÓRIA · static.oraculo.network/astrology"

**`AskPersonInline`** (when sinastry mentions an unknown person):
- Avatar + assistant content column
- Prose: "Eu ainda não conheço a <name>. Me passa os dados de nascimento
  dela e eu calculo a sinastria imediatamente."
- Inline mini-form: nome / cidade / data (mono) / hora (mono, warn-styled
  when empty) in a 2×2 grid
- "Salvar e calcular sinastria" (primary) + "Cancelar" buttons
- Composer is disabled while this form is pending

### 5. Composer (`prototype-app.jsx · Composer`)

- Wrapper: `bgDeep` bg, top border `divider`, 16×32×18px padding,
  centered content max-width 760px
- Field: `surface` bg, 1px `divider` border, 4px outer padding
  - Input: transparent, no border, Spectral 16px, italic placeholder
    `text-muted`. Placeholder: "Pergunte ao Oráculo…" (or "Preencha os
    dados…" when pending person)
  - Mono `⌘↵` hint right-aligned before submit button
  - "ENVIAR" button: `fire` bg / `bgDeep` text when valid, `card` bg /
    `textDim` text when disabled
- Behavior:
  - Enter (without Shift) submits
  - Disabled when `pendingPerson` is non-null

### 6. Modals

Two modals, both use `ModalShell` (centered, `rgba(10,8,22,0.78)`
backdrop, `blur(6px)`, Escape closes, click-outside closes).

- **TelegramPreviewModal** (420px wide): mock Telegram-style preview of
  the photo + caption that will be sent. Header strip + "↗ Enviar agora"
  / "Cancelar" footer.
- **ChannelsModal** (520px wide): list of delivery channels (email/phone
  + Telegram + WhatsApp) with connect status and verification state.

---

## The chart wheel (`chart-wheel.jsx · ChartWheel`)

A parameterizable SVG component. Three variants used across the design:

- `kerykeion` — element-colored sign wedges (fire/earth/air/water fills);
  full-color aspect lines using `ASPECT_COLORS`. **This is the primary
  variant** used everywhere in the chosen direction.
- `minimal` — line-only, no fills (used in some alternatives)
- (unused by chosen direction; ignore for implementation)

**Required props**:

```jsx
<ChartWheel
  size={220}                      // SVG viewbox edge
  variant="kerykeion"
  reveal={true}                   // staggered fade-in animation
  palette={{
    ring, text, hub, house,
    fire, earth, air, water,
    aspectMuted,
  }}
/>
```

### Choreographed reveal (`reveal={true}`)

When `reveal` is true, the wheel animates in layer by layer (each
`<g>` gets `animation: cw-fade-in .55s <delay>s both`):

| Layer | Delay |
| ----- | ----- |
| Hub center | 0.0s |
| Sign wedges + glyphs | 0.2s |
| Outer + inner sign ring borders | 0.5s |
| House dividers + numbers | 0.55s |
| Asc / Mc axis | 0.95s |
| Aspect lines | 1.15s |
| Planet glyphs | 1.45s |

Total reveal: ~2.0s. The keyframe is defined once on script load (see
`chart-wheel.jsx` top — it injects `<style id="cw-reveal-styles">`).

### Production note: wheel from backend

The existing astrology system already generates the chart as PNG and SVG
via Kerykeion. **Use the backend SVG** for the canonical chart wheel
in the result card and modal — not this React-rendered one. This
component exists for prototype fidelity and for any inline "preview"
states (e.g. landing). Apply the same reveal animation to the inline
SVG via CSS by tagging layer groups in the SVG output.

If the backend Kerykeion SVG can't be re-themed to match the palette,
keep the chart's current colors (which is where the palette came from
anyway — they match).

### Planet positions

The prototype's planet positions are hand-coded to roughly match the
user's reference chart. The production version must use real positions
from Kerykeion's output. The component is illustrative only.

---

## Microcopy (verbatim — these matter)

| Surface | Exact text |
| --- | --- |
| Landing hero h1 | "Seu mapa / como conversa." |
| Landing CTA | "Fazer meu mapa →" |
| Landing tagline under CTA | "Gratuito · ~ 90s / Sem cartão, sem ritual de cadastro" |
| Onboarding title | "Quem é você, / do ponto de vista do céu?" |
| Onboarding subtitle | "Cinco coisas. Exatamente como aparecem na sua certidão." |
| Contact field helper | "Pra confirmar depois e guardar seu mapa. Você já entra sem confirmar — o link de confirmação chega em paralelo." |
| Time field label | "Hora · obrigatória" |
| Time explainer (full) | "A hora exata é o que rotaciona o céu sobre o seu lugar de nascimento. Sem ela, eu não posso te dizer onde o Ascendente cruza o horizonte — e sem Ascendente não há casas. O mapa fica sem chão." + italic followup: "Pergunta na maternidade, olha sua certidão, ou pede pra família. Pode ser aproximada (15:00 em vez de 15:03) — só não pode faltar." |
| Onboarding submit | "Ler meu céu ✦" |
| App welcome heading | "Pronto, <name>. / O céu já te conhece." (second line italic in air color) |
| Welcome pulse | "Preparando seu mapa natal…" |
| Warmup pulse | "Lendo seu céu…" |
| Confirm banner | "Você já está dentro — mas confirma seu {email/telefone} pra não perder esse mapa." |
| Sinastry unknown-person prompt | "Eu ainda não conheço a <name>. Me passa os dados de nascimento dela e eu calculo a sinastria imediatamente." |
| Composer placeholder | "Pergunte ao Oráculo…" |
| Next-steps suggestions | "Comparar meu mapa com outra pessoa (sinastria)" · "Como o céu de hoje me afeta?" · "Falar mais sobre meu Marte" |

---

## State & data shape

### `me` object (current user)

```ts
type Me = {
  id: string;
  name: string;            // full
  short: string;           // first word, used in greetings/UI
  initial: string;         // single letter for avatar
  color: keyof Palette;    // 'earth' | 'water' | ...  — element-tinted avatar
  date: string;            // 'YYYY-MM-DD'
  time: string;            // 'HH:MM'
  city: string;
  contact: string;         // email or phone string
  contactKind: 'email' | 'phone';
  contactVerified: boolean;
  // Astrology summary — comes from /astrology/ask:
  sun: string;             // '♑'
  moon: string;
  asc: string;
  // ... per-planet positions, houses, aspects, etc.
};
```

### Conversation messages

```ts
type Message =
  | { role: 'user'; text: string; _id: string }
  | { role: 'assistant'; stream: NatalStream | SinastryStream;
      streamed?: boolean; _id: string }
  | { role: 'assistant'; isStatic: true;
      stub: { kind: 'ask-person-data'; name: string }; _id: string };

type NatalStream = {
  openerFirst: string;     // e.g. "Diogo," — rendered in italic accent
  opener: string;          // full opener including the openerFirst prefix
  body: string;            // continuation prose
  resultKind: 'natal';
  resultPerson: Me;
};

type SinastryStream = {
  openerFirst: '';
  opener: string;
  body: string;
  resultKind: 'sinastry';
  resultA: Me;
  resultB: Me;
};
```

### Today's sky

```ts
type TodaySky = {
  sun: string;     // '♑ Capricórnio'
  moon: string;    // '♉ Touro'
  phase: 'nova' | 'crescente' | 'cheia' | 'minguante';
};
```

Production: compute server-side from Swiss Ephemeris on every page
load (or cache per-day). The prototype mocks this from `new Date()`.

---

## Backend contract

This UI sits on top of the existing astrology system. Key endpoints:

- `POST /astrology/ask` — accepts a Portuguese natural-language prompt.
  Resolves person from vault, computes chart, writes interpretation,
  optionally delivers to Telegram/WhatsApp. The streaming UI should
  consume the response progressively (SSE / chunked) so the opener +
  body can be revealed as they're generated.
- Vault: people are resolved by name. **Make the vault invisible** as a
  product concept (no "vault" tab, no exposed list). The prototype's
  `AskPersonInline` is the only surfacing — when the user asks for a
  sinastry with an unknown name, prompt them inline for the birth data
  and persist it to the vault behind the scenes.
- Telegram/WhatsApp: connect-later flows behind the `ChannelsModal`.
  Not on the initial signup path.

---

## Decisions log (the "why" — don't undo these)

1. **One CTA on landing, no channel picker**. Telegram and WhatsApp are
   delivery channels, not entry points. Mixing them on the landing
   confuses the user about where the actual experience lives (web).
2. **One form**, contact + birth data combined. The user explicitly
   asked for this. Don't split it again.
3. **Contact verification is async, doesn't block access**. The user
   gets into the product immediately. The magic link runs in parallel
   and `contactVerified` is updated when they click it. ConfirmBanner is
   the only nudge.
4. **Hora is obrigatória with educational explainer**. Without time we
   can't compute Ascendant or houses, which makes the reading
   structurally incomplete. Educate the user instead of accepting
   partial data.
5. **No "Pessoas" / vault tab**. The vault is an implementation detail.
   People accumulate as the user mentions them in sinastry questions;
   the inline form handles new ones. Not exposed as a feature.
6. **No conversation sidebar**. Single-conversation app for v0.
   Multi-thread comes later when usage data justifies it.
7. **No performative trace**. The old prototype showed five fake
   "resolving... calculating... interpreting..." lines. Replaced with a
   single warmup pulse. Don't add fake latency theater.
8. **Hide paid tier**. Backend doesn't have paid features yet. Don't
   advertise what doesn't exist.
9. **PT default, no EN toggle in chosen direction**. The interpreter
   only speaks Portuguese; the EN toggle was decorative.
10. **Chart from backend, animated via CSS in production**. The
    React-rendered wheel here is for prototype fidelity. Ship the
    Kerykeion SVG and apply the same layered reveal animation via CSS.

---

## Open / out of scope

- **Mobile responsive**: the prototype is desktop-first (no media
  queries). Production must do a proper mobile pass — most traffic will
  come from links shared on WhatsApp/Instagram on mobile. Specifically:
  landing collapses to single column, natal result card stacks chart
  above metadata, header simplifies to logo+avatar with TodaySky on a
  second row, composer goes full-width.
- **Internationalization**: PT only.
- **Trânsitos / retornos solares / composto**: not implemented;
  marked "em breve" in alternatives, removed entirely from the chosen
  direction.
- **Sinastry chart wheel**: backend doesn't generate this yet. The
  sinastry result is text-only.
- **Error states**: not designed. Cover: vault miss without inline ask,
  Kerykeion failure, network failure, expired magic link. Use the
  prevailing visual language (`fire`-colored mono caption + Spectral
  prose explainer).

---

## Files & where to look

When implementing each screen, read the corresponding prototype file:

| Screen / concern | File | Key functions |
| --- | --- | --- |
| Landing | `prototype/prototype-landing.jsx` | `Landing`, `AnnotatedChart`, `TodaySkyMini`, `Starfield`, `OraculoLogo` |
| Onboarding | `prototype/prototype-onboarding.jsx` | `Onboarding`, `TimeExplainer`, `Input`, `FieldLabel`, `Helper` |
| App shell | `prototype/prototype-app.jsx` | `App`, `AppHeader`, `ConfirmBanner`, `MenuRow`, `ModalShell` |
| Chat + streaming | `prototype/prototype-chat.jsx` | `StreamingExchange`, `WarmupPulse`, `Caret`, `NatalResultCard`, `InlineReading`, `SinastryResultCard`, `ActionChip` |
| Chat composer + suggestions | `prototype/prototype-app.jsx` | `ChatView`, `Composer`, `NextStepsHints`, `WelcomeIntro`, `AskPersonInline`, `InlineField`, `StaticAssistantBlock` |
| Chart wheel | `prototype/chart-wheel.jsx` | `ChartWheel`, `PLANETS`, `SIGNS`, `ASPECT_COLORS` |
| Tokens / data | `prototype/prototype-data.jsx` | `oraColors`, `oraFont`, `NATAL_*`, `SINASTRY_*`, `detectIntent` |
| Modals | `prototype/prototype-app.jsx` | `TelegramPreviewModal`, `ChannelsModal` |

The alternatives in `alternatives_explored/` are kept for reference only
— they show two paths not taken (a restrained editorial direction and a
parchment-manuscript direction). Useful if you ever want to revisit, but
not the spec.
