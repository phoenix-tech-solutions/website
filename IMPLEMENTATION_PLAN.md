# Phoenix Tech Solutions — Website Implementation Plan

**Status:** Ready for implementation
**Audience:** The engineer/agent building this site (GPT 5.6)
**Repo:** `pts-website` (currently empty except `node_modules/` and `.gitignore`)

---

## How to use this document

Read Parts 1–3 in full before writing any code. They define *why* the site looks the way it does; without them you will produce a generic site that technically satisfies Part 4 and fails the actual brief.

Part 4 onward is buildable spec. Every color, size, duration, and easing value here is deliberate. Do not "improve" them ad hoc. If you must deviate, deviate in a way that is consistent across the whole site.

**The single hardest requirement:** the site must not look AI-generated. Part 3.7 is an explicit blocklist. Treat it as a hard constraint, not a suggestion.

---

## Table of contents

**Part 1 — Context**
1.1 What Phoenix Tech Solutions is · 1.2 Audiences · 1.3 The credibility problem · 1.4 Facts to confirm

**Part 2 — Reference analysis**
2.1 What the five references have in common · 2.2 What we take from each

**Part 3 — Brand identity**
3.1 Thesis · 3.2 The phoenix problem · 3.3 Color · 3.4 Typography · 3.5 The signature device: dither · 3.6 Logo & mark · 3.7 Anti-patterns (blocklist) · 3.8 Voice

**Part 4 — Design system**
4.1 Tokens · 4.2 Type scale · 4.3 Layout & grid · 4.4 Surfaces & separation · 4.5 Motion · 4.6 Iconography

**Part 5 — Architecture**
5.1 Stack decisions · 5.2 Dependencies · 5.3 File tree · 5.4 Content model

**Part 6 — Components**
6.1 Primitives · 6.2 Brand components · 6.3 Layout components

**Part 7 — Pages, section by section**
7.1 Home · 7.2 Work · 7.3 Case study · 7.4 About · 7.5 Start a project · 7.6 Join · 7.7 Badge · 7.8 404

**Part 8 — Copy deck**

**Part 9 — Signature interactions**
9.1 Ember Field · 9.2 Dither resolve · 9.3 Cursor preview · 9.4 Mark animation

**Part 10 — Accessibility**

**Part 11 — Performance**

**Part 12 — Assets pipeline**

**Part 13 — Forms, SEO, deployment**

**Part 14 — Build order (phased)**

**Part 15 — Acceptance checklist**

---
---

# PART 1 — CONTEXT

## 1.1 What Phoenix Tech Solutions is

A student-run nonprofit that designs and builds websites and mobile apps for community organizations, **free of charge**. Fiscally sponsored by **The Hack Foundation** (d/b/a Hack Club), a 501(c)(3), **EIN 81-2908499**, via HCB.

Shipped and in-flight work (from the client tracker):

| Client | Type | Status | URL |
|---|---|---|---|
| Food4Lives (FCS Innovation Academy) | Website | Live | https://ia-food4lives.vercel.app/ |
| Champions Place — *Stories of Champions* | Website | Live | https://champions-stories.pages.dev/ |
| Re-Imagine Robotics | Website | Live | https://reimaginerobotics.org/ |
| SEWA Green Team | Website | Live | https://sewa-green-team.vercel.app/ |
| Hands of Hope | Website | Live | — |
| IT Summer Camp (Ms. Patel) | Website | Live | — |
| Re-Imagine Robotics | Mobile app | In progress | — |
| Science Olympiad | Website | In progress | — |
| Vihari | Website | In progress | — |
| Charith | Website | In progress | — |
| TSA | Website | Queued | — |

Read the two live sites before you build. They tell you what the work actually is: a hunger-relief club at a public STEM magnet school; a residential community for adults with disabilities publishing resident profile stories written by students. **This is not agency work. It is civic infrastructure for people who would otherwise have none.** The website must carry that weight.

Note the existing footer signature on client sites: *"Website made with ❤️ by Phoenix Tech Solutions."* We formalize this in Part 7.7.

## 1.2 Audiences

Ranked by importance. Every design decision resolves in favor of #1.

1. **A nonprofit director or club sponsor evaluating whether to trust PTS with their org's public face.** Often 40–65, non-technical, mildly skeptical that students can do this. Needs: proof of shipped work, a sense of process, reassurance that they won't be abandoned. **Will judge PTS's own site as the work sample.**
2. **A student considering joining.** Needs: this looks like something serious to be part of.
3. **A donor / grant reviewer.** Needs: legitimacy signals — fiscal sponsorship, EIN, real numbers.
4. **A peer / other student org.** Needs: this is impressive.

## 1.3 The credibility problem (the core design brief)

PTS sits between two failure modes:

- **Too "student":** school colors, cutesy illustration, Comic-adjacent type, "we're a group of passionate high schoolers!!" → a director will not hand over their organization's website.
- **Too "agency":** dark mode, violet gradients, glass cards, "We craft digital experiences that empower brands." → indistinguishable from ten thousand template sites; destroys the authenticity that makes people *want* to work with PTS.

**The resolution:** design PTS as a **small, serious craft studio** — a letterpress shop, an architecture office, a print house. Warm, tactile, precise, made by hand. Craft communicates seriousness without corporate coldness, and it is *honest*: they genuinely make each thing by hand for one client at a time.

The "we're students" reveal is then **deployed as a strength, late** — on the About page, after credibility is established by the work. Never in the hero.

## 1.4 Facts to confirm before launch

Mark these in code as `// TODO(confirm)` and surface them to the PTS team. Do not invent values.

- [ ] Founding year (plan assumes **2024** — used in eyebrow and impact band)
- [ ] Home base / city (plan assumes **Atlanta, GA** — inferred from Fulton County school clients)
- [ ] Exact legal/display name: **"Phoenix Tech Solutions"** (plural — confirmed from Food4Lives footer)
- [ ] Impact stats. The plan seeds **6 sites live · 10 organizations · $0** from the tracker. Confirm, and add the student headcount and (if tracked) volunteer hours.
- [ ] Team roster: names, roles, headshots, pronouns
- [ ] HCB public donation URL (`https://hcb.hackclub.com/donations/start/<slug>`)
- [ ] Contact email + custom domain (check availability: `phoenixtechsolutions.org`)
- [ ] Missing project URLs (Hands of Hope, IT Summer Camp)
- [ ] Written permission + a real quote from at least one partner org

---
---

# PART 2 — REFERENCE ANALYSIS

You were given five references. Here is what they actually teach, so you extract principles rather than copying screenshots.

## 2.1 What all five have in common

1. **A signature image treatment.** Every one applies a consistent, non-photographic texture — dot-matrix weave, halftone, 1-bit dither, pixel dissolve. This is the strongest shared move. It makes wildly different source images belong to one brand.
2. **Warm or near-white grounds, never pure `#FFF`, never dark-mode-default.**
3. **Extreme typographic contrast.** A large expressive display face against small, quiet, precise sans/mono. Nothing in between.
4. **Hairlines and negative space instead of cards and shadows.** Not one drop shadow across all five.
5. **Almost no color.** Monochrome plus, at most, one accent.
6. **Black pill primary button + light/outlined pill secondary.** Universal across four of five.
7. **Content is sparse and confident.** Big claims, few words, enormous breathing room.

## 2.2 What we take from each

| Ref | The move | How we use it |
|---|---|---|
| **Nexus** (@oriku175) | Editorial art direction; serif *italic* as an accent inside a sans headline; a color story presented as flat swatch bands; disciplined bone/off-white ground. | Italic-serif accent word inside headlines (Part 8). Bone ground. |
| **runcycle** (@colehardik) | Inverted hero — full-bleed treated image band on top, headline *below* it; grayscale logo/name wall; the *same* weave treatment across four totally different images. | The Work index hero and case-study heroes invert this way. Consistent dither across every client screenshot. |
| **Isobar / velor** (@talhadesignn) | **Closest match to our target.** Warm paper ground with faint dot grid; monochrome dithered landscape *dissolving into the background* rather than sitting in a box; mono type for functional labels; KPI stat row on hairlines; black pill + white outlined pill. | This is our primary visual model. Adopt the stat row, the mono labels, the button pair, and the edge-dissolving dither wholesale (re-expressed in our palette). |
| **Stencil footer** (@socoloffalex) | The footer is an *environment*, not a link slab — full-bleed image, oversized closing line, single CTA, nav laid into the scene, dot dissolve at the boundary. | Our closing CTA + footer is one continuous environment (Part 7.1 §9). |
| **@fw3d** | One memorable interactive centerpiece with almost no surrounding chrome. The site *is* the interaction. | The **Ember Field** hero canvas (Part 9.1). Exactly one such moment on the site. |

**Do not** copy the classical-oil-painting art direction of Nexus/runcycle. It is a current trend and would date immediately, and it has nothing to do with what PTS does.

---
---

# PART 3 — BRAND IDENTITY

## 3.1 Thesis

> **Phoenix Tech Solutions is a workshop.** Warm paper, ash ink, one ember. Everything is made by hand, one organization at a time. The site should feel like a well-set letterpress specimen book that happens to be about software.

Three words that govern every decision: **Warm. Precise. Unembellished.**

## 3.2 The phoenix problem

The name invites the worst possible design: orange-to-red gradients, flame icons, a stylized bird. **Reject all of it.** Every mediocre tech brand in the last decade has used that palette.

The interesting reading of a phoenix is not *fire*. It is **renewal**. PTS's clients typically have no website, or a dead one from 2011. PTS brings them back.

So the phoenix is expressed as **ash → ember → rising**, never as flame:

- **Ash** is the dominant ink (warm near-black, not blue-black).
- **Bone/paper** is the ground.
- **Ember** is a single accent used at **under 3% of surface area** — a warm burnt brick, not a bright orange.
- **Rising** is the motion language: things resolve upward, dither ramps ascend, the mark dissolves upward.

