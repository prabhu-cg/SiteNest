---
name: SiteNest
description: A visual sitemap builder on white and pale butter with one amber accent, Newsreader headlines and DM Sans for everything else. Plan pages, link blocks to pages, then test the flow.
colors:
  primary: "#e8b923"
  primary-hover: "#d4a615"
  primary-foreground: "#353335"
  primary-soft: "#faf4df"
  primary-text: "#826400"
  background: "#ffffff"
  surface: "#fcfaf3"
  muted: "#f8f4e4"
  ink: "#353335"
  ink-secondary: "#4d4a4d"
  ink-muted: "#6b6b6b"
  hairline: "#ece5cc"
  hairline-strong: "#dccfa6"
  olive: "#71806a"
  terracotta: "#a66c51"
  success: "#146c43"
  success-soft: "#e6f4ec"
  warning: "#8a5a00"
  warning-soft: "#fdf3e0"
  info: "#1f5f9e"
  info-soft: "#ebf3fb"
  destructive: "#b3261e"
  destructive-soft: "#fdeceb"
  night: "#141312"
  night-card: "#1c1b19"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "4.5rem"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "2.25rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "normal"
  eyebrow:
    fontFamily: "DM Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "12px"
  card: "20px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  gutter: "128px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "8px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
    padding: "8px 20px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
  input-control:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    height: "44px"
    padding: "8px 12px"
  eyebrow:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.eyebrow}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  card-auth:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "28px"
  page-node:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    width: "220px"
  badge-soft:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  panel:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    width: "288px"
---

# Design System: SiteNest

## Overview

**Creative North Star: "The Annotated Sitemap"**

SiteNest uses the Butter system from the owner's portfolio: a calm white working surface, pale butter bands and soft hairlines, with one amber accent that marks what is active or actionable. Pale butter (`surface`, #fcfaf3) is the desk: the canvas, the sidebar, alternating landing bands. White (`background`/`card`, #ffffff) is the paper: page nodes, panels, forms and the wireframe blocks themselves. Amber (`primary`, #e8b923) is a fill that marks what is live: the primary action, the logo tile, a selected state, a link between a block and a page. Headlines are Newsreader, a serif with an editorial voice; everything that has to be read or operated is DM Sans.

The product is an Operate surface. The user's content, not the chrome, supplies the interest: cards of pages, stacks of grey wireframe blocks, and a network of lines. So the chrome stays quiet. Depth is tonal, borders are hairline, shadows are faint. Colour is reserved for meaning. Two kinds of line exist and must never be confused: solid grey lines are sitemap structure (parent to child), dashed amber lines are navigation (a block links to a page). Sign-in is the one place the interface leaves the page plane for imagery: an amber-tinted photograph of a hand-drawn wireframe beside the form.

**Key Characteristics:**

