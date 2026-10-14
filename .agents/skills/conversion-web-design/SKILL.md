---
name: conversion-web-design
description: Design system, conversion UX patterns, performance standards, and review workflows for modern marketing and lead-generation websites (especially WhatsApp/mobile-first services).
---

# Conversion Web Design Skill

## When to Use This Skill
Apply this skill whenever building or auditing marketing, lead-generation, or broker/service websites (such as logistics, travel, local services, or booking brokers) where conversion, mobile user experience, trust, and speed take precedence over complex web applications.

## 1. Architectural Guidance: Static / Vanilla vs. React
Before writing code, evaluate the technical fit:

| Site Type | Recommended Architecture | Rationale |
| :--- | :--- | :--- |
| **Marketing & Lead-Gen Landing Page** (e.g., SUOLA) | **Static HTML5 + Modern Vanilla CSS & JS** | Zero build step, instant TTFB, minimal data footprint (<100KB gzipped), no hydration mismatch, maximum SEO indexability. |
| **Interactive SaaS / Client Dashboard / App** | **React / Vite / Next.js** | Complex relational client-side state, user auth, dynamic nested routes, rich interactive components. |

> **Rule for Marketing Sites:** Do not introduce React, Tailwind CDN, or massive frontend runtimes unless explicitly requested. Use native CSS custom properties, CSS Grid/Flexbox, native `<details>` for FAQs, and clean semantic markup.

---

## 2. Core Conversion & Trust Patterns (Verified Research)

1. **The Single-Action Direct Flow:**
   - Eliminate distractions. Every secondary action must lead directly into the primary conversion channel.
   - For WhatsApp-first businesses: construct pre-formatted, structured message payloads so the business receives qualified, structured lead data immediately on send.
2. **Above-the-Fold Value Proposition:**
   - State exactly *what* you offer, *where* you operate, and *why* you can be trusted within 3 seconds.
   - Example: *"Flights. Cargo. Cars. Hotels. One chat sorts it. MM2 Local Airport, Lagos."*
3. **Broker / Concierge Trust & Liability Transparency:**
   - Clearly delineate roles: the business coordinates and vets; independent partners deliver transport/flights/stays.
   - Display partner credentials (e.g. licensed airlines: Air Peace, Ibom Air, Overland) and physical counter locations with verified map pins.
4. **Thumb-Zone Mobile Sticky Action Bar:**
   - On screens `<= 820px`, mount a sticky bottom navigation bar with one-tap `tel:` and high-contrast WhatsApp action buttons within easy thumb reach.

---

## 3. Production CSS Design System Baseline

```css
:root {
  /* Brand Tokens */
  --brand-primary: #7c3aed;
  --brand-primary-hover: #6d28d9;
  --brand-accent: #f97316;       /* Reserved exclusively for primary CTAs */
  --brand-accent-hover: #ea580c;
  --channel-wa: #25d366;         /* Dedicated WhatsApp brand green */

  /* Surface & Ink */
  --surface-ink: #0b0a14;
  --surface-ink-alt: #16132a;
  --surface-bg: #ffffff;
  --surface-bg-alt: #f8f7fc;
  --text-main: #1c1a2b;
  --text-muted: #5d5a72;
  --border-line: #e7e5ef;

  /* Typography */
  --font-heading: 'Bricolage Grotesque', 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, -apple-system, sans-serif;

  /* Geometry & Shadows */
  --radius-md: 12px;
  --radius-lg: 20px;
  --shadow-sm: 0 1px 3px rgba(11, 10, 20, 0.06);
  --shadow-lg: 0 16px 40px rgba(11, 10, 20, 0.12);
}

/* Reduced Motion Safety */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. Quality, Performance & Accessibility Checklist
Before delivering any marketing page:
- [ ] **No Dead Leads:** Test every form submit and button. Verify it redirects or opens with correct encoded params.
- [ ] **Accessible Inputs:** Every `<input>`, `<select>`, `<textarea>` has an associated `<label for="...">`.
- [ ] **Keyboard Nav & Focus Rings:** Interactive elements feature visible `:focus-visible` styling with sufficient contrast.
- [ ] **Images:** Include `width`, `height`, and `loading="lazy"` on below-the-fold assets.
- [ ] **Mobile Touch Targets:** All buttons and interactive links have at least 44x44px clickable area.
- [ ] **Clean OpenGraph Metadata:** Explicit `og:title`, `og:description`, `og:image`, `theme-color`, and JSON-LD `TravelAgency`/`LocalBusiness` schema.