That is the entire concept, and it is enough. There is no bird anywhere on this site.

## 3.3 Color

Restrained on purpose. Six ash steps, two grounds, two embers. **That is the whole palette.** No blues, no greens, no purples, no semantic color system beyond a single ember status.

```css
/* Grounds */
--bone:        #F4EFE6;  /* primary page ground — warm paper */
--bone-raised: #FAF7F1;  /* raised panels, inputs, footer inset */
--bone-sunk:   #EDE6D9;  /* rare: recessed bands, table zebra */

/* Ink — warm ash, never blue-black */
--ash-900:     #14120F;  /* primary text, inverted surfaces */
--ash-700:     #3A352E;  /* strong secondary text */
--ash-500:     #6B6459;  /* body secondary, captions — AA on bone (5.1:1) */
--ash-300:     #A9A093;  /* DECORATIVE ONLY — fails contrast, never text */
--ash-200:     #DDD5C8;  /* hairlines */
--ash-100:     #E7E0D3;  /* faint fills, dot grid */

/* Ember — the single accent */
--ember:       #BF3B1E;  /* on bone. 4.74:1 — AA for text ≥16px */
--ember-lift:  #E8663F;  /* on ash-900 ONLY. 5.65:1 — AA */
--ember-wash:  #F0DCD3;  /* faintest tint, for hover fills on bone */
```

**Contrast reference (verified):**

| Pair | Ratio | Use |
|---|---|---|
| `ash-900` on `bone` | 16.2:1 | All primary text |
| `ash-500` on `bone` | 5.1:1 | Body secondary — AA ✅ |
| `ash-300` on `bone` | 2.3:1 | ❌ Never text. Rules and decoration only. |
| `ember` on `bone` | 4.7:1 | AA for normal text ✅ |
| `ember` on `ash-900` | 3.4:1 | ❌ Body text. Large text only. Prefer `ember-lift`. |
| `ember-lift` on `ash-900` | 5.7:1 | AA ✅ |
| `bone` on `ash-900` | 16.2:1 | Inverted sections ✅ |

**Ember budget.** Ember may appear in: the top square of the mark; one word or rule per major section; the active nav indicator; focus rings; form focus states; in-progress status dots; the hot cells of the Ember Field. **Never** as a large fill, never as a button background (primary buttons are ash), never on two adjacent elements.

**No dark mode toggle.** Set `color-scheme: light`. The brand is a warm paper ground; a dark theme would be a different, weaker brand, and doubles QA surface for zero user benefit here. Dark appears only as *deliberate inverted bands* (impact section, footer environment) — which is a compositional device, not a theme.

## 3.4 Typography

Three faces, each with one job. All OFL-licensed and self-hosted — no Google Fonts CDN (privacy, and it costs a render-blocking third-party connection).

| Role | Face | Weights | Where |
|---|---|---|---|
| **Display** | **Instrument Serif** | 400, 400 italic | H1/H2, pull quotes, big numerals, italic accent words. High-contrast, editorial, quietly authoritative. |
| **Text / UI** | **Instrument Sans** (variable) | 400–600 | Body copy, subheads, buttons, nav. Neutral with a hint of warmth; designed alongside Instrument Serif so the pairing is intentional, not accidental. |
| **Technical** | **IBM Plex Mono** | 400, 500 | Eyebrows, labels, indices (`01`), metadata, stats, form labels, statuses, footer legal. Reads "engineering document," not "AI startup." |

**Why this trio:** Serif carries the institutional weight a nonprofit director needs. Sans stays out of the way. Mono is the craft/precision signal and does the heaviest brand lifting of the three — it appears more often than the serif.