- One accent, amber, used as a fill. Warm neutrals do everything else (60-30-10: white, pale butter, amber).
- Amber is never text. The text-grade accent is the same hue taken darker (`primary-text`, ochre #826400), which is also the focus ring.
- Newsreader for hero statements and section titles (h1, h2, card titles); DM Sans for everything else.
- Every button is a full pill; cards are 20px; controls and inputs are 12px.
- Solid grey = structure, dashed amber = navigation.
- Wireframe blocks are always white and grey-slate, whatever the theme; they depict the user's future site, not SiteNest.
- Light and dark: dark is a warm charcoal ramp (`night`, #141312), never neutral grey. The portfolio has no dark theme; SiteNest keeps one so the editor stays usable.

## Colors

A white-and-butter ledger with one amber accent and warm neutrals.

### Primary

- **Amber** (`primary`, #e8b923): fills only: primary buttons, the logo tile, active toggles, default node colour, link and arrow fills, the eyebrow dot. Charcoal text on it is 6.8:1. It is 1.8:1 against white, so it never carries text, and a control that relies on its outline needs a border.
- **Deep Amber** (`primary-hover`, #d4a615): hover fill for primary buttons.
- **Ochre** (`primary-text`, #826400): the only accent used as text (links, active labels, the "Nest" in the wordmark) and the focus ring (`ring`). 5.6:1 on white. Also the stroke for selected links and arrowheads on the canvas, where amber is too faint as a line.
- **Butter Tint** (`primary-soft`, #faf4df): the accent as a ground: soft badges, selected rows, icon tiles, text selection.

### Neutral

- **Pale Butter** (`surface`, #fcfaf3): the desk. Canvas ground, sidebar, landing bands, inactive tab tracks.
- **Butter Wash** (`muted`/`secondary`, #f8f4e4): hover and secondary tints. A step stronger than `surface`, so a hover is visible.
- **Paper White** (`background`/`card`, #ffffff): page nodes, panels, forms, popovers, inputs, and every wireframe block.
- **Charcoal** (`ink`, #353335): headings, primary text, and the text on amber fills (`primary-foreground`). **Ink Secondary** (#4d4a4d) for body copy; **Warm Grey** (`ink-muted`, #6b6b6b) for captions, hints and placeholders, 5.3:1 on white.
- **Butter Hairline** (`hairline`, #ece5cc): every border and divider. **Hairline Strong** (#dccfa6): input outlines, emphasised dividers, scrollbar thumbs.
- **Olive** (#71806a) and **Terracotta** (#a66c51) are palette members for non-text supporting uses (chart series, the default avatar tile). Do not set text in them.

### Semantic

`success` (#146c43), `warning` (#8a5a00), `info` (#1f5f9e) and `destructive` (#b3261e), each with a `-soft` tinted ground. Flow findings use a severity dot (red, amber, grey). Raw Tailwind palette colours are not used for status.

### Named Rules

**The One Voice Rule.** Amber is the only accent. It never appears next to a second decorative colour, and never fills a large area or a full-width section.

**The Fill Not Text Rule.** Amber is a fill. Accent-coloured text is `text-primary-text` (ochre), never `text-primary`. Text on an amber fill is `text-primary-foreground` (charcoal), never white.

**The Two Lines Rule.** Structure is a solid grey line; navigation is a dashed amber line (ochre when selected). Never draw a navigation link solid, or a structure edge dashed.

**The Token Only Rule.** Components use `primary`, `surface`, `card`, `border`, `muted-foreground`, never a hex literal, so dark mode and re-theming hold. The exceptions are SVG wireframe blocks, which are deliberately fixed, per-node colours chosen by the user, and canvas/export colours that must be literal.

**The Warm Gray Rule.** `gray-*` is remapped to Tailwind `stone`. Reach for it freely; it is already warm.

## Typography

**Display Font:** Newsreader (serif, with Georgia fallback), weight 500, tracking -0.02em, used for `h1`, `h2` and `.font-display`.
**Body Font:** DM Sans (400-700), with ui-sans-serif and system-ui fallback.
**Mono:** none in the interface; JetBrains Mono is loaded but unused.

**Character:** Newsreader gives the marketing and auth pages an editorial voice; DM Sans keeps the tool plain and readable.

### Hierarchy

- **Display** (Newsreader 500, 2.5rem on mobile up to 4.5rem, 1.05, -0.02em): the landing hero only; one word set in italic for emphasis, never in colour.
- **Headline** (Newsreader 500, 1.875-2.25rem, 1.15, -0.02em): landing sections, the sign-in wordmark and page headings.
- **Title** (DM Sans 600, 1.25rem, 1.3): landing card and step titles.
- **Body** (DM Sans 400, 0.875rem, 1.5): app copy, form text, panel copy; 1.125rem for the landing lead.
- **Label** (DM Sans 600, 0.75rem, 1.33): buttons in panels, tabs, finding titles, chips.
- **Eyebrow** (DM Sans 500, 0.875rem): a pill, not tracked caps: charcoal-secondary text on white with a hairline border and an 8px amber dot, above the hero and in the sign-in panel.
- **Micro** (DM Sans 700, 0.625rem, +0.1em, uppercase): category headings in pickers, finding kinds, the sitemap heading in Present mode.

### Named Rules

**The Weight Not Size Rule.** In the app, emphasis comes from weight and `ink` versus `ink-muted`. The serif is for the marketing and auth surfaces, not dense panels.

**The Tabular Numbers Rule.** Block numbers, click counts, depth badges and totals use `tabular-nums`.

## Layout

The editor is a full-height shell: a 44px toolbar, then a sidebar (pages list), the infinite canvas, and a 288px right panel that is either Page Properties or Navigation Flow (320px). The canvas is the only part that scrolls and zooms. Page nodes are fixed 220px wide and grow downward as blocks stack.

The wireframe editor is a drawer with a block palette on the left and a column of blocks on the right. Each block's name and number sit in a 128px gutter to its left, outside the block, so labels never cover the content and never reach the PNG export.

Present mode is a full-screen overlay: a top bar (exit, back, restart, address bar, toggles), a 224px sitemap tree on the left, the page (max 1024px, white, centred) in the middle, and a bottom trail with the click count. Its chrome is always dark, so text there is white, never `primary-text`.

Sign-in is a split screen from 1024px: a 58% photograph panel and the form centred on white; below that the form fills the screen. The landing page alternates white and pale butter sections at 64-80px vertical padding. Spacing is the Tailwind 4px scale: 8, 12, 16, 24px dominate.

## Elevation & Depth

Flat by default. Surfaces separate by ground (butter desk, white paper) and by 1px hairline. Cards carry no resting shadow (`shadow-card` is a faint `0 1px 2px` at most). Hover on a landing card adds the long, low `shadow-raised` (`0 20px 40px -24px`) and an amber border. Real elevation is reserved for what leaves the page plane: dropdowns and the Share popover, drawers over a scrim, and Present mode over a near-black ground. The white page in Present mode carries a deep shadow because it depicts a screen. The landing nav is 90% white with a hairline bottom border and a light backdrop blur.

### Named Rules

**The Quiet Elevation Rule.** Rows, badges, inputs and chips have no resting shadow.

## Shapes

Buttons, toggles and chips are full pills. Inputs and controls are 12px; page nodes and panels 12px; landing, auth and project cards 20px (`rounded-card`). Borders are 1px hairline. Dashed borders mean navigation or an empty state: dashed amber for linked blocks in Present mode, dashed grey for empty drop zones. The logo is a rounded square tile with a layered-stack glyph: amber with a charcoal glyph, inverted (white tile, amber glyph) on photographs.

## Components

### Buttons

- **Shape:** full pill, 44px tall (52px large, 36px small), 14px semibold, `px-5`, 2% press scale.
- **Primary:** amber fill, charcoal text; hover deepens to Deep Amber. **Outline:** white, strong hairline border, butter hover. **Ghost:** transparent, butter hover. **Destructive:** soft red tint with red text, never a solid red block. **Link:** `primary-text`, underline on hover.
- **Focus:** a 3px ochre ring at 50% opacity.
- Hand-styled buttons in the toolbar, share menu, Present bar and canvas controls follow the same pill shape.

### Inputs / Fields

- **Style:** 44px, 12px radius, white ground, strong hairline border, 14px text.
- **Focus:** border becomes amber with a 3px 50% ochre ring.
- **Icon fields:** a muted 16px leading icon with `pl-8`; password fields add a trailing show/hide toggle in its own absolutely-positioned wrapper so the field keeps its height.
- **Error:** a soft-red box with a red 30% border and red text, `role="alert"`.

### Cards / Containers

White ground, hairline border, 20px radius for landing, auth and project cards; 12px for page nodes and panels. No resting shadow.

### Page node (signature)

A 220px white card with a 4px accent bar in the page's own colour (amber by default), title, optional description, a status pill (draft grey, ready blue, completed green) and an "Add block" chip. Below a hairline, blocks stack as 28px rows: a number, the block name, an optional ochre chip showing the page it links to, and a small connector dot on the right edge. Dragging from the dot onto another page's left handle creates a link. Handles are always faintly visible (35%) and full on hover or selection. While the Flow panel is open, a dark badge above the card shows clicks from Home, and flagged pages get a red ring.

### Link line

A dashed orthogonal path in amber-tinted tan (rounded 10px corners, 1.5px), arrowhead at the target, selectable; when selected it turns ochre (#826400) and shows a "Remove link" pill. Sitemap structure lines are solid grey smooth-step paths.

### Flow panel

A 320px panel: three metric tiles (links, reachable, max depth), then findings as full-width rows with a severity dot, a micro kind label, the page title and one sentence of explanation. The selected finding takes an amber border and a butter tint. Empty states explain the next step instead of showing zeros.

### Present mode

Near-black frame with white page. Linked blocks wear a dashed amber outline and a faint amber wash, drawn as an overlay above the block (an inset shadow would be hidden by the block's opaque SVG), plus a "→ Page" chip in amber with charcoal text; on hover the outline turns solid. Block names appear on hover or via the Block names toggle. The active page in the sitemap tree is white bold text on a soft amber tint. A trail shows the path and an amber click-count pill with charcoal text.

### Auth shell (signature)

Left: a hand-drawn website wireframe photograph under an amber multiply tint and a dark charcoal top-to-bottom scrim, carrying the inverse logo, a daily quote about design (Newsreader, 2.25rem) and the copyright line. No photo credit is shown. Right: the form on white, centred, with the wordmark ("Nest" in ochre) in Newsreader above a white card. The Sign in / Sign up toggle is a pill track.

### Eyebrow

A pill label over a heading: white ground, hairline border, 8px amber dot, 14px medium charcoal-secondary text. Used above the landing hero and in the auth panel.

### Segmented control

A butter track with a 1px hairline, 4px padding, full pill radius. The selected segment is a pill with a `primary-soft` tint and `primary-text` text; unselected segments are plain muted text that darkens on hover. No shadow, no underline.

### Device mockup (signature)

The landing page shows the product inside a CSS-built laptop: a dark lid with a camera dot holding a 16:10 screenshot, and a silver base with a notch. It appears once. Its colours are literal because they depict hardware. The screenshot is a light-mode capture of the real editor on the built-in sample project, and must be retaken whenever the chrome changes visibly.

### Landing sitemap card

A white 20px card on the landing page that shows a real slice of the sample project (Home, Shop, Coffee Beans, Brewing Gear, Journal, Our Story) as indented rows with a section-colour dot, page name and slug, and an Explore link to `/editor/sample`. Never placeholder bars.

### Navigation

Toolbar buttons are 28px pill buttons with a 12px icon; the active mode (Flow open) takes an amber border and soft tint. The Share popover is a 320px white card with a switch, a monospace link field and a Copy button.

## Do's and Don'ts

### Do:

- **Do** use `bg-surface` for the desk and `bg-card` for paper; separate with a hairline.
- **Do** keep amber to the primary action, the mark, selected state and navigation links; keep text in ink tones.
- **Do** use `text-primary-text` for any accent-coloured text and for focus.
- **Do** put charcoal (`text-primary-foreground`) on amber fills, in every theme.
- **Do** draw navigation dashed amber and structure solid grey.
- **Do** put block names outside the block (gutter) or on hover; the block is the user's content.
- **Do** keep wireframe blocks white and slate-grey with at most one amber accent, in light and dark.
- **Do** make every button a pill.
- **Do** give every analysis result a plain sentence that says what is wrong and why it matters.
- **Do** use `tabular-nums` for counts, depths and block numbers.
- **Do** keep white text on any tinted photograph behind a scrim that guarantees 4.5:1.
- **Do** offer `prefers-reduced-motion` alternatives for movement.

### Don't:

- **Don't** set text in amber, terracotta or olive.
- **Don't** write a literal brand hex or `bg-white` in components; use tokens.
- **Don't** add a second accent colour, a gradient fill or gradient text.
- **Don't** use amber for large fills or full-width sections (the old solid-colour closing CTA is gone).
- **Don't** add resting shadows to rows, badges or inputs.
- **Don't** draw a hover outline as an inset shadow over a block with its own background.
- **Don't** put a transform on a page-level wrapper; it traps fixed overlays.
- **Don't** use neutral grey or blue-grey for chrome or dark mode; use the warm ramp.
- **Don't** use `text-primary-text` inside Present mode's always-dark chrome; use white.
- **Don't** hide link or analysis meaning in colour alone; pair it with a label or shape.
- **Don't** invent metrics, logos or testimonials.
- **Don't** introduce paid or metered dependencies into a feature to decorate the interface.
