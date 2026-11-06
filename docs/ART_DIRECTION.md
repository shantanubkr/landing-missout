# MissOut product visuals — art direction lock

Approved reference: **v7 16:9 sample** (`out/sample-registrations-v7.png`), with the later **no-white-outline** preference from **v10**.

## Locked look
- Canvas: **1920×1080** (16:9). Also export **@2x** 3840×2160.
- Background: **square pink mosaic only** (`#f92c99` tints), via `lib/pink-mosaic-bg.js`.
  - Prefer: `tileSize: 32`, `blurPasses: 1`, `toneSteps: 22`, `jitter: 0.04`.
  - Unique `seed` + `variant` per slot family (not random per frame).
- Frame: **frosted glass** panel centered.
  - `padding: 12px`, `border-radius: 26px`, `background: rgba(255,255,255,0.40)`, `backdrop-filter: blur(20px)`.
  - Soft white glow + pinkish drop shadow **without** the decorative 1px white stroke.
  - **Do not** add `0 0 0 1px rgba(255,255,255,…)`.
- Inner card: **1580×900**, `border-radius: 16px`, screenshot fills card (`object-fit: fill` or cover after pad).
- Screenshot UI chrome/borders inside the product UI stay as-is — only remove the **composite** white outline.

## Forbidden until fresh captures land
- Reusing pixels from `captures/desktop/*`, `landing-missout/public/landing-figma/**`, audit shots, or prior `sample-registrations-v*.png` as final product stills.
- Final production PNG/MP4/WebM for site slots.
- Browser/staging interaction from this workspace (captures are external).

## Style samples (local reference only)
| Ver | Path | Note |
|-----|------|------|
| v7 | `html/composite-registrations-v7.html` + `out/sample-registrations-v7.png` | Approved composition / glass / 16:9 |
| v8–v9 | same tree | Mosaic tuning |
| v10 | `html/composite-registrations-v10.html` + `out/sample-registrations-v10.png` | Same as v9 mosaic + **no white outline** |