**Rules:**
- Never more than two faces *dominant* in one viewport (mono labels don't count).
- Mono is **only** ever used at ≤13px, uppercase, `letter-spacing: 0.14em`. Never for sentences.
- Italic serif appears **once per page maximum**, inside a headline, on the single most important word.
- Never set the sans in uppercase.
- Numerals in stats: Instrument Serif, `font-variant-numeric: tabular-nums`.

**Fallback stacks (metric-matched, prevents CLS):**
```css
--font-serif: "Instrument Serif", "Iowan Old Style", Georgia, "Times New Roman", serif;
--font-sans:  "Instrument Sans", ui-sans-serif, system-ui, "Segoe UI", Helvetica, Arial, sans-serif;
--font-mono:  "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace;
```

Install via Fontsource (self-hosted, no CDN):
```bash
npm i @fontsource/instrument-serif @fontsource-variable/instrument-sans @fontsource/ibm-plex-mono
```
Import only the subsets used (`latin`, weights 400/500/600 + serif italic) in `src/styles/fonts.css`. Add `font-display: swap` and preload the two above-the-fold files (Instrument Serif 400, Instrument Sans variable) in `index.html`.

## 3.5 The signature device: dither

**Every image on this site is presented in two states: a 1-bit dithered version and the true version.**

This is the brand's one big idea, and it does four jobs at once:

1. **It unifies.** Client screenshots are the biggest visual liability on any portfolio site — twelve sites with twelve different color schemes, some of them rough. Dithering them all to ash-on-bone makes them one family. This alone justifies the device.
2. **It's the concept made visual.** Ash → resolved. Dormant → alive. That is literally what PTS does for an organization.
3. **It's craft.** Halftone and dither are print-shop techniques. It reinforces "workshop," and it is unmistakably deliberate — nobody accidentally dithers an image.
4. **It's fast.** A 1-bit PNG of a screenshot is 15–40KB. It becomes the placeholder that loads first.

**The interaction (Part 9.2):** a project thumbnail sits dithered. On hover / on scroll-into-view, it **resolves** into full color from the bottom up. This is the site's memorable moment and it appears on the Work index, the Selected Work section, case-study heroes, and team portraits.

**Palette rule:** dithered output is **`ash-900` dots on `bone`** — never pure black on white. Team portraits and the footer environment may use `ash-900` on `bone` with ember-tinted highlights in the lightest 5% of the ramp.

**Where dither is used**
- Every client screenshot (index + case studies)
- Team portraits
- The footer / closing-CTA environment image
- The Ember Field hero (procedural, not image-based)

**Where dither is NOT used**
- Anything the user must read
- The mark (it *is* a dither ramp, but drawn as clean vector squares)
- Any UI surface

## 3.6 Logo & mark

### The mark — "The Rise"

A **5×5 dither ramp**: a grid of squares whose density decreases upward. Bottom row solid, top row a single square. It reads as something dissolving upward — or a spark rising. The top square is **ember**; the rest are **ash-900**.

It is the brand device (dither), the concept (rising from ash), and the palette (ash + one ember) compressed into fifteen squares. It scales to a 16px favicon, prints in one color, and animates naturally.

```
row 0 (top)   · · ■ · ·     1 square   ← this one is EMBER
row 1         · ■ · ■ ·     2 squares
row 2         ■ · ■ · ■     3 squares
row 3         ■ ■ · ■ ■     4 squares
row 4 (base)  ■ ■ ■ ■ ■     5 squares
```

Exact SVG (`src/components/brand/Mark.tsx`) — 3px cells, 1px gutters, `viewBox="0 0 19 19"`:

```tsx
const CELLS: [number, number][] = [
  [2,0],
  [1,1],[3,1],
  [0,2],[2,2],[4,2],
  [0,3],[1,3],[3,3],[4,3],
  [0,4],[1,4],[2,4],[3,4],[4,4],
];
// x = col * 4, y = row * 4, width = height = 3
// CELLS[0] (the [2,0] apex) is fill=var(--ember); all others fill=currentColor
```

**Do not** add a circle, shield, container, bird, flame, or gradient. Do not round the corners of the squares.

### Wordmark

"Phoenix Tech Solutions" in **Instrument Sans 500**, `letter-spacing: -0.015em`. In the nav lockup, use "**Phoenix**" in 500 + "**Tech Solutions**" in 400 at `ash-500` — a two-tone wordmark, the same move as `run`+`cycle` in the runcycle reference. Compact contexts: "PTS" in mono is acceptable only for the favicon and the badge.

**Lockup:** mark at 20px, 10px gap, wordmark. Mark is always left of the wordmark, never above.

### Clear space & minimums

Clear space = one grid cell (mark height ÷ 5) on all sides. Minimum mark size: 16px. Minimum lockup width: 132px (below that, mark only).

## 3.7 Anti-patterns — the blocklist

The user's explicit requirement: *"nothing should look vibe-coded."* These are the tells. **Every item is prohibited.**

**Visual**
- ❌ Gradient backgrounds of any kind — linear, radial, mesh, animated blobs, "aurora." *(Sole exception: the dither reveal mask and the paper grain.)*
- ❌ Glassmorphism, `backdrop-filter: blur()` on cards. *(Sole exception: the nav bar on scroll, at ≤8px blur.)*
- ❌ `box-shadow` — anywhere, on anything. Depth comes from hairlines and surface inversion.
- ❌ Purple, indigo, violet, electric blue, neon anything.
- ❌ Rounded corners on containers, images, sections, or cards. See the radius rule below.
- ❌ Icons inside rounded squares or circles. Icons inside colored tinted boxes.
- ❌ Emoji used as iconography.
- ❌ Generic stock photography. Only real screenshots and real people.
- ❌ Dark hero + light body (the default agency template).
- ❌ Decorative dots/lines/grids scattered "for texture" without system meaning.

**Layout**
- ❌ Three-column feature grids of `[icon] [title] [two lines of text]` in a bordered card.
- ❌ Bento grids.
- ❌ Carousels, sliders, marquees. *(One exception: the proof strip may auto-scroll — but static is preferred.)*
- ❌ Full-width centered-text sections stacked more than twice in a row.
- ❌ Testimonial grids of 3–6 cards with avatars and star ratings.
- ❌ "As seen in / Trusted by" with fake logos.

**Motion**
- ❌ Every element fading up on scroll. Reveal is for headlines and images only.
- ❌ Parallax on more than one element per page.
- ❌ JS smooth-scroll libraries (Lenis, Locomotive). Native scroll only — hijacking it breaks accessibility and reads as a template.
- ❌ Typewriter/word-cycling headline effects.
- ❌ Custom cursors that replace the system cursor. *(The hover preview in 9.3 augments; it does not hide the cursor.)*
- ❌ Any animation longer than 1200ms.

**Copy**
- ❌ Banned words: *seamless, empower, leverage, cutting-edge, revolutionize, elevate, unlock, transform your, in today's digital world, we're passionate about, solutions that scale, journey, ecosystem, holistic, bespoke, curated.*
- ❌ Sentences that could describe any organization.
- ❌ Exclamation marks (max one on the entire site, on the Join page).
- ❌ Em-dash-heavy AI cadence. Vary sentence length; use periods.

### The radius rule (memorize this)

> **Everything is square, except the things you press.**

`border-radius: 0` on every container, image, panel, section, and rule. `border-radius: 999px` on buttons, pills, chips, and inputs. There is no in-between value anywhere in this codebase. This single rule does more brand work than any other and is trivially enforceable in review.

## 3.8 Voice

**Plain, specific, slightly dry, never boastful.** The confidence comes from facts, not adjectives.

| Instead of | Write |
|---|---|
| "We empower nonprofits with cutting-edge digital solutions." | "We build websites for organizations that can't afford one." |
| "Our seamless process ensures results." | "Four weeks, usually. Two calls. You approve everything before it ships." |
| "Passionate student developers." | "Fourteen students. Nine shipped sites." |
| "Get in touch today!" | "Tell us about your organization." |

Rules: second person for the client ("your organization"), first person plural for PTS. Never third-person self-reference ("Phoenix Tech Solutions believes…"). Numbers over adjectives. Say the price is $0 plainly and repeatedly — it is the most persuasive fact PTS has and it should never be softened into "at no cost to you."

---
---

# PART 4 — DESIGN SYSTEM

## 4.1 Tokens

`src/styles/tokens.css` — the single source of truth. Tailwind v4 reads these via `@theme`.

```css
@import "tailwindcss";

@theme {
  /* ── Color ─────────────────────────────── */
  --color-bone:        #F4EFE6;
  --color-bone-raised: #FAF7F1;
  --color-bone-sunk:   #EDE6D9;
  --color-ash-900:     #14120F;
  --color-ash-700:     #3A352E;
  --color-ash-500:     #6B6459;
  --color-ash-300:     #A9A093;
  --color-ash-200:     #DDD5C8;
  --color-ash-100:     #E7E0D3;
  --color-ember:       #BF3B1E;
  --color-ember-lift:  #E8663F;
  --color-ember-wash:  #F0DCD3;

  /* ── Type ──────────────────────────────── */
  --font-serif: "Instrument Serif", "Iowan Old Style", Georgia, serif;
  --font-sans:  "Instrument Sans", ui-sans-serif, system-ui, "Segoe UI", sans-serif;
  --font-mono:  "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;

  /* ── Radius (only two legal values) ────── */
  --radius-none: 0px;
  --radius-pill: 999px;

  /* ── Motion ────────────────────────────── */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.30, 1);
  --ease-in-out:   cubic-bezier(0.65, 0, 0.35, 1);
  --ease-out-soft: cubic-bezier(0.33, 1, 0.68, 1);
  --dur-fast:   180ms;
  --dur-base:   380ms;
  --dur-slow:   720ms;
  --dur-reveal: 1100ms;

  /* ── Layout ────────────────────────────── */
  --container:   1360px;
  --measure:     68ch;      /* max line length for prose */
  --gutter:      clamp(1.25rem, 4vw, 3.5rem);
  --gap:         clamp(1rem, 2vw, 2rem);
  --space-section: clamp(6rem, 10vw, 11rem);
  --hairline:    1px;
  --nav-h:       72px;
}
```

## 4.2 Type scale

Fluid via `clamp()`. Define as utility classes in `global.css`, not inline.

| Token | Face | Size | Line-height | Tracking | Use |
|---|---|---|---|---|---|
| `.t-display-xl` | serif 400 | `clamp(3.25rem, 1.4rem + 7.4vw, 7.5rem)` | 0.94 | −0.03em | Home H1 only |
| `.t-display-l` | serif 400 | `clamp(2.5rem, 1.2rem + 5vw, 4.75rem)` | 1.00 | −0.025em | Page H1, closing CTA |
| `.t-display-m` | serif 400 | `clamp(2rem, 1.2rem + 3vw, 3.25rem)` | 1.06 | −0.02em | Section H2, pull quotes |
| `.t-heading` | sans 500 | `clamp(1.375rem, 1.1rem + 1.2vw, 1.875rem)` | 1.18 | −0.015em | Subsection H3 |
| `.t-title` | sans 500 | `1.125rem` | 1.35 | −0.01em | Card/row titles |
| `.t-body-l` | sans 400 | `clamp(1.0625rem, 1rem + 0.3vw, 1.1875rem)` | 1.62 | 0 | Hero sub, lead paragraphs |
| `.t-body` | sans 400 | `1rem` | 1.70 | 0 | Default body |
| `.t-small` | sans 400 | `0.875rem` | 1.60 | 0 | Captions |
| `.t-mono` | mono 500 | `0.75rem` | 1.40 | 0.14em | Labels, metadata — **uppercase** |
| `.t-mono-sm` | mono 400 | `0.6875rem` | 1.40 | 0.16em | Indices, footer legal — **uppercase** |
| `.t-numeral` | serif 400 | `clamp(2.75rem, 2rem + 3.5vw, 4.5rem)` | 1.0 | −0.02em | Stat figures, `tabular-nums` |

`.t-display-*` must always have `text-wrap: balance`. Prose blocks get `text-wrap: pretty` and `max-width: var(--measure)`.

## 4.3 Layout & grid

- **Container:** `max-width: var(--container)`, `padding-inline: var(--gutter)`, centered.
- **Grid:** 12 columns, `gap: var(--gap)`. Collapses to 6 at `<1024px`, 4 at `<640px`.
- **The editorial default:** content occupies **columns 1–7**; a **metadata rail** in mono sits at **columns 9–12**. This asymmetry, used consistently, is what makes the site read as designed rather than assembled. Use it for: What We Do items, case-study intros, About sections, process steps.
- **Breakpoints:** `sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536`.
- **Section rhythm:** every top-level section gets `padding-block: var(--space-section)`. Adjacent sections on the same ground are separated by a **hairline**, never by extra whitespace alone.
- **Full-bleed:** the impact band, the proof strip, and the footer environment break the container. Everything else stays inside it.

## 4.4 Surfaces & separation

Only four surfaces exist:

1. **Bone** — default page ground.
2. **Bone-raised** — form inputs, the footer inset panel, hover states of list rows.
3. **Ash-900 (inverted)** — the impact band and the footer environment. Text becomes `bone`; accents become `ember-lift`. **Maximum two inverted regions per page.**
4. **Dither** — image regions.

Separation is achieved by, in order of preference:
1. A **hairline** (`1px solid var(--color-ash-200)`)
2. **Whitespace** (`var(--space-section)`)
3. **Surface inversion**

Never by: borders on all four sides of a box, shadows, or a background tint.

**Hairline discipline.** Hairlines are structural. Use full-bleed rules to divide sections and short rules to divide list items. Never place a hairline *and* a background change *and* padding on the same boundary — pick one.

**The dot grid.** A faint `ash-100` 24px dot grid may sit behind the hero and the closing CTA at **4% opacity** — the paper-texture cue from the Isobar reference. It appears in exactly those two places and nowhere else.

## 4.5 Motion

**Philosophy:** motion confirms the material, it doesn't decorate. Things **resolve** (dither → color) and **rise** (mask up). Nothing slides in from the side. Nothing bounces. Nothing spins.

Five named motions. There are no others.

| Name | What | Values |
|---|---|---|
| **M1 · Rise** | Headline reveal. Each line clipped by an overflow-hidden wrapper, `translateY(100%) → 0`. | `--dur-slow` (720ms), `--ease-out-expo`, 70ms stagger per line |
| **M2 · Resolve** | Dither → full color. See 9.2. | `--dur-reveal` (1100ms), `--ease-out-soft` |
| **M3 · Draw** | Hairline appears: `scaleX(0) → 1`, `transform-origin: left`. | `--dur-slow`, `--ease-out-expo` |
| **M4 · Warm** | Hover on interactive elements: color/background shift only. No transform, no scale. | `--dur-fast` (180ms), `--ease-in-out` |
| **M5 · Count** | Stat numerals count up from 0 when 60% in view, once. | 1400ms, `--ease-out-soft`, `tabular-nums` to prevent width jitter |

**Rules**
- Trigger reveals at `rootMargin: "0px 0px -12% 0px"`, `threshold: 0.15`, and **`once: true`**. Elements must never re-animate on scroll-back.
- **Never animate every child of a section.** Reveal the headline and the primary image. Body copy appears with them, not separately staggered.
- No `transform: scale()` on hover, anywhere.
- Page transitions: a 220ms opacity fade only. No shared-element or curtain transitions.

**`prefers-reduced-motion: reduce`** — a hard requirement, not a nicety:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
Additionally, in JS: the Ember Field renders **one static frame** and stops its RAF loop; Resolve renders the **full-color** state immediately; Count shows the final value.

## 4.6 Iconography

Almost none. The site uses **type and rules**, not icons.

Permitted, at 16px, `stroke-width: 1.25`, `currentColor`, square caps:
- Arrow (→ and ↗ for external links)
- Plus / minus (accordions, if any)
- Close (×, mobile menu)
- Menu (two lines, not three)

Everything else — process steps, service types, values — is numbered in mono (`01`, `02`, `03`). No icon library. Hand-write these four as inline SVG in `src/components/primitives/Icon.tsx`.

---
---

# PART 5 — ARCHITECTURE

## 5.1 Stack decisions

| Decision | Choice | Why |
|---|---|---|
| Build tool | **Vite 6** | Already in `node_modules`. Fast, no framework overhead for an 8-page site. |
| Framework | **React 19** + **TypeScript 5.8** | Already installed; the team knows it. |
| Routing | **React Router 6.30** (`createBrowserRouter`) | Already installed. |
| Styling | **Tailwind CSS v4** (`@tailwindcss/vite`) | Already installed. v4's `@theme` maps 1:1 onto our token file. |
| Animation | **`motion`** (Framer Motion v12 package) | Reliable reveal/stagger primitives; ~34KB gz for the subset used. Import from `motion/react`. |
| Rendering | **SPA**, prerender in Phase 2 | See below. |
| 3D | **Removed** | See below. |

**Remove `three`, `@react-three/fiber`, `@react-three/drei`, `@dimforge/rapier3d-compat`, `@mediapipe/*`, `maath`, `@use-gesture/react`.** They are leftovers from the wiped build. The hero centerpiece is a **2D canvas** (Part 9.1): it is more on-brand (print texture, not glossy 3D), roughly 700KB lighter, and dramatically easier to make performant on the mid-range Android phones a lot of this audience uses. Do not reintroduce WebGL.

**SPA vs. prerender.** Ship a plain SPA first. Rationale: eight routes, and the dominant discovery paths are word-of-mouth and the "Built by Phoenix Tech Solutions" backlink from client sites — not organic search. Static OG tags in `index.html` cover the homepage, which is ~90% of shares. Per-route `<title>`/`<meta>` are handled by a small `useDocumentHead` hook.
Phase 2 (post-launch, optional): add `vite-react-ssg` to prerender all routes to static HTML for per-route OG cards and better crawlability. Do not attempt this in Phase 1 — it is the highest-risk item in the plan and blocks nothing.

## 5.2 Dependencies

```bash
# Clean slate — node_modules is stale
rm -rf node_modules package-lock.json

npm init -y
npm i react@^19.1.0 react-dom@^19.1.0 react-router-dom@^6.30.1 motion@^12
npm i @fontsource/instrument-serif @fontsource-variable/instrument-sans @fontsource/ibm-plex-mono
npm i -D vite@^6.3.5 @vitejs/plugin-react-swc@^3.9.0 typescript@^5.8.3 \
         @types/react @types/react-dom \
         tailwindcss@^4.1.7 @tailwindcss/vite@^4.1.7 \
         eslint @eslint/js typescript-eslint eslint-plugin-react-hooks \
         prettier sharp
npm i @vercel/analytics
```

`sharp` is a **dev** dependency, used only by the build-time dither script (Part 12).

`vite.config.ts`:
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: { target: "es2022", cssMinify: "lightningcss" },
});
```

## 5.3 File tree

```
pts-website/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── eslint.config.js
├── .prettierrc
├── IMPLEMENTATION_PLAN.md          ← this file
├── scripts/
│   └── dither.mjs                  ← build-time image pipeline (Part 12)
├── public/
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── apple-touch-icon.png
│   ├── site.webmanifest
│   ├── og.png                      ← 1200×630
│   ├── robots.txt
│   ├── sitemap.xml
│   └── media/
│       ├── work/<slug>/cover.webp · cover.dither.png · shot-01.webp · …
│       ├── team/<slug>.webp · <slug>.dither.png
│       └── env/dawn.webp · dawn.dither.png     ← footer environment
└── src/
    ├── main.tsx
    ├── App.tsx                     ← router + layout shell
    ├── styles/
    │   ├── tokens.css              ← @theme (Part 4.1)
    │   ├── fonts.css               ← @font-face / fontsource imports
    │   └── global.css              ← reset, type utilities, base
    ├── lib/
    │   ├── cn.ts                   ← className joiner
    │   ├── useDocumentHead.ts      ← per-route title/meta
    │   ├── useInView.ts            ← IntersectionObserver, once:true
    │   ├── usePrefersReducedMotion.ts
    │   ├── useMediaQuery.ts
    │   └── motion.ts               ← shared variants + easings
    ├── content/
    │   ├── projects.ts
    │   ├── team.ts
    │   ├── stats.ts
    │   ├── services.ts
    │   ├── process.ts
    │   ├── testimonials.ts
    │   └── site.ts                 ← nav, socials, legal, contact
    ├── components/
    │   ├── primitives/
    │   │   ├── Button.tsx  Chip.tsx  Rule.tsx  Eyebrow.tsx
    │   │   ├── Container.tsx  Section.tsx  Grid.tsx
    │   │   ├── Prose.tsx  StatusDot.tsx  Icon.tsx
    │   │   ├── Field.tsx  Reveal.tsx  Counter.tsx
    │   ├── brand/
    │   │   ├── Mark.tsx  Wordmark.tsx  Lockup.tsx
    │   │   ├── Grain.tsx  DotGrid.tsx
    │   │   ├── EmberField.tsx      ← Part 9.1
    │   │   ├── DitherImage.tsx     ← Part 9.2
    │   │   └── BuiltByBadge.tsx    ← Part 7.7
    │   ├── layout/
    │   │   ├── Nav.tsx  MobileMenu.tsx  Footer.tsx
    │   │   ├── SkipLink.tsx  ScrollToTop.tsx
    │   └── sections/
    │       ├── Hero.tsx  ProofStrip.tsx  WhatWeDo.tsx
    │       ├── SelectedWork.tsx  WorkRow.tsx  ImpactBand.tsx
    │       ├── Process.tsx  PullQuote.tsx  ClosingCTA.tsx
    └── pages/
        ├── Home.tsx  Work.tsx  WorkDetail.tsx
        ├── About.tsx  Start.tsx  Join.tsx
        ├── Badge.tsx  NotFound.tsx
