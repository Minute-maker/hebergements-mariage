# Clay Design System

A design system for **Clay.com** — a GTM (go-to-market) data orchestration platform. Clay's surface combines waterfall data enrichment across 100+ providers, AI research agents ("Claygent"), and outbound sequencing in a single spreadsheet-like table. The public brand is the most playful in the B2B data category: a cream-tinted canvas, near-black CTAs, rounded display type, six saturated single-color feature cards, and commissioned 3D claymation illustrations.

## Sources

Everything here was derived from one source, a written design analysis of Clay's marketing site:

- Repo: <https://github.com/VoltAgent/awesome-design-md> (branch `main`)
- Subtree used: `design-md/clay/` — <https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/clay>
- Same analysis published at <https://getdesign.md/clay/design-md>

That repo holds ~80 similar analyses (Linear, Stripe, Notion, Vercel, Figma…). If you are extending this system or building a second brand, read the source `DESIGN.md` directly — it carries the full token table, do's/don'ts and known gaps in more detail than is summarised here, and the sibling folders are a useful reference for cross-brand conventions.

**What the source did NOT contain:** no logo or wordmark files, no illustrations, no font binaries, no icon set, no product screenshots, and no code. Consequences are flagged throughout and listed under *Gaps & substitutions*.

## Products represented

The source documents one surface: the **marketing website** (homepage, product/solutions pages, pricing, experts directory, resource listings, footer). It explicitly places the in-app product (data tables, formula editor, agent builder) out of scope, so no app UI kit exists here.

## Content fundamentals

- **Register:** confident, plain, operator-to-operator. Product nouns do the work; adjectives are rare.
- **Person:** speaks to *you* / *your team*; the company is "Clay", not "we", outside of support copy.
- **Headlines** are short declaratives, sentence case, no terminal period: "Go to market with unique data", "Turn your growth ideas into reality today". They name an outcome, not a feature.
- **Casing:** sentence case everywhere — headlines, buttons, nav. The only uppercase is the 12px/600/1.5px-tracked eyebrow label ("FEATURED", section labels).
- **Buttons** are 1–3 words, verb-first: "Try free", "Start building", "Book a demo", "Talk to sales".
- **Body copy** stays concrete: name the provider, the credit, the row. Avoid category abstractions ("orchestrate your revenue engine").
- **Numbers as proof:** "100+ providers", "100 free credits" — specific counts, not vague scale claims.
- **No emoji.** None appear in the source and none belong in this system.
- **Vibe:** warm and craft-forward, aimed at operators who like tools. The claymation art carries the playfulness so the copy does not have to be cute.

## Visual foundations

**Canvas.** Cream-tinted white `#fffaf0` is the page floor, and it is non-negotiable — cool grays read as a competitor. The cream ladder goes `--canvas` #fffaf0 → `--surface-soft` #faf5e8 (bands, footer) → `--surface-card` #f5f0e0 (cream cards) → `--surface-strong` #ebe6d6. Dark teal-tinted surfaces (`--surface-dark` #0a1a1a) exist but are rare.

**Color.** Near-black `#0a0a0a` for ink and primary CTAs. Feature cards use six saturated fills — pink #ff4d8b, teal #1a3a3a, lavender #b8a4ed, peach #ffb084, ochre #e8b94a, cream #f5f0e0 — cycled down the page and never repeated back-to-back. Pink and teal carry white text; lavender, peach, ochre and cream carry ink. Mint #a4d4c5 and coral #ff6b5a are illustration/badge accents only. Semantic green/amber/red are UI-only, never decorative. Do not introduce a seventh card color.

**Type.** Display headlines run Clay's licensed rounded face *Plain Black* at weight **500** with negative tracking (72px/−2.5px down to 32px/−0.5px). Weight never goes past 500 — the rounded letterforms supply the warmth that bold would flatten. Everything else (titles, body, nav, buttons) is Inter: 600 for titles/buttons, 500 for nav, 400 for body at 1.55 line-height. Mixing the two roles is a system violation.

**Spacing & layout.** 4px base; tokens 4 · 8 · 12 · 16 · 24 · 32 · 48 · 96. 96px between editorial bands, 1280px max content width, hero on a 7/5 grid (headline left, illustration right). Feature grids 3-up desktop → 2-up tablet → 1-up mobile; pricing 4 → 2 → 1. Nav is 64px and does not float or blur — it is opaque cream and scrolls with a plain background.

