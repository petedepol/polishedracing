---
name: PIT WALL — Pete Michaliszyn
description: A World Cup mechanic's career rendered as an F1 pit-wall telemetry feed
colors:
  carbon: "#0A0B0D"
  carbon-raised: "#121418"
  carbon-line: "#1E2229"
  signal: "#C6FF2E"
  gold: "#E9B949"
  silver: "#AEB6BF"
  bronze: "#C08A5A"
  live: "#33D17A"
  warn: "#E5703A"
  ink: "#EDEFF2"
  ink-dim: "#8B93A0"
  ink-faint: "#767E8B"
typography:
  display:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(4rem, 9.5vw, 10rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Bebas Neue, Impact, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "0.02em"
  body:
    fontFamily: "IBM Plex Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.18em"
  caption:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.12em"
  origin:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(1.25rem, 2vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  none: "0px"
  dot: "999px"
spacing:
  hairline: "1px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "80px"
  section: "80px"
components:
  button-signal:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.carbon}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px 20px"
  feed-row:
    backgroundColor: "{colors.carbon-raised}"
    textColor: "{colors.ink}"
    typography: "{typography.data}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  panel:
    backgroundColor: "{colors.carbon-raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "32px"
---

# Design System: PIT WALL

## Overview

**Creative North Star: "The career as a live pit-wall telemetry feed"**

The whole page is Pete's twenty seasons rendered the way his audience already reads data: a timing screen, an instrument cluster, a build sheet, a dot-timeline of race weekends. It does not describe a data-driven mechanic; it *is* the dashboard he would build. Emotional target: cold competence that earns warm trust. Precision as reassurance, resolving at the bottom of the page into a person you would want in your truck.

Density is high and controlled: hairline grids, 1px rules, mono data everywhere a number lives, generous section spacing so each instrument reads on its own. Imagery is the data: a real HTML table, an exploded line-drawn bike, SVG traces. Zero photography is a design decision, not a gap; photo frames exist but stay hidden until real assets arrive, then take a duotone grade so twenty years of mismatched sources read as one system.

Two deliberate exceptions to the dark techno-instrument world keep it from reading as generic "dark data": the **Gold Cut** (a black, gold-lit beat for the two Olympic golds) and the **Origin** passage set in a warm serif. Everything else stays in the instrument register.

**Key Characteristics:**
- Near-black carbon canvas with one acid signal colour and medal colours used strictly as status
- Mono numerals with `tabular-nums` wherever a value lives; condensed display type for section titles
- 0px geometry, 1px lines, hard-offset block shadows (refined brutalism, never neumorphism)
- Motion = instrumentation booting and settling; one authored load sequence, feed rows that stream in, digits that tick to value
- SVG film grain at 4% over the whole canvas; blueprint grid substrate on the hero and origin sections

## Colors

Near-black canvas, one hot signal, medal metals as status. Colour means something or it is not there.

### Primary
- **Signal** (#C6FF2E): the single accent — the live CTA, wins and series leads, active/selected states, hero callouts. Never more than ~5% of any viewport.

### Secondary
- **Gold** (#E9B949): Olympic and elite Worlds golds only. The rarest facts get the rarest colour.
- **Silver** (#AEB6BF): Worlds silvers and secondary metal data.
- **Bronze** (#C08A5A): Worlds bronzes.
- **Live** (#33D17A): the "Available for 2027" status dot and its pulse. Functional, never decorative.
- **Warn** (#E5703A): reserved for a single urgency/read-confirm hook. Currently unused on the page.

### Neutral
- **Carbon** (#0A0B0D): page background.
- **Carbon raised** (#121418): row, card and panel surfaces.
- **Carbon line** (#1E2229): every hairline, grid line, divider, registration mark and block shadow.
- **Ink** (#EDEFF2): primary text.
- **Ink dim** (#8B93A0): mono labels, units, captions, table secondary columns.
- **Ink faint** (#767E8B): eyebrows, footnotes, notes under numbers, the role column. The floor: every grey that carries a word clears 4.5:1 on carbon-raised. Pure decoration (spokes, dashed guides) may use carbon-line.

### Named Rules
**The Status Rule.** Gold, silver, bronze, live and signal are used as status, exactly as on an F1 timing screen: a gold row is a gold result. No colour is ever decoration.
**The One Accent Rule.** Signal appears on the CTA, on wins/leads, and on selected states. If two accents compete in one viewport, one is wrong.

## Typography

**Display Font:** Bebas Neue (with Impact fallback)
**Body Font:** IBM Plex Sans (with system-ui fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace fallback)
**Origin Font:** Fraunces (with Georgia fallback) — the single warm register, used once

**Character:** Motorsport-poster display over engineering-manual body, with the workhorse mono making every number look like telemetry. Plex is chosen over a generic grotesque because it was drawn for technical documentation and sits naturally beside the mono.

### Hierarchy
- **Display** (400, clamp(4rem, 9.5vw, 10rem), 0.88): the hero name and the closing "LET'S TALK." Uppercase by the face itself.
- **Headline** (400, clamp(2.2rem, 5vw, 4.5rem), 0.95): one per section, uppercase, carries the section without an eyebrow.
- **Title** (600, 1.125rem, 1.3): rider/team names inside rows and cards (Plex).
- **Body** (400, 1rem–1.25rem, 1.5): explanatory prose, max 65–75ch.
- **Data** (400, 12px, 1.4, +0.02em): table cells, timeline dates, tags. Always `tabular-nums`.
- **Label** (400, 11px, +0.18em, UPPERCASE): column heads, status pills, feed metadata. Mono.
- **Caption** (400, 10px, +0.12–0.18em): notes under numbers, tags, footnotes, column heads inside tables. Mono. The smallest step; nothing below it.

### Named Rules
**The Numbers Are Mono Rule.** Any value a boss might compare — positions, years, counts, gaps — is set in JetBrains Mono with tabular figures. Prose numbers may stay in Plex.
**The Display Is Sparing Rule.** Bebas appears at most once per section; it is a section voice, not a card voice.

## Layout

Single column, max width 80rem (1280px) with 20px gutters on mobile and 32px from 768px. Sections separated by 80px vertical rhythm (96–112px for the hero and contact). Grids are `gap-px` on a carbon-line background so cells read as instrument tiles divided by hairlines rather than floating cards. The palmarès is a real table from 768px and stacked feed rows below it. The hero is two columns from 1024px (5/7 split, name left, exploded bike right) and stacks name-over-bike on mobile. A faint 48px blueprint grid sits behind the hero and origin sections only.

## Elevation & Depth

Tonal layering, not shadows: carbon → carbon-raised → hairline. The one shadow in the system is the hard block shadow on the primary button (`4px 4px 0 #1E2229`), which depresses 1px on press. No blur shadows, no glows except the functional 2s pulse on the live dot. Depth otherwise comes from the grain, the grid substrate and the exploded-bike parts translating apart on load.

### Named Rules
**The Flat Instrument Rule.** Surfaces are flat. The only things that move in z are the button (press) and the exploded parts (boot).

## Shapes

0px radius everywhere except the 8px status dot. 1px hairlines in carbon-line define every edge. Nothing is clipped or rounded; the geometry is a technical drawing.

## Components

### Buttons
- **Shape:** square (0px)
- **Primary (`.btn-signal`):** signal background, carbon text, mono label 12px +0.18em uppercase, 12px 20px padding, block shadow 4px 4px 0 carbon-line
- **Hover / Focus:** no colour change; focus-visible = 2px signal outline offset 2px. Active: translate 1px/1px, shadow 3px 3px
- **Ghost (`.btn-ghost`):** transparent, 1px carbon-line border, ink text; hover border → ink-dim

### Chips
- **Style:** mono 9–11px uppercase, 1px carbon-line border, ink-dim text, 8px 8px padding, square
- **State:** selected = signal text + signal border (timing-screen filters); tags are static

### Cards / Containers
- **Corner Style:** 0px
- **Background:** carbon-raised on carbon, or carbon on carbon-raised sections
- **Shadow Strategy:** none; hairline separation via `gap-px`
- **Border:** 1px carbon-line (`.hairline`)
- **Internal Padding:** 16px rows, 24px cards, 32–48px panels

### Inputs / Fields
None on the page (contact is mailto/WhatsApp).

### Navigation
- Fixed 48px HUD bar: carbon at 85% with backdrop blur, hairline bottom. Left: live dot + name in mono caps. Centre: four mono labels, ink-dim → ink on hover. Right: the `[ HIRE ]` signal button. A 1px signal lap-bar along the bottom edge shows scroll progress. On mobile the centre links hide; the HIRE button stays.

### Timing Screen (signature)
A real `<table>` styled as a results board: mono 12px, 10px uppercase column heads, hairline row dividers, medal colour on POS and RESULT only, row hover = 2px signal inset left edge + carbon background. Rows stream in top-to-bottom on scroll with a 45ms stagger. Optional filter chips (ALL / OLYMPIC / WORLDS / WORLD CUP / DH / XC) narrow the feed for a DH or XC boss. Footnote carries the counting rule verbatim.

### Instrument Cluster (signature)
Six hairline-divided tiles; a 48–60px mono bold number that ticks to its value on entry (NumberFlow), an 11px label, a 10px note. Tone colours follow the Status Rule.

### Exploded Build Sheet (signature)
Line-drawn SVG bike whose parts translate apart on load; each part carries a callout with a career fact in signal/gold mono. Never a photo, never 3D.

## Do's and Don'ts

### Do:
- **Do** set every number in JetBrains Mono with `tabular-nums`.
- **Do** use `gap-px` on carbon-line for grids so cells read as instrument tiles.
- **Do** keep one authored motion moment (hero boot) and let everything else settle quietly; wrap every animation in `prefers-reduced-motion`.
- **Do** keep the counting rule visible wherever a tally appears.
- **Do** theme browser surfaces: selection, scrollbar, focus ring, caret.

### Don't:
- **Don't** add gradients, glassmorphism, neumorphism, rounded cards, or blur shadows. Glass is allowed only on the HUD bar.
- **Don't** use gold, silver or bronze for anything that is not that medal.
- **Don't** add AI-generated or stock imagery, fake pit shots, 3D bikes, scroll-scrubbed video, or accessibility overlay widgets.
- **Don't** put Bebas on more than one element per section, or use the same fade-up entrance on every block.
- **Don't** change a fact on this site without changing the CV in `Petebot/projects/cv/` in the same commit.