```

## 5.4 Content model

All content is typed TS in `src/content/`. **No CMS.** Adding a project must be a one-object edit.

```ts
// src/content/projects.ts
export type ProjectStatus = "live" | "building" | "queued";
export type ProjectKind   = "website" | "app";

export interface Project {
  slug: string;
  client: string;              // "Champions Place"
  title: string;               // "Stories of Champions"
  kind: ProjectKind;
  status: ProjectStatus;
  year: number;
  /** One line, ≤90 chars, plain language. Appears on the index row. */
  summary: string;
  /** Org category shown in the mono metadata rail, e.g. "Disability services" */
  sector: string;
  url?: string;                // omit when not live
  featured?: boolean;          // max 3 true — drives Home §5
  cover?: string;              // /media/work/<slug>/cover.webp
  /** Derived by convention: cover.replace(".webp", ".dither.png") */
  stack?: string[];            // ["React", "Tailwind", "Cloudflare Pages"]
  team?: string[];             // team slugs
  caseStudy?: {
    ask: string;               // what they needed
    made: string;              // what we built
    result: string;            // what changed
    shots: { src: string; alt: string; caption?: string }[];
  };
}

export const projects: Project[] = [ /* seed from the table in Part 1.1 */ ];

export const featured = projects.filter(p => p.featured);
export const live     = projects.filter(p => p.status === "live");
export const building = projects.filter(p => p.status === "building");
```

```ts
// src/content/stats.ts — every number here must be REAL. Confirm before launch.
// Derived from the tracker: 6 live · 4 in progress · 1 queued · 10 distinct orgs
// (Re-Imagine Robotics counts once as an org, twice as a project).
export const stats = [
  { value: 6,  suffix: "",  label: "Sites live" },
  { value: 10, suffix: "",  label: "Organizations served" },
  { value: 0,  prefix: "$", label: "Charged, ever" },
] as const;
```

`team.ts` (`slug, name, role, pronouns?, photo, bio?`), `services.ts` (`index, title, body`), `process.ts` (`index, title, body, duration`), `testimonials.ts` (`quote, name, role, org`), `site.ts` (nav items, contact email, HCB donate URL, legal string, social links).

---
---

# PART 6 — COMPONENTS

## 6.1 Primitives

### `Button`
```ts
type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  href?: string;          // renders <a>; external gets target+rel+↗
  as?: "link";            // renders react-router <Link>
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
```
- **primary** — `bg-ash-900 text-bone`, hover `bg-ash-700`. Pill radius.
- **secondary** — `bg-bone-raised text-ash-900 border border-ash-200`, hover `border-ash-500`. Pill radius.
- **ghost** — text + a 1px underline offset 4px, hover `color: ember`. No pill.
- Sizes: `md` = 40px tall / 20px inline padding / 0.9375rem; `lg` = 52px / 28px / 1rem.
- Sans 500. **No transform on hover** (M4 only). Focus: `outline: 2px solid var(--color-ember); outline-offset: 3px`.
- On inverted surfaces: primary flips to `bg-bone text-ash-900`.

### `Eyebrow`
Mono uppercase label. Optional leading ember square (6×6px). Props: `{ children, accent?: boolean }`.

### `Rule`
`<hr>` replacement. Props: `{ tone?: "default" | "strong"; animated?: boolean }`. `default` = `ash-200`; `strong` = `ash-500`. `animated` applies **M3 · Draw** on in-view.

### `Section`
`{ id?, ground?: "bone" | "ash" | "raised", bleed?: boolean, ruleTop?: boolean, children }`. Applies `padding-block: var(--space-section)` and, when `ground="ash"`, sets the inverted color context.

### `Grid`
12-col CSS grid wrapper. Children position via `col-span-*` / `col-start-*`. Provide a `<Grid.Editorial>` compound that renders the standard 1–7 content / 9–12 rail split described in 4.3.

### `Prose`
Long-form wrapper: `max-width: var(--measure)`, `text-wrap: pretty`, styled `p / a / ul / strong / em`. Links: `ash-900`, `text-decoration: underline`, `text-underline-offset: 3px`, `text-decoration-color: var(--color-ash-300)`; hover → `ember`, decoration color `ember`.

### `StatusDot`
6px square (**not** a circle — the radius rule). `live` = `ash-500`; `building` = `ember` + a 2.4s opacity pulse (`0.45 → 1`), disabled under reduced-motion; `queued` = `ash-300` outline only.

### `Reveal`
Wraps children in **M1 · Rise**. `{ as?, delay?, lines?: boolean, children }`. With `lines`, splits on `<br>`/child elements and staggers 70ms. Uses `useInView` + `motion/react`. Under reduced motion, renders children with no wrapper transform.

### `Counter`
**M5 · Count**. `{ value, prefix?, suffix?, duration? }`. `tabular-nums`. Announces the final value to screen readers via `aria-label`; the animating text is `aria-hidden`.

### `Field`
Form input. **Underline style, not boxed** — this is a deliberate brand choice.
- Label: mono uppercase, `ash-500`, above the input.
- Input: transparent background, `border-bottom: 1px solid var(--color-ash-200)`, `padding-block: 10px`, sans 400 16px (never smaller — prevents iOS zoom).
- Focus: `border-bottom-color: var(--color-ember)`, `border-bottom-width: 2px`, plus a visible focus ring.
- Error: `border-bottom-color: var(--color-ember)`, message in mono `ember` below, `aria-describedby` wired.
- `<textarea>` gets a 1px `ash-200` box (a bottom rule alone reads broken at height) — this is the **one** exception to the underline rule.

### `Chip`
Filter pill for the Work index. Pill radius, mono uppercase 11px. Inactive: `border ash-200`, `ash-500`. Active: `bg-ash-900 text-bone`. Implement as a real `<button role="tab">` set with arrow-key navigation.

## 6.2 Brand components

### `Mark` / `Wordmark` / `Lockup`
Per 3.6. `Mark` props: `{ size?: number; animated?: boolean }`. When `animated`, squares fade+rise bottom-to-top, 40ms stagger, once on mount. Ember apex square gets a 3s `opacity: 0.75 → 1` breathe. `<title>` inside the SVG: "Phoenix Tech Solutions".

### `Grain`
Fixed full-viewport paper texture. **Implementation: a 128×128 tiled PNG data-URI**, `background-repeat: repeat`, `opacity: 0.035`, `mix-blend-mode: multiply`, `pointer-events: none`, `position: fixed`, `inset: 0`, `z-index: 1`, `will-change: auto`.
Generate the tile once with the dither script; **do not** use a full-viewport `<svg><feTurbulence>` filter — it repaints on scroll and destroys mobile performance. Disable entirely below 640px width.

### `DotGrid`
`background-image: radial-gradient(var(--color-ash-100) 1px, transparent 1px)`, `background-size: 24px 24px`, `opacity: 0.4`. Absolutely positioned, `pointer-events: none`. Hero and Closing CTA only. *(This is the one permitted use of a gradient function, and it produces dots, not a gradient.)*

### `EmberField` — Part 9.1
### `DitherImage` — Part 9.2
### `BuiltByBadge` — Part 7.7

## 6.3 Layout components

### `Nav`
- Height `--nav-h` (72px), `position: sticky; top: 0; z-index: 50`.
- **At top of page:** transparent background, no rule.
- **After 24px of scroll:** `background: color-mix(in srgb, var(--color-bone) 88%, transparent)`, `backdrop-filter: blur(8px)`, `border-bottom: 1px solid var(--color-ash-200)`. Transition 240ms.
- Layout: `Lockup` left · nav links center-right · `Button size="md" variant="primary"` ("Start a project") far right.
- Links: sans 400 0.9375rem, `ash-700`. Hover → `ash-900`. **Active route:** a 1px `ember` rule 6px beneath the label, animated in with M3.
- Below `lg`: links collapse into a menu button (two lines).

### `MobileMenu`
Full-screen `ash-900` overlay. Links as `.t-display-m` in **serif**, stacked, each prefixed with a mono index (`01`, `02`…) in `ash-500`. Staggered rise-in at 60ms. CTA pill at the bottom. Traps focus; `Esc` closes; `body { overflow: hidden }` while open; restores focus to the trigger on close.

### `Footer`
Not a standalone slab — it is the lower half of the **closing environment** (see 7.1 §9). Structure:
- Full-bleed dithered dawn-horizon image, `ash-900` overlaid, dot-dissolving at the top edge into bone.
- A `bone-raised` **inset panel** floats over it (the Isobar move): `margin-inline: var(--gutter)`, square corners, `padding: clamp(2rem, 4vw, 3.5rem)`.
- Inside the panel: `Lockup` + one-line description (left, cols 1–4); three link columns (Work / Organization / Connect) with mono column headers; then a hairline; then the legal row.
- **Legal row** (mono-sm, `ash-500`):
  > © 2026 Phoenix Tech Solutions. A fiscally sponsored project of The Hack Foundation (d/b/a Hack Club), a 501(c)(3) nonprofit — EIN 81-2908499. Donations are tax-deductible in the United States.

### `SkipLink`
First focusable element. Visually hidden until focused, then pinned top-left with an ash background. Targets `#main`.

