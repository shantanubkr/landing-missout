# FindUs Design System

Reusable marketing primitives for **findus.missout.in**. Tokens live in `src/lib/design/findus.ts` + `findus.css`. Components live in `src/components/findus/` with the `Fu*` prefix.

**Kitchen sink:** `/dev/findus-ui`

Geometry (radius, borders, elevation shadows) is synced with **missout-v2 Backstage** admin tokens (`src/lib/design/backstage.ts`, `src/app/globals.css`).

## When to use what

| Primitive | Use for |
|-----------|---------|
| `FuPageHeader` | Sticky nav on every marketing page |
| `FuFooter` | Site footer with Backstage + company columns |
| `FuPageHero` | Home and top-level conversion heroes |
| `FuFeatureHero` | Backstage feature page intros (mess → changes) |
| `FuSection` | Full-bleed bands — alternate `tint-*` for rhythm |
| `FuContainer` | Max-width + gutters inside sections |
| `FuFeatureGrid` | 6-up Backstage capability cards on Home |
| `FuProblemBlock` | “Why Backstage” + chip list |
| `FuTimeline` | Fest lifecycle steps |
| `FuCtaBand` | Final conversion — prefer `lime` or `wash` |
| `FuLogoStrip` | Partners (placeholders OK until assets) |
| `FuQuote` | Social proof |
| `FuFaq` | Objection handling |
| `FuButton*` | **Only** CTA control — no one-off hero buttons |
| `FuTag` | Eyebrows, problem chips, audience pills |
| `FuCard` | Tiles, quotes, media frames |

## Composition rules

1. **Section rhythm:** white → surface → tint-blue → white → tint-pink (vary; keep color visible).
2. **One primary CTA color:** Blue filled (`FuButton` `primary`) = Get started.
3. **Lime** for high-energy bands and secondary fest CTAs — black label always.
4. **Feature family colors:** People/team → blue · Events/spotlight → pink · Check-in/day-of → lime.
5. **Typography:** Polymath for UI/body; Argent Pixel for hero H1 and key moments only.
6. **Radius:** 12px on cards, buttons, panels (`--fu-radius`). Nested wells use 8px / 6px.

## Locked CTAs

- **Get started** → `https://missout.in/onboarding`
- **Request a demo** → `/contact` (mailto + WhatsApp in footer)

Import from `src/lib/ctas.ts` — do not invent URLs or labels.

## Anti-patterns

- No hex outside `findus.ts` / `findus.css`
- No text below 12px (use `fu-type-meta` at 13px+)
- No glassmorphism stacks or nested container soup
- No Notion purple/navy palette
- No animated rainbow gradients or bounce loops
- No ad-hoc `rounded-[16px]` / `rounded-[22px]` — use `--fu-radius*` tokens

## Tokens (Backstage-aligned)

| FindUs | Backstage | Value |
|--------|-----------|-------|
| `--fu-radius` | `--bs-radius-chip` | 12px |
| `--fu-radius-sm` | `--bs-radius-icon-well-sm` | 8px |
| `--fu-radius-xs` | `--bs-radius-icon-well-xs` | 6px |
| `--fu-card-border` | `--bs-card-border` | light: `rgb(0 0 0 / 0.06)` |
| `--fu-card-border-hover` | `--bs-card-border-hover` | light: `rgb(0 0 0 / 0.12)` |
| `--fu-shadow-soft` | `--bs-elevation-shadow` | layered 1–3px shadow |
| `--fu-shadow-media` | `--bs-elevation-shadow-lg` | layered 4–12px shadow |

```ts
import { FU_RADIUS, fuRadius, FU_SPACING, fuVar } from '@/lib/design/findus'
```

CSS variables: `--fu-brand-blue`, `--fu-tint-blue-soft`, `--fu-wash-hero`, etc.

## Responsive targets

- Desktop review: **1280px**
- Phone review: **390px**
- CTA min height: **44px** on phone
