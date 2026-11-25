---
name: ESSAAR Group Design System
description: Official Corporate Gold & Dark Navy Visual Language for ESSAAR Group of Companies
colors:
  navy-primary: "#081A33"
  navy-corp: "#102B50"
  navy-deep: "#061326"
  navy-surface: "#0E2442"
  gold-premium: "#C9A34E"
  gold-light: "#E4C77E"
  gold-soft: "#B58B38"
  white: "#FFFFFF"
  soft-white: "#F5F6F8"
  border-grey: "#E2E8F0"
  text-dark: "#39465A"
  text-muted: "#5A6980"
typography:
  display:
    fontFamily: "Outfit, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1.15
  heading:
    fontFamily: "Outfit, sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  xxl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.gold-premium}"
    textColor: "{colors.navy-deep}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.gold-light}"
    textColor: "{colors.navy-deep}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
---

## Overview
The ESSAAR Group design system embodies an authoritative, established industrial corporate identity. It combines deep navy tones with warm champagne-gold accents to balance industrial capability with corporate prestige.

## Colors
- **Primary Navy:** `#081A33` — Dominant background for high-impact hero sections, navigation bars, and footers.
- **Corporate Navy:** `#102B50` — Secondary container and surface color for elevated cards on dark grounds.
- **Deep Navy:** `#061326` — Extreme background contrast, footer base, and dark overlays.
- **Premium Gold:** `#C9A34E` — Brand accent for primary CTA buttons, badges, key labels, and active navigation indicators.
- **Light Gold:** `#E4C77E` — Hover states, fine border accents, and high-contrast text on navy backgrounds.
- **Clean White / Soft White:** `#FFFFFF` and `#F5F6F8` — Clean light section backgrounds for high-readability body copy.

## Typography
- **Headings (`Outfit`):** Geometric, solid, and modern sans-serif with strong corporate presence. Used for `<h1>` through `<h5>` elements, badges, and company titles.
- **Body Copy (`Plus Jakarta Sans`):** Clean humanist sans-serif optimized for legibility across mobile and desktop displays. Used for paragraphs, metadata tables, and navigation links.

## Layout
- Maximum container width: `1280px` with responsive padding (`20px` to `32px`).
- **Diagonal Split Hero Layout:** 52% Navy content block on the left with a `clip-path: polygon(0 0, 100% 0, 88% 100%, 0 100%)` angle intersecting an authentic high-resolution industrial photography side on the right.
- **Company Information Bar:** Four balanced columns at the bottom of company heroes displaying Core Focus, Location, GSTIN, and Direct Contact.

## Elevation & Depth
- Flat, clean surfaces with subtle, neutral elevation:
  - `box-shadow: 0 4px 12px rgba(7, 29, 56, 0.08)` for cards on light backgrounds.
  - `box-shadow: 0 10px 30px rgba(7, 29, 56, 0.12)` for interactive hover states.
- Avoid heavy saturated neon glows; use clean border lines (`1px solid rgba(201, 163, 78, 0.25)` or `1px solid #E2E8F0`).

## Shapes
- Modest rounding (`6px` to `10px`) for buttons and info containers to maintain industrial rigor.
- Clean badges with `rounded: full` (`9999px`) for pill tags.

## Components
- **Primary Button:** Warm gold background (`#C9A34E`), navy text (`#061326`), bold weight, clean arrow indicator (`↗` or `→`).
- **Secondary Button:** Ghost button with gold/white border and hover fill.
- **Company Profile Header:** Diagonal split hero featuring transparent company logo with subtle white radial glow for instant brand recognition.

## Do's and Don'ts
### Do's:
- Maintain genuine company logos on transparent backgrounds with high contrast.
- Ensure all body text meets WCAG AA contrast (minimum 4.5:1 ratio).
- Keep company metadata (GSTIN, Address, Phone) accurate and cleanly organized in designated info bars.

### Don'ts:
- Do NOT use generic decorative text gradients on headings or metrics.
- Do NOT nest cards inside cards with redundant borders.
- Do NOT use low-contrast muted yellow text on white/cream backgrounds.
- Do NOT invent fake company statistics or placeholder links.