### `ScrollToTop`
On every route change, `window.scrollTo(0, 0)` and move focus to the `<h1>` (`tabIndex={-1}`) so screen-reader users land in the right place.

---
---

# PART 7 — PAGES, SECTION BY SECTION

## 7.1 Home — `/`

Nine sections. This is the most important page; build it last, after the system exists.

---

**§1 · Hero** — `min-height: calc(100svh - var(--nav-h))`, `display: grid; align-content: center`

Left, columns 1–6:
- `Eyebrow` — `EST. 2024 · ATLANTA, GA · FISCALLY SPONSORED BY HACK CLUB`
- `h1.t-display-xl` in **Reveal(lines)** — three lines, the italic accent on line 2:
  > Nonprofits do the hard part.
  > We handle *the website.*
- `p.t-body-l` at `max-width: 46ch`, `ash-500`
- Button pair: primary "Start a project" · secondary "See our work"

Right, columns 7–12: **`EmberField`** canvas, `aspect-ratio: 1`, bleeding to the right viewport edge. Beneath it, a `DotGrid` at 4%.

Below both, spanning the full container: a `Rule`, then a **three-item stat row** (mono labels, serif numerals) with vertical hairlines between items — the Isobar move exactly.

*Mobile:* EmberField moves above the headline, 45svh tall, full-bleed. Stat row stacks to a 3-column grid.

---

**§2 · Proof strip** — full-bleed, hairline top and bottom, `padding-block: 2.5rem`

Client **names** set in Instrument Serif 400 at 1.25rem, `ash-500`, spaced evenly, horizontally scrollable on mobile with no visible scrollbar. Preceded by an `Eyebrow`: `ORGANIZATIONS WE'VE BUILT FOR`. Names, not logos — most of these orgs don't have usable logos, and a row of mismatched logos looks worse than clean type. **Static, not a marquee.**

---

**§3 · What we do** — `Grid.Editorial`

`Eyebrow`: `WHAT WE DO`. `h2.t-display-m`: "Three things, done properly."

Three items, each on its own row, separated by full-width `Rule animated`. Each row: mono index (`01`) in col 1 · title `.t-heading` + body `.t-body` in cols 2–7 · a short mono detail line in cols 10–12.

**No cards. No icons. No borders.** The rules and the index numbers carry all the structure.

| # | Title | Body | Rail |
|---|---|---|---|
| 01 | Websites | "A real site on a real domain that loads fast and works on a phone. Design, build, content, and launch — we do all of it." | `4–6 WEEKS` |
| 02 | Apps | "When a website isn't enough. Native and cross-platform apps for iOS and Android, built and shipped to the stores." | `8–12 WEEKS` |
| 03 | The handoff | "We don't disappear. You get the code, a walkthrough, and a way to update your own content without calling us." | `INCLUDED` |

---

**§4 · Selected work**

`Eyebrow`: `SELECTED WORK` · `h2.t-display-m`: "Six sites live. Ten organizations."

Three featured projects as **large editorial rows**, alternating image left / image right. Each: `DitherImage` (7 cols, 4:3) · client name `.t-display-m` · summary `.t-body-l` · mono metadata rail (`SECTOR · YEAR · TYPE`) · ghost button "Read the case study →".

Images use **M2 · Resolve** on scroll-into-view *and* re-resolve on hover.

Below: ghost link, right-aligned — "All work →" → `/work`.

---

**§5 · Impact band** — full-bleed, `ground="ash"`

The first inverted region. `ash-900` ground, `bone` text, `ember-lift` accents. A very faint dithered ember texture at 6% opacity behind it.

`Eyebrow` (`ember-lift`): `SINCE 2024`. Then a 4-column stat grid: `Counter` in serif `.t-numeral` + mono label beneath, separated by vertical hairlines in `ash-700`.

Suggested stats: **6** Sites live · **10** Organizations · **$0** Charged, ever · **[N]** Students building *(confirm all — see 1.4)*.

Closing line under the grid, `.t-body-l`, `max-width: 52ch`, centered:
> "Every one of these was built by a high school student, for free, for an organization that needed it."

This is where the "we're students" reveal lands — after the numbers, not before.

---

**§6 · How it works**

`Eyebrow`: `HOW IT WORKS` · `h2.t-display-m`: "Four steps. About a month."

Four steps on a **horizontal hairline** with 8px ember squares at each node (desktop ≥1024px); stacked with a **vertical** hairline on the left below that. Each: mono index · title `.t-title` · body `.t-small` `ash-500` · duration in mono `ash-300`.

