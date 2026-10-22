---
name: SiteNest
description: A visual sitemap builder on warm paper with one terracotta pen. Plan pages, link blocks to pages, then test the flow.
colors:
  primary: "#c74504"
  primary-deep: "#a93a03"
  primary-soft: "#fdefe7"
  primary-foreground: "#ffffff"
  background: "#ffffff"
  surface: "#f4f2ea"
  ink: "#1c1917"
  ink-muted: "#6f6963"
  hairline: "#e8ddc8"
  hairline-strong: "#d6c7ab"
  success: "#146c43"
  success-soft: "#e6f4ec"
  warning: "#8a5a00"
  warning-soft: "#fdf3e0"
  info: "#1f5f9e"
  info-soft: "#ebf3fb"
  destructive: "#b3261e"
  destructive-soft: "#fdeceb"
  night: "#12100e"
  night-card: "#1c1916"
typography:
  display:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
    letterSpacing: "normal"
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "normal"
  micro:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  card: "16px"
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
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 16px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
  input-control:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    height: "40px"
    padding: "8px 12px"
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
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  panel:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    width: "288px"
---

# Design System: SiteNest

## Overview

**Creative North Star: "The Working Ledger"**

SiteNest is a working ledger: warm paper, ruled hairlines, and one orange pen. It shares its North Star and its tokens with Assessly, so the two products read as one family. Oat cream (`surface`, #f4f2ea) is the desk: the sign-in side, the canvas, the sidebar. White (`background`/`card`, #ffffff) is the paper: page nodes, panels, forms, and the wireframe blocks themselves. A single terracotta (`primary`, #c74504) marks what is live: the primary action, focus, the logo, a link between a block and a page. Manrope carries every word.

The product is an Operate surface. The user's content, not the chrome, supplies the interest: cards of pages, stacks of grey wireframe blocks, and a network of lines. So the chrome stays quiet and calm and precise. Depth is tonal, borders are hairline, shadows are faint. Colour is reserved for meaning. Two kinds of line exist and must never be confused: solid grey lines are sitemap structure (parent to child), dashed terracotta lines are navigation (a block links to a page). Sign-in is the one place the interface leaves the page plane for imagery: a terracotta-tinted photograph of a hand-drawn wireframe beside the form.

**Key Characteristics:**

- One accent, terracotta, for the primary action, focus, the mark and navigation links.
- Cream desk, white paper, parchment hairlines; depth by tone, one faint resting shadow on cards.
- Manrope only, small fixed scale, weight (not size) for hierarchy.
- Solid grey = structure, dashed terracotta = navigation.
- Wireframe blocks are always white and grey-slate, whatever the theme; they depict the user's future site, not SiteNest.
- Light and dark: dark is a warm brown-black ramp (`night`, #12100e), never neutral grey.

## Colors

A cream-and-white ledger with one burnt-orange accent and warm neutrals.

### Primary

- **Terracotta Pen** (`primary`, #c74504): primary buttons, focus ring, the logo mark, selected states, dashed link lines, linked-block chips, the "Nest" in the wordmark. White text on it reaches 4.9:1.
- **Terracotta Deep** (`primary-deep`, #a93a03): hover for the primary fill and the only accent used as text on tints (`primary-text`).
- **Terracotta Tint** (`primary-soft`, #fdefe7): the accent as a ground: soft badges, hover washes, icon tiles.

### Neutral

- **Oat Cream** (`surface`, also `secondary`, `muted`, #f4f2ea): the desk. Sign-in form side, canvas ground, sidebar, muted panels, segmented-control tracks.
- **Paper White** (`background`/`card`, #ffffff): page nodes, panels, forms, popovers, inputs, and every wireframe block.
- **Warm Ink** (`ink`, #1c1917): all primary text.
- **Stone** (`ink-muted`, #6f6963): secondary copy, hints, placeholders. 5.4:1 on white, 4.8:1 on cream.
- **Parchment Hairline** (`hairline`, #e8ddc8): every border, divider and input outline.
- **Parchment Strong** (`hairline-strong`, #d6c7ab): canvas dots, emphasised dividers, scrollbar thumbs.

### Semantic

`success` (#146c43), `warning` (#8a5a00), `info` (#1f5f9e) and `destructive` (#b3261e), each with a `-soft` tinted ground. Flow findings use a severity dot (red, amber, stone). Raw Tailwind palette colours are not used for status.

### Named Rules

**The One Voice Rule.** Terracotta is the only accent. It never appears next to a second decorative colour.

**The Two Lines Rule.** Structure is a solid grey line; navigation is a dashed terracotta line. Never draw a navigation link solid, or a structure edge dashed.

**The Token Only Rule.** Components use `primary`, `surface`, `card`, `border`, `muted-foreground`, never a hex literal, so dark mode and re-theming hold. The exceptions are SVG wireframe blocks, which are deliberately fixed, and canvas/export colours that must be literal.

**The Warm Gray Rule.** `gray-*` is remapped to Tailwind `stone`. Reach for it freely; it is already warm.

## Typography

**Display Font:** Manrope (with ui-sans-serif, system-ui fallback)
**Body Font:** Manrope
**Mono:** none in the interface; JetBrains Mono is loaded but unused.

**Character:** Manrope's round, open forms keep a planning tool friendly rather than clinical.

### Hierarchy

- **Display** (800, 3rem, 1.1, -0.025em): the landing hero only.
- **Headline** (700, 1.5rem, 1.25, -0.025em): landing sections, the sign-in wordmark.
- **Title** (600, 1.125rem, 1.4): auth card headings, panel headings.
- **Body** (400, 0.875rem, 1.43): app copy, form text, panel copy.
- **Label** (600, 0.75rem, 1.33): buttons in panels, tabs, finding titles, chips.
- **Micro** (700, 0.625rem, +0.1em, uppercase): category headings in pickers, finding kinds, the sitemap sidebar heading in Present mode.

### Named Rules

**The Weight Not Size Rule.** Emphasis comes from weight and `ink` versus `ink-muted`. No fluid type below the landing.

**The Tabular Numbers Rule.** Block numbers, click counts, depth badges and totals use `tabular-nums`.

## Layout

The editor is a full-height shell: a 44px toolbar, then a sidebar (pages list), the infinite canvas, and a 288px right panel that is either Page Properties or Navigation Flow (320px). The canvas is the only part that scrolls and zooms. Page nodes are fixed 220px wide and grow downward as blocks stack.

The wireframe editor is a drawer with a block palette on the left and a column of blocks on the right. Each block's name and number sit in a 128px gutter to its left, outside the block, so labels never cover the content and never reach the PNG export.

Present mode is a full-screen overlay: a top bar (exit, back, restart, address bar, toggles), a 224px sitemap tree on the left, the page (max 1024px, white, centred) in the middle, and a bottom trail with the click count. Sign-in is a split screen from 1024px: a 58% photograph panel and the form centred on cream; below that the form fills the screen. Spacing is the Tailwind 4px scale: 8, 12, 16, 24px dominate.

## Elevation & Depth

Mostly flat and tonal. Surfaces separate by ground (cream desk, white paper) and by 1px hairline. Cards carry one faint resting shadow (`shadow-card`: `0 1px 2px #1010140a, 0 1px 3px #1010140f`). Hover or selection deepens it to `shadow-raised` (`0 2px 4px -1px #1010140f, 0 8px 24px -6px #1010141f`). Real elevation is reserved for what leaves the page plane: dropdowns and the Share popover (`shadow-lg`), drawers over a scrim, and Present mode over a near-black ground. The white page in Present mode carries a deep shadow because it depicts a screen.

### Named Rules

**The Quiet Elevation Rule.** Rows, badges, inputs and chips have no resting shadow. Cards carry only `shadow-card`.

## Shapes

Gently rounded, never sharp, never bubbly except pills. Controls (buttons, inputs) are 6px; page nodes and panels 12px; auth and landing cards 16px; badges, chips and avatars are full pills. Borders are 1px hairline. Dashed borders mean navigation or an empty state: dashed terracotta for linked blocks in Present mode, dashed grey for empty drop zones. The logo is a rounded square tile with a layered-stack glyph, terracotta with a white glyph, inverted (white tile, terracotta glyph) on photographs.

## Components

### Buttons

- **Shape:** 6px radius, 40px tall, 14px semibold, `px-4`.
- **Primary:** terracotta fill, white text; hover darkens to Terracotta Deep. **Outline:** white, hairline border, cream hover. **Ghost:** transparent, cream hover. **Destructive:** soft red tint with red text, never a solid red block. **Link:** `primary-text`, underline on hover.
- **Focus:** a 3px terracotta ring at 50% opacity.

### Inputs / Fields

- **Style:** 40px, 6px radius, white ground, hairline border, 14px text.
- **Focus:** border becomes terracotta with a 3px 50% ring.
- **Icon fields:** a muted 16px leading icon at `left-2.5` with `pl-8`; password fields add a trailing show/hide toggle in its own absolutely-positioned wrapper so the field keeps its 40px height.
- **Error:** a soft-red box with a red 30% border and red text, `role="alert"`.

### Cards / Containers

White ground, hairline border, 16px radius for auth, 12px for page nodes and panels, `shadow-card`. Auth card padding is 28px.

### Page node (signature)

A 220px white card with a 4px accent bar in the page's own colour, title, optional description, a status pill (draft grey, ready blue, completed green) and an "Add block" chip. Below a hairline, blocks stack as 28px rows: a number, the block name, an optional terracotta chip showing the page it links to, and a small connector dot on the right edge. Dragging from the dot onto another page's left handle creates a link. Handles are always faintly visible (35%) and full on hover or selection. While the Flow panel is open, a dark badge above the card shows clicks from Home, and flagged pages get a red ring.

### Link line

A dashed terracotta orthogonal path (rounded 10px corners, 1.5px, 75% opacity), arrowhead at the target, selectable, with a "Remove link" pill when selected. Sitemap structure lines are solid grey smooth-step paths.

### Flow panel

A 320px panel: three metric tiles (links, reachable, max depth), then findings as full-width rows with a severity dot, a micro kind label, the page title and one sentence of explanation. The selected finding takes a terracotta border and a soft tint. Empty states explain the next step instead of showing zeros.

### Present mode

Near-black frame with white page. Linked blocks wear a dashed terracotta outline and a faint terracotta wash, drawn as an overlay above the block (an inset shadow would be hidden by the block's opaque SVG), plus a "→ Page" chip; on hover the outline turns solid. Block names appear on hover or via the Block names toggle. A trail shows the path and a terracotta click-count pill.

### Auth shell (signature)

Left: a hand-drawn website wireframe photograph under a 60% terracotta multiply tint and a dark top-to-bottom scrim, carrying the inverse logo, a daily quote about design (1.6rem, 600) and the copyright line. No photo credit is shown. Right: the form on cream, centred, with the wordmark ("Nest" in terracotta) above a white card.

### Segmented control

Assessly's filter pill: a white track with a 1px parchment hairline and 4px padding, 8px outer radius. The selected segment is a 6px-radius `primary-soft` tint with `primary-text` (Terracotta Deep) text; unselected segments are plain muted text that darkens on hover. No shadow, no fill, no underline. Terracotta appears only as a tint and as text colour, so it never competes with the primary button.

### Device mockup (signature)

The landing page shows the product inside a CSS-built laptop: a dark lid with a camera dot holding a 16:10 screenshot, and a silver base with a notch. It appears once. Its colours are literal because they depict hardware. The screenshot must show the real editor with clearly sample data.

### Navigation

Toolbar buttons are 28px outline buttons with a 12px icon; the active mode (Flow open) takes a terracotta border and soft tint. The Share popover is a 320px white card with a switch, a monospace link field and a Copy button.

## Do's and Don'ts

### Do:

- **Do** use `bg-surface` for the desk and `bg-card` for paper; separate with a hairline.
- **Do** keep terracotta to the primary action, focus, the mark and navigation links.
- **Do** draw navigation dashed terracotta and structure solid grey.
- **Do** put block names outside the block (gutter) or on hover; the block is the user's content.
- **Do** keep wireframe blocks white and slate-grey with at most one terracotta accent, in light and dark.
- **Do** give every analysis result a plain sentence that says what is wrong and why it matters.
- **Do** use `tabular-nums` for counts, depths and block numbers.
- **Do** keep white text on any tinted photograph behind a scrim that guarantees 4.5:1.

### Don't:

- **Don't** write a literal brand hex or `bg-white` in components; use tokens.
- **Don't** add a second accent colour or a gradient fill for decoration.
- **Don't** add resting shadows to rows, badges or inputs.
- **Don't** draw a hover outline as an inset shadow over a block with its own background.
- **Don't** put a transform on a page-level wrapper; it traps fixed overlays.
- **Don't** use neutral grey or blue-grey for chrome or dark mode; use the warm ramp.
- **Don't** hide link or analysis meaning in colour alone; pair it with a label or shape.
- **Don't** introduce paid or metered dependencies into a feature to decorate the interface.
