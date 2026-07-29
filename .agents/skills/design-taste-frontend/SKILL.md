---
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated. Real design systems when applicable, audit-first on redesigns, strict pre-flight check.
---

# tasteskill: Anti-Slop Frontend Skill

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is **contextual**. None of it fires automatically. First read the brief, then pull only what fits.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or tweaking dials, **infer what the user actually wants**. Most LLM design output is bad because the model jumps to a default aesthetic instead of reading the room.

### 0.A Read these signals first
1. **Page kind** - landing (SaaS / consumer / agency / event), portfolio (dev / designer / creative studio), redesign (preserve vs overhaul), editorial / blog.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "serious B2B", "editorial", "agency-y", "glassy", "dark tech".
3. **Reference signals** - URLs they linked, screenshots they pasted, products they named, brands they're competing with.
4. **Audience** - B2B procurement panel vs. design-conscious consumer vs. recruiter scanning a portfolio. The audience picks the aesthetic, not your taste.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns, these are starting material, not optional input.
6. **Quiet constraints** - accessibility-first audiences, public-sector, regulated industries, trust-first commerce, kids' products. These constraints OVERRIDE aesthetic preference.

### 0.B Output a one-line "Design Read" before generating
Before any code, state in one line: **"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."**

### 0.C Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900. These are the LLM defaults. Reach past them deliberately based on the design read.

---

## 1. THE THREE DIALS (Core Configuration)

After the design read, set three dials. Every layout, motion, and density decision below is gated by these.

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Baseline:** `8 / 6 / 4`. Use these unless the design read overrides them.

---

## 2. DESIGN ENGINEERING DIRECTIVES (Anti-Slop Rules)

### 2.1 Typography & Fonts
* **Display / Headlines:** Default `text-4xl md:text-6xl tracking-tight leading-none font-bold`.
* **Body / Paragraphs:** Default `text-base text-[#525252] leading-relaxed max-w-[65ch]`.
* **Sans Font Choices:** Prefer `Geist`, `Inter`, `Outfit`, or `Satoshi`.
* **No Random Font Mixing:** Keep headline font consistent; italic/bold emphasis must stay in the same family.

### 2.2 Color Calibration & Lock
* Max 1 primary accent color per page. Saturation < 80% by default.
* **No AI-Purple Gradient Slop:** Neutral surfaces (Zinc / Slate / White) with high-contrast singular accents (Emerald, Electric Blue, Obsidian).
* **Color Consistency Lock:** Once an accent is picked, lock it across all sections.

### 2.3 Layout & Spacing Discipline
* **Hero Section:** Must fit within initial viewport (`min-h-[90vh]`), top padding cap `pt-20`, headline max 2 lines.
* **Navigation:** Must render on 1 single line on desktop, max height 80px.
* **Alternating Section Backgrounds:** Each section MUST have a distinct background color (e.g. White -> Soft Slate -> Dark Obsidian) with clean border dividers (`border-y border-slate-200`) so section boundaries are obvious.
* **Bento Grid Count Rule:** A bento grid has exactly as many cells as content available. No blank tiles.
* **Eyebrow Restraint:** Max 1 eyebrow label per 3 sections.

### 2.4 Interactive States & Buttons
* **Button Contrast Check:** Verify 100% WCAG AA contrast (white text on dark button, dark text on white button).
* **CTA Wrap Ban:** Button text MUST fit on 1 single line at desktop. No multi-line wrapped button labels.
* **Tactile Feedback:** On `:active`, use `scale-[0.98]` or `-translate-y-[1px]` for satisfying tactile response.
* **Form Inputs:** Labels ALWAYS above input, crisp focus ring, clear error text below.