1. **Tell us about your organization** — a form, then a 30-minute call. *(Week 0)*
2. **We design it** — you see real screens, not a mockup deck, before anything is built. *(Week 1)*
3. **We build it** — you get a preview link that updates as we go. *(Weeks 2–4)*
4. **You own it** — live on your domain, with the code and a walkthrough. *(Week 4)*

---

**§7 · Pull quote**

One partner quote, full width, centered, `max-width: 24ch` — set in **Instrument Serif italic** at `.t-display-m`. Attribution in mono beneath: name · role · organization. **One quote. Not a carousel, not a grid.** Flanked by short `Rule`s above and below.

---

**§8 · For students** — `Grid.Editorial`, `ground="raised"`

A short, quieter block acknowledging audience #2. `Eyebrow`: `FOR STUDENTS`. `h3.t-heading`: "We're always looking for people who want to build real things." Two sentences + ghost link "How to join →".

Deliberately understated — this section must not compete with the client-facing narrative.

---

**§9 · Closing CTA + Footer environment** — full-bleed, one continuous scene

The Stencil-footer move. Top edge is a **dot-dissolve** from `bone` into a dithered dawn horizon overlaid with `ash-900`. Implement the dissolve with a `mask-image` on the image container:
```css
mask-image: linear-gradient(to bottom, transparent 0%, #000 22%);
```
plus a 12px dot-grid overlay in the transition zone so the boundary reads as *dither*, not as a gradient fade.

Over the scene, centered:
- `h2.t-display-l` in `bone`: "Let's build yours."
- One line: "Free, permanently. Tell us what your organization does and we'll take it from there."
- Button pair: primary (flipped to `bone`) "Start a project" · secondary ghost "Support our work" → HCB donate URL

Then the `bone-raised` inset footer panel described in 6.3.

---

## 7.2 Work — `/work`

**Header.** `Eyebrow`: `WORK` · `h1.t-display-l`: "Every site we've built." · one-line sub · `Rule`.

**Filters.** `Chip` row: `ALL` · `WEBSITES` · `APPS` · `IN PROGRESS`. Filtering is instant, client-side, and updates `?filter=` in the URL via `useSearchParams` so links are shareable. Announce result count via `aria-live="polite"`.

**The list — rows, not a card grid.** A card grid is the default portfolio choice and reads as a template; a hairline-separated editorial list reads as a studio index and gives the dither previews room.

Each row is a `<Link>` to `/work/:slug`, `padding-block: 1.75rem`, `Rule` between rows. Columns:

| Cols | Content |
|---|---|
| 1 | mono index `01` |
| 2–6 | client name `.t-heading` + summary `.t-small` `ash-500` |
| 7–9 | sector, mono, `ash-500` |
| 10–11 | year, mono |
| 12 | `StatusDot` + status label, right-aligned |

**Row hover:** background → `bone-raised`; a small **cursor-following `DitherImage` preview** appears (Part 9.3). This is the page's signature interaction.

**Below the list:** a `Currently building` section — same row structure, `ember` status dots, **not linked**, mono note: `PREVIEW COMING SOON`. Showing in-flight work is a momentum signal and is more honest than hiding it.

## 7.3 Case study — `/work/:slug`

Template only; content lands later. Structure:

1. **Header** — `Eyebrow` (sector) · `h1.t-display-l` (client) · summary `.t-body-l` · metadata rail in mono: `YEAR` / `TYPE` / `STACK` / `TEAM` / live link with ↗.
2. **Hero shot** — full-bleed `DitherImage`, 16:9, **M2 · Resolve** on load. Inverted-hero layout per the runcycle reference: image band on top, the header sits *below* it on desktop ≥1280px.
3. **The ask** — `Grid.Editorial`, mono rail label `THE ASK`, prose in cols 1–7.
4. **What we made** — same, `WHAT WE MADE`, followed by a 2-column image pair.
5. **Result** — same, `RESULT`. If there are numbers, use a small stat row.
6. **Gallery** — remaining shots, alternating full-bleed and half-width, each with a mono caption.
7. **Next project** — full-bleed `ash` band: mono `NEXT` + next client name in `.t-display-l`, hover → `ember-lift`. Wraps around the array.

Unknown slug → `<Navigate to="/work" replace />`.

## 7.4 About — `/about`

1. **Header** — `h1.t-display-l`: "A workshop, run by students." · `Rule`.
2. **Origin** — long-form `Prose` in cols 1–7, with a **serif drop cap** on the first paragraph (`float: left; font-size: 3.6em; line-height: 0.82; padding: 0.06em 0.12em 0 0; font-family: var(--font-serif)`). One drop cap on the entire site. Rail in cols 9–12: a mono timeline (`2024 — Founded`, `2024 — First site shipped`, …).
3. **What we believe** — three statements separated by `Rule animated`, each a `.t-heading` line + two lines of body. No cards.
   - "A nonprofit shouldn't have to choose between a website and its actual work."
   - "The person who runs the organization should be able to update the site."
   - "We finish things."
4. **The team** — grid of `DitherImage` portraits (3-up desktop / 2-up tablet / 1-up mobile, 4:5). Name `.t-title`, role in mono `ash-500`. **Portraits resolve to color on hover.** This is where the students become visible, and the dither-resolve gives it real emotional weight.
5. **How we're funded** — `Grid.Editorial`. Explains fiscal sponsorship in plain language for a non-technical reader, states the EIN, links to HCB, and states that donations are tax-deductible. Ends with a secondary button "Support our work".
6. `ClosingCTA`.

## 7.5 Start a project — `/start`

The most important conversion page. Two columns; **the form is the page**, not an afterthought.

**Left (cols 1–5), sticky above `lg`:**
- `h1.t-display-l`: "Tell us about your organization."
- `.t-body-l`: "There's no cost, no catch, and no contract. We build for nonprofits, school clubs, and community groups."
- A mono checklist under an `Eyebrow` `WHAT HAPPENS NEXT`: `01 We read it within a week` · `02 A 30-minute call` · `03 Designs in week one` · `04 Live in about a month`
- Under `WHAT WE NEED FROM YOU`: `A rough idea of what the site should do` · `Your text and photos, or help writing them` · `One person who can approve things`

**Right (cols 7–12):** the form, `bone-raised`, `padding: clamp(1.75rem, 3vw, 2.5rem)`, square corners, 1px `ash-200` border.