**Backgrounds & imagery.** No gradients, no textures, no repeating patterns. Depth is flat color contrast. The brand's signature images are **3D-rendered claymation illustrations** — mountains, mascot characters, soft landscapes in peach/ochre/lavender — warm-toned, soft-lit, matte, no grain and no cool blue. They appear as hero artifacts, inside feature cards and as a horizon strip at the very bottom of the footer. Flat vector art is not an acceptable substitute.

**Elevation.** There is effectively no shadow system: flat sections, 1px `#e5e5e5` hairlines on inputs and light cards, saturated fills on feature cards, and a faint `0 2px 8px rgba(10,10,10,.06)` reserved for rare hover elevation. No inner shadows, no protection gradients — text sits on solid color, not on imagery, so no scrims are needed. Transparency and blur are not part of the system; the only alpha use is softening body text inside a saturated card.

**Radii.** 6px small badges, 8px small buttons, 12px buttons and inputs, 16px content/testimonial/pricing cards, 24px feature cards and CTA band, pill for tabs and badges, full for avatars. Cards are defined by fill + radius, not by borders and shadows: cream cards have no border at all; light cards get a single hairline.

**States.** The source deliberately does not document hover, and this system follows it: primary CTA darkens to `#1f1f1f` on active, disabled is `#e5e5e5` fill with muted text, inputs darken their border from hairline to ink on focus (no focus ring, no glow). No transforms, no shrink-on-press. Animation is not specified beyond illustration parallax; treat motion as out of system and keep transitions to short opacity/color fades if you need any at all.

**Layout fixtures.** Nothing is sticky or fixed in the documented surface — the nav scrolls away, there are no floating action buttons and no bottom bars.

## Iconography

The source documents **no icon system at all** — no icon font, no sprite, no SVG set, and no icon usage in any component spec. Nothing was available to copy in, so `assets/` contains no icons and the components ship without them.

- **Do not** fill the gap with a hand-drawn SVG set or emoji: neither appears in the brand.
- Where a glyph is genuinely required, the components use a plain Unicode middle dot (pricing feature bullets) — deliberately neutral.
- If you need real icons, the closest CDN match to Clay's simple 1.5px line style is **Lucide** (`https://unpkg.com/lucide-static`). Treat that as an **unverified substitution** and confirm against the live site before shipping.
- Avatars are photographic circles; `TestimonialCard` and `ExpertCard` fall back to a single initial when no image is supplied.

## Gaps & substitutions

- **No logo.** No mark was provided, so `TopNav` and `Footer` render the word "Clay" in display type. Do not reconstruct the real mark — supply the official file and swap it in.
- **Font substitution.** *Plain Black* is licensed to Clay and unavailable publicly. Both `--font-display` and `--font-body` point at **Inter** (Google Fonts), with display headlines set at 500 and negative tracking per the source's own recommendation. Licensed alternatives closer to the real face: Söhne Breit (Buch) or Recoleta 500. **Please send the real font files if you have them.**
- **No illustrations.** `HeroIllustrationCard` and the footer horizon render labelled placeholders. Drop real renders in `assets/` and pass `src`.
- **No icons** — see above.
- **Not in the source:** hover styling, animation timings, form states beyond focus/error, dark mode, and the entire in-app product surface.
- **Intentional additions:** `Section` (a local heading+grid wrapper inside the marketing UI kit, not a system component) and the `ProductMockupCard` row API — the source describes the card but not its contents, so the row shape was invented to make the fragment concrete.

## Index

| Path | What |
|---|---|
| `styles.css` | Global entry point — `@import`s only. Link this one file. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css` |
| `guidelines/` | 18 foundation specimen cards (Colors, Type, Spacing, Shapes, Brand) |
| `components/` | Reusable primitives, grouped below |
| `ui_kits/marketing/` | Clay marketing site recreation — see its `README.md` |
| `assets/` | Empty by design: no logos, illustrations or icons were provided |
| `SKILL.md` | Agent Skills entry point |
| `github.md` | Upstream source association for sync |

### Components

- `components/core/` — **Button**, **TextLink**, **BadgePill**, **CategoryTab**
- `components/forms/` — **TextInput**
- `components/cards/` — **FeatureCard**, **ProductMockupCard**, **TestimonialCard**, **PricingTierCard**, **ExpertCard**, **HeroIllustrationCard**
- `components/layout/` — **TopNav**, **HeroBand**, **CtaBand**, **Footer**

Each has a sibling `.d.ts` (props) and `.prompt.md` (when to use it). The inventory maps 1:1 to the component list in the source analysis — nothing was added beyond what it documents.

### UI kits

- `ui_kits/marketing/` — Home, Pricing, Experts, Sign up. Click-through via the top nav.
