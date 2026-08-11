---
name: CJGR Portfolio - Editorial Redesign
description: Professional developer portfolio with editorial aesthetic
colors:
  primary: "#1a1a1a"
  primary-light: "#2d2d2d"
  accent: "#c9a227"
  accent-light: "#d4b44a"
  bg: "#fafafa"
  bg-dark: "#1a1a1a"
  surface: "#ffffff"
  surface-dark: "#242424"
  text: "#1a1a1a"
  text-dark: "#e5e7eb"
  text-secondary: "#6b7280"
  text-secondary-dark: "#9ca3af"
  border: "#e5e7eb"
  border-dark: "#374151"
  border-light: "#f3f4f6"
  border-light-dark: "#1f2937"
  scrollbar: "#d1d5db"
  scrollbar-hover: "#9ca3af"
  scrollbar-dark: "#4b5563"
  scrollbar-dark-hover: "#6b7280"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  heading:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  mono:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  micro:
    fontFamily: "Inter, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.1em"
  tiny:
    fontFamily: "Inter, sans-serif"
    fontSize: "9px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"
rounded:
  sm: "2px"
  md: "4px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
  "4xl": "96px"
components:
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.lg}"
    padding: "24px"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.bg}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    border: "1px solid {colors.primary}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
---

## Overview

Professional editorial portfolio with clean typography, asymmetric layouts, and generous whitespace. Designed for clarity and readability, targeting recruiters and hiring managers.

## Colors

Minimal palette with warm neutrals and gold accent:
- **Primary**: Dark charcoal (#1a1a1a) for text and headings
- **Accent**: Muted gold (#c9a227) for highlights and CTAs
- **Background**: Warm white (#fafafa)
- **Surface**: Pure white (#ffffff)
- **Text**: Dark charcoal with secondary gray for body text

## Typography

Two font families with clear hierarchy:
- **Playfair Display**: Serif for display headings (editorial feel)
- **Inter**: Sans-serif for body text (clean readability)
- **JetBrains Mono**: Monospace for technical elements

## Layout

Asymmetric grid with generous whitespace:
- **Max width**: 1200px centered
- **Section padding**: 80px vertical, 24px horizontal
- **Grid**: 12-column with asymmetric spans
- **Breakpoints**: Mobile-first responsive design

## Elevation & Depth

Flat design with subtle borders:
- No shadows or glows
- 1px borders for separation
- Whitespace for visual hierarchy
- Color contrast for depth

## Shapes

Minimal border radius:
- **Buttons**: Sharp corners (2px)
- **Cards**: Slight rounding (8px)
- **Images**: No rounding
- **Forms**: Sharp corners (4px)

## Components

Clean, minimal components:
- **Cards**: White background with subtle border
- **Buttons**: Sharp corners, solid colors
- **Forms**: Minimal styling with focus states
- **Navigation**: Simple horizontal layout

## Do's and Don'ts

**Do:**
- Use generous whitespace
- Maintain clear typographic hierarchy
- Keep color palette minimal
- Use asymmetric layouts
- Prioritize readability

**Don't:**
- Use shadows or glows
- Overuse accent color
- Create complex animations
- Use glassmorphism
- Add decorative elements