Fields: Organization name* · Your name* · Email* · What does your organization do?* (textarea) · What do you need? (select: Website / Mobile app / Not sure) · Do you have a website now? (text, optional) · Timeline (select: No rush / Next few months / There's a deadline) · Anything else (textarea).

Plus a honeypot field (`name="_gotcha"`, `tabindex="-1"`, visually hidden).

**States:** idle → submitting (button label "Sending…", disabled, `aria-busy`) → success (the form is *replaced* by a serif confirmation, not a toast) → error (mono error above the button, `aria-live="assertive"`, form data preserved).

## 7.6 Join — `/join`

Different register: warmer, more direct, addressed to a 15-year-old. This is the one page where a single exclamation mark is permitted.

1. `h1.t-display-l`: "Build things that get used."
2. Short pitch: real clients, real deadlines, real deployments — and a portfolio that isn't a to-do app.
3. **What you'd actually do** — three numbered items (Design / Build / Talk to clients), same rule-separated pattern as Home §3.
4. **What we expect** — honest and specific: a few hours a week, you finish what you start, you show up to the calls. Honesty here filters better than enthusiasm.
5. **Open roles** — list with `StatusDot`s.
6. Application form (Name · School / grade · Email · What do you want to work on? · Show us something you've made (URL, optional) · Why PTS?).

## 7.7 Badge — `/badge`

**A strategic asset, not a filler page.** PTS already signs client sites with *"Website made with ❤️ by Phoenix Tech Solutions."* Formalize it: every client site carries a consistent, on-brand, linked badge. That is PTS's entire distribution channel and its main source of inbound backlinks.

The page provides:
1. A live `BuiltByBadge` preview in three variants (light / dark / minimal).
2. A copy-paste HTML snippet (self-contained: inline SVG mark + a `<a rel="noopener">` back to `phoenixtechsolutions.org?ref=<client-slug>`) in a mono `<pre>` with a copy button.
3. A React component snippet.
4. Two lines of usage guidance: put it in the footer; don't recolor the mark.

**`BuiltByBadge` design:** `Mark` at 14px + `Built by Phoenix Tech Solutions` in mono 11px uppercase, `ash-500`, hover → `ash-900`. Hairline above it. No heart emoji — the mono line reads as a maker's stamp, which is stronger and matches the brand.

Link this page from the footer under `Organization`.

## 7.8 404

Ash-inverted full-viewport. `Mark` at 48px, `animated`. `.t-display-l`: "This page never got built." Mono: `404`. Buttons: "Go home" · "See our work". A quiet joke that stays on-brand.

---
---

# PART 8 — COPY DECK

Ship these strings. They are written to the voice rules in 3.8. Replace only the bracketed placeholders.

**Meta**
- Title (home): `Phoenix Tech Solutions — Free websites for nonprofits`
- Title (other): `<Page> · Phoenix Tech Solutions`
- Description: `A student-run nonprofit that designs and builds websites and apps for community organizations. Free, permanently.`

**Hero**
- Eyebrow: `EST. 2024 · ATLANTA, GA · FISCALLY SPONSORED BY HACK CLUB`
- H1: `Nonprofits do the hard part.` / `We handle *the website*.`
- Sub: `Phoenix Tech Solutions is a student-run nonprofit. We design and build websites and apps for community organizations — free, and built to last.`
- CTAs: `Start a project` · `See our work`
- Stats: `6 · SITES LIVE` · `10 · ORGANIZATIONS SERVED` · `$0 · CHARGED, EVER`

**Alternate H1s** (if the primary is overruled — keep the same register):
- `Good causes deserve *good* software.`
- `We build the websites *good causes* can't afford.`
- `Your organization does the work. *We'll* make sure people can find it.`

**Section headings**
- Work: `Six sites live. Ten organizations.`
- Services: `Three things, done properly.`
- Process: `Four steps. About a month.`
- Impact: `Since 2024`
- Closing: `Let's build yours.`

**Closing CTA sub:** `Free, permanently. Tell us what your organization does and we'll take it from there.`

**Footer description:** `A student-run nonprofit building websites and apps for organizations doing good work.`

**Footer legal:** `© 2026 Phoenix Tech Solutions. A fiscally sponsored project of The Hack Foundation (d/b/a Hack Club), a 501(c)(3) nonprofit — EIN 81-2908499. Donations are tax-deductible in the United States.`

**Form success:** `Got it. We'll read this and get back to you within a week — usually sooner.`
**Form error:** `That didn't send. Email us directly at [email] and we'll pick it up from there.`

---
---

# PART 9 — SIGNATURE INTERACTIONS

These four are what separate this site from a template. Budget real time for them.

## 9.1 EmberField — the hero centerpiece

A 2D canvas of ash squares on bone. The pointer **warms** nearby cells toward ember; they cool back down. A slow upward drift keeps it alive without input. It is a bed of embers, and it is the phoenix concept as a live material.

**Spec**

```
Canvas sized to its container. devicePixelRatio capped at 2.
Cell size: 9px desktop, 12px below 640px. Cell gap: 3px of the pitch.
Grid: cols = ceil(w / pitch), rows = ceil(h / pitch). Hard cap 2600 cells;
      increase pitch until under the cap.

Per cell: heat ∈ [0, 1].

Base field (computed once on resize):
  base[i] = clamp(valueNoise(col * 0.09, row * 0.09) * 0.34
                  + (row / rows) * 0.22, 0, 0.5)
  → warmer toward the bottom, organic variation. Use a small seeded
    value-noise function; do NOT pull in a noise library.

Per frame (RAF):
  t += 0.006
  drift = sin(t + col * 0.22 + row * 0.16) * 0.05
  heat[i] = max(base[i] + drift, heat[i] * 0.938)          // decay
  if pointer active:
    d = distance(cellCenter, pointer)
    if d < 150: heat[i] += (1 - d / 150)^2 * 0.42
  heat[i] = min(heat[i], 1)

Render:
  color = lerp3(ash-300 → ember → ember-lift, heat)
  size  = pitch * (0.34 + heat * 0.62)
  fillRect centered in the cell. No shadows, no glow, no blur.
```

**Performance & correctness**
- One `requestAnimationFrame` loop. Cancel it on unmount.
- `IntersectionObserver` — pause when the canvas is out of view.
- Pause on `document.visibilitychange` → hidden.
- Throttle to 30fps when `cells > 1800` or `navigator.hardwareConcurrency <= 4`.
- Pointer via `pointermove` on the canvas, passive listener, coordinates cached — **never** read layout inside the loop.
- Touch: on `pointerdown`/`pointermove` only; no persistent hover state.
- **`prefers-reduced-motion`:** render exactly one frame using `base[]` (no drift, no pointer) and never start the loop.
- Provide a `<noscript>`/error boundary fallback: a static dithered ember PNG.
- `role="img"`, `aria-label="An animated field of embers that warms where the cursor moves."`

**Do not** add bloom, particles, connecting lines, or three.js. The restraint is the point.

## 9.2 DitherImage — the Resolve

```tsx
type DitherImageProps = {
  src: string;              // /media/work/x/cover.webp
  dither?: string;          // default: src.replace(/\.webp$/, ".dither.png")
  alt: string;
  ratio?: `${number}/${number}`;   // default "4/3"
  trigger?: "view" | "hover" | "both";  // default "both"
  priority?: boolean;       // eager + fetchpriority=high for LCP images
};
```

**Structure:** a `position: relative` box with `aspect-ratio`, `overflow: hidden`, **square corners**, containing two stacked `<img>` at `inset: 0; width/height: 100%; object-fit: cover`:
- **Bottom layer:** the full-color image.
- **Top layer:** the dither PNG, `image-rendering: pixelated` (keeps dots crisp when upscaled).

**Resolve** animates a `mask-image` on the **top** layer so the dither wipes away bottom-to-top, revealing color:
```css
mask-image: linear-gradient(to top, #000 0%, #000 var(--edge), transparent calc(var(--edge) + 14%));
mask-size: 100% 100%;
```
Animate `--edge` from `100%` → `-14%` over `--dur-reveal` (1100ms) with `--ease-out-soft`. Register the custom property so it's animatable:
```css
@property --edge { syntax: "<percentage>"; initial-value: 100%; inherits: false; }
```
The 14% soft band is what makes it read as a *dissolve* rather than a hard wipe.

**Triggers:** `view` fires once via `useInView`. `hover` re-runs on `pointerenter` and reverses (dither returns) on `pointerleave` at `--dur-base`. On touch devices, `view` only.

**Loading:** `loading="lazy" decoding="async"` unless `priority`. The dither PNG is small — load it eagerly so it acts as the placeholder while the color WebP streams in. Always set explicit `width`/`height` attributes.

**Accessibility:** the dither layer is `aria-hidden="true"`; `alt` lives on the color layer only. Under reduced motion, render the color layer at full opacity and skip the dither layer entirely.

**Fallback (only if the build script is blocked):** apply `filter: grayscale(1) contrast(1.9)` plus a repeating-radial-gradient dot mask over a grayscale copy. It is noticeably worse. Prefer the real script.

## 9.3 Cursor-follow preview (Work index)

On `pointerenter` of a row (pointer: fine only), a **200×150** `DitherImage` of that project fades in and follows the cursor with lag.

- Position with `transform: translate3d(x, y, 0)`, updated inside a single shared RAF using `lerp(current, target, 0.14)`.
- Offset +24px x, +24px y from the cursor; clamp inside the viewport.
- Opacity 0 → 1 over 180ms; scale is **not** animated.
- Square corners, 1px `ash-200` border.
- Disabled below `lg`, on `pointer: coarse`, and under reduced motion.
- `aria-hidden="true"` — purely decorative; row content already conveys everything.

One RAF loop for the whole page, not one per row.

## 9.4 Mark animation

On mount (nav, once per session) and on 404: the fifteen squares fade `0 → 1` and rise `4px → 0`, bottom row first, **40ms stagger**, `--ease-out-expo`. The ember apex square then breathes `opacity: 0.75 → 1` over 3s, `ease-in-out`, infinite. Disabled under reduced motion (renders final state).

---
---

# PART 10 — ACCESSIBILITY

Non-negotiable. Target **WCAG 2.2 AA**. A nonprofit's site being inaccessible is a credibility failure, and one of PTS's clients (Champions Place) serves adults with disabilities — this has to be right.

- **Landmarks:** one `<header>`, one `<nav aria-label="Main">`, one `<main id="main">`, one `<footer>`. Sections that have a heading use `<section aria-labelledby="...">`.
- **Headings:** exactly one `<h1>` per page; no skipped levels. The `Eyebrow` above a heading is a `<p>` or `<span>`, never an `<h*>`.
- **Focus:** visible on everything. `:focus-visible { outline: 2px solid var(--color-ember); outline-offset: 3px; }`. On ash grounds, `--color-ember-lift`. **Never `outline: none` without a replacement.**
- **Targets:** ≥44×44px effective (WCAG 2.2 §2.5.8). Nav links get vertical padding to reach it even though the text is small.
- **Contrast:** per the table in 3.3. `ash-300` is never text. Verify every ember-on-ash usage.
- **Motion:** every animation respects `prefers-reduced-motion` (4.5). Test with the OS setting actually enabled.
- **Images:** meaningful `alt` on every screenshot ("Homepage of the Stories of Champions site, showing…"), `alt=""` on decorative. Dither layers always `aria-hidden`.
- **Forms:** every input has a `<label for>` — placeholders are not labels. Errors are programmatically associated via `aria-describedby` and announced with `aria-live`. Required fields marked in both the label text and `aria-required`.
- **Filters:** `role="tablist"` with arrow-key navigation and `aria-selected`; result count in an `aria-live="polite"` region.
- **Mobile menu:** focus trap, `Esc` to close, `aria-expanded` on the trigger, focus returned on close, background scroll locked.
- **Routing:** on navigation, focus moves to the new `<h1>` (`tabIndex={-1}`) and the document title updates.
- **Keyboard:** the entire site must be operable without a mouse, including all hover-triggered content (hover previews are decorative and duplicated in text — verify this stays true).
- **Zoom:** usable at 200% zoom and at 320px width with no horizontal scroll.

## 10.1 Semantic HTML for content types

Case-study metadata rails are `<dl>/<dt>/<dd>`. The process is an `<ol>`. Project lists are `<ul>`. Quotes are `<blockquote>` + `<cite>`. Don't reach for `<div>` when an element exists.

---
---

# PART 11 — PERFORMANCE

**Budgets** (enforce before launch; measure with Lighthouse mobile, throttled):

| Metric | Budget |
|---|---|
| LCP | < 1.8s |
| CLS | < 0.03 |
| INP | < 150ms |
| JS (gz, initial route) | < 150KB |
| CSS (gz) | < 30KB |
| Fonts total | < 130KB (4 woff2 files) |
| Lighthouse Perf / A11y / Best / SEO | ≥ 95 / 100 / 100 / 100 |

**Techniques**
- **Fonts:** self-hosted woff2, `font-display: swap`, `<link rel="preload">` for Instrument Serif 400 and the Instrument Sans variable file. Subset to `latin` only. Add `size-adjust`/`ascent-override` on the fallback `@font-face` declarations to keep CLS at zero during the swap — measure the actual values, don't guess.
- **Images:** WebP (AVIF optional), explicit `width`/`height` on every `<img>`, `loading="lazy"` below the fold, `fetchpriority="high"` on the hero/LCP image only. Cap client screenshots at 1600px wide.
- **Route splitting:** `React.lazy` every page except Home. Preload the `/work` chunk on nav-link hover.
- **The canvas:** see 9.1. It must not run when off-screen or on a hidden tab. Verify with a CPU profile that idle scroll stays under 5% main-thread usage.
- **No layout thrash:** cache `getBoundingClientRect` results; never read layout inside RAF.
- **`content-visibility: auto`** on below-the-fold sections with a `contain-intrinsic-size` hint.
- **Analytics:** `@vercel/analytics` only. No GTM, no cookie banner (nothing to consent to — keep it that way).

---
---

# PART 12 — ASSETS PIPELINE

## 12.1 Screenshots

For each project: capture the client homepage at **1600×1200**, deviceScaleFactor 2, full viewport (not full-page). Save as `public/media/work/<slug>/cover.webp` at quality 82. Additional shots `shot-01.webp` … Use a headless capture (Playwright) or the browser tooling already available; be consistent — same width, same scroll position, no browser chrome.

## 12.2 The dither script

`scripts/dither.mjs` — run via `npm run dither`. Walks `public/media/**`, and for every `*.webp` without a sibling `*.dither.png`, generates one.

```
For each source image:
  1. resize to 900px wide (dither resolution — deliberately lower than the color
     version; the dots should be visible, not microscopic)
  2. grayscale, then normalize
  3. apply a gamma of ~1.15 and a slight contrast boost so midtones land in the
     interesting part of the dither ramp
  4. Floyd–Steinberg error diffusion to 1-bit:
       for each pixel: old = v; new = old < 128 ? 0 : 255; err = old - new;
       distribute err → right 7/16, below-left 3/16, below 5/16, below-right 1/16
  5. map: 0 → ash-900 (#14120F), 255 → bone (#F4EFE6)
  6. write PNG (palette, 2 colors) → <name>.dither.png
```

Use `sharp` for decode/resize/grayscale and `raw()` pixel access; implement Floyd–Steinberg by hand over the raw buffer (it's ~25 lines). Expected output: **15–45KB per image.**

Also generate `public/media/grain.png` — a 128×128 tile of 1-bit noise at ~8% fill, used by `Grain`.

Add to `package.json`:
```json
"scripts": {
  "dither": "node scripts/dither.mjs",
  "prebuild": "npm run dither"
}
```

## 12.3 Team portraits

4:5 crop, 800×1000, neutral background, consistent framing across all members. Dithered by the same script. Consistency matters more than photo quality here — mismatched selfies will undo the brand faster than anything else on this list.

## 12.4 The footer environment image

One landscape: a horizon at dawn — hills, a lake, a treeline. **Not** a fire, sunset, or bird. Dithered heavily, overlaid with `ash-900` at ~78% opacity. It should read as atmosphere, not as a photograph. Source from Unsplash under its license and credit in a code comment.

## 12.5 Favicon & OG

- `favicon.svg` — the `Mark` on a transparent ground (adapts to browser theme).
- `favicon-32.png`, `apple-touch-icon.png` (180×180, `bone` ground, mark centered at 60%).
- `og.png` (1200×630) — `bone` ground, `Mark` top-left, "Phoenix Tech Solutions" in serif, the tagline in sans, a dithered strip along the bottom edge. Build it as a real design file, not a screenshot.

---
---

# PART 13 — FORMS, SEO, DEPLOYMENT

## 13.1 Forms

**Formspree** free tier (50 submissions/month, ample). Two endpoints: one for `/start`, one for `/join`. Store IDs in `.env` as `VITE_FORMSPREE_START` / `VITE_FORMSPREE_JOIN` (public by design — Formspree endpoints are safe to expose; there is nothing secret here).

```ts
const res = await fetch(`https://formspree.io/f/${id}`, {
  method: "POST",
  headers: { Accept: "application/json" },
  body: new FormData(formEl),
});
```

Client-side validation before submit (required fields, email shape). A honeypot field handles bots — **do not add a CAPTCHA**; it is an accessibility burden and visual noise for this volume.

## 13.2 SEO

- Per-route `<title>` and `<meta name="description">` via `useDocumentHead`.
- Canonical link tag per route.
- **JSON-LD** in `index.html`: an `Organization` object with `name`, `url`, `logo`, `description`, `email`, `sameAs` (socials), and `nonprofitStatus: "Nonprofit501c3"` — plus the fiscal-sponsorship relationship in `parentOrganization`. This is genuinely useful for a nonprofit's search presence.
- `sitemap.xml` — generate at build from the route list + project slugs.
- `robots.txt` — allow all, point at the sitemap.
- OG + Twitter card tags in `index.html`.

## 13.3 Deployment

**Vercel.** Framework preset: Vite. Build `npm run build`, output `dist`. SPA rewrite:

```json
// vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/media/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=604800" }]
    }
  ]
}
```

Custom domain (confirm availability): `phoenixtechsolutions.org`. Preview deploys on every PR.

---
---

# PART 14 — BUILD ORDER

Eight phases. **Do not skip ahead** — the system must exist before the pages, or you will end up hand-tuning each page and the site will lose its coherence.

| Phase | Deliverable | Done when |
|---|---|---|
| **0 · Scaffold** | Clean `node_modules`, `package.json`, Vite + React 19 + TS + Tailwind v4, ESLint/Prettier, router with all 8 routes rendering placeholder `<h1>`s. | `npm run dev` serves every route. |
| **1 · Design system** | `tokens.css`, `fonts.css`, `global.css`, all type utilities. A private `/styleguide` route rendering every token, type style, button, field, rule, and status dot. | The styleguide looks *designed* on its own. If it doesn't, stop and fix it here — every later page inherits this. |
| **2 · Primitives + brand** | All of 6.1 and `Mark`/`Wordmark`/`Lockup`/`Grain`/`DotGrid`. | Styleguide covers all of them. |
| **3 · Shell** | `Nav`, `MobileMenu`, `Footer` (without the environment image), `SkipLink`, `ScrollToTop`, `useDocumentHead`. | Keyboard-navigable across all routes; menu traps focus. |
| **4 · Signature interactions** | `EmberField`, `DitherImage`, the dither script, the cursor preview. Build against 2–3 real screenshots. | 60fps on a mid-range phone; reduced-motion paths verified. |
| **5 · Content + Work pages** | `src/content/*` seeded with all 11 projects; `/work` and `/work/:slug` built. | Filtering, deep links, and case studies work with real data. |
| **6 · Home** | All nine sections. | Matches Part 7.1 section for section. |
| **7 · Remaining pages** | About, Start, Join, Badge, 404. Forms wired to Formspree. | All states (idle/submitting/success/error) verified. |
| **8 · Polish + ship** | Accessibility audit, Lighthouse, OG/favicon/sitemap/JSON-LD, cross-browser, deploy. | Part 15 fully checked. |

Delete `/styleguide` from the production router before shipping — or keep it behind `import.meta.env.DEV`.

---
---

# PART 15 — ACCEPTANCE CHECKLIST

**Brand**
- [ ] Zero gradient backgrounds. Zero `box-shadow` declarations. (`grep -rn "box-shadow\|linear-gradient\|radial-gradient" src/` — only the dither mask, the dot grid, and the footer dissolve may match.)
- [ ] Every `border-radius` in the codebase is `0` or `999px`. No exceptions.
- [ ] Ember covers < 3% of any viewport.
- [ ] Exactly one italic-serif accent per page.
- [ ] Mono is never used for a sentence.
- [ ] No item from the 3.7 blocklist appears anywhere.
- [ ] No banned word from 3.8 appears in any copy.

**Craft**
- [ ] Every image is dithered before it resolves.
- [ ] Every section boundary uses a hairline, whitespace, or inversion — never two of them at once.
- [ ] Maximum two inverted regions per page.
- [ ] The editorial 7/12 + 9–12 rail grid is used consistently, not sporadically.
- [ ] Headlines use `text-wrap: balance`; prose uses `text-wrap: pretty` and respects `--measure`.

**Function**
- [ ] All 8 routes render; deep links work on a hard refresh (SPA rewrite is live).
- [ ] Both forms submit, and all four states are correct.
- [ ] Work filters update the URL and are shareable.
- [ ] 404 catches unknown routes; unknown project slugs redirect to `/work`.
- [ ] The badge snippet copies to the clipboard and the pasted HTML actually renders correctly on a bare page.

**Accessibility**
- [ ] axe DevTools: zero violations on every route.
- [ ] Full keyboard traversal of every page, including the mobile menu and filters.
- [ ] Tested with `prefers-reduced-motion: reduce` enabled at the OS level.
- [ ] Tested with a screen reader on Home and `/start`.
- [ ] Usable at 320px width and 200% zoom with no horizontal scroll.

**Performance**
- [ ] Lighthouse mobile ≥ 95 / 100 / 100 / 100.
- [ ] Every budget in Part 11 met.
- [ ] Canvas idles at 0% CPU when scrolled out of view or on a background tab.
- [ ] No CLS from font swap.

**Content**
- [ ] Every item in Part 1.4 confirmed, or visibly flagged as `TODO(confirm)`.
- [ ] Every stat is a real number.
- [ ] The partner quote has written permission.
- [ ] No lorem ipsum, and no placeholder that reads like AI filler.

---

## Appendix — The one-paragraph brief

> Phoenix Tech Solutions is a workshop, not an agency and not a school project. Warm paper, ash ink, one ember. Everything is square except the things you press. Every image arrives as a 1-bit dither and resolves into color, because that is literally what PTS does for an organization. Type does the work that decoration usually does: a high-contrast serif for weight, a quiet sans for reading, a mono for anything factual. Hairlines and negative space do the work that cards and shadows usually do. Motion is limited to five named behaviors, all of which either rise or resolve. The credibility comes from real numbers, real client names, and real students — presented plainly, in that order.
