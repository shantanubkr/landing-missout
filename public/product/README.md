# Product screenshots (`public/product/`)

All paths are registered in **`src/lib/productAssets.ts`** — import from there in code; do not hardcode URLs in components.

## Layout

| Folder | Role | Used on |
|--------|------|---------|
| **`backstage/`** | Backstage hero shots (`*_light` / `*_dark`) | Home, legacy product shell |
| **`stage/`** | Stage hero shots | Stage page, legacy product shell |
| **`features/`** | New per-feature light/dark PNGs | `/features/*` pages |
| **`discover-bento/`** | Legacy attendee / Stage bento tiles (`1_`–`8_`) | Stage, money/ticketing, old discover section |
| **`manage-bento/`** | Legacy ops / Backstage bento tiles | Registrations, team access, metrics, old manage section |
| **`onboarding/`** (at `public/onboarding/`) | Backstage onboarding steps 1-4 | Home, Contact |

## Naming

- **Feature shots:** `{topic}_light.png` + `{topic}_dark.png` in `features/`
- **Legacy bento:** numbered slots — see each folder’s README
- **Heroes:** `{product}_hero_{light|dark}.png` in `backstage/` or `stage/`

## Adding assets

1. Drop files in the folder above (or at repo root with the same basename — run `npm run sync-product-assets` to copy into `public/product/`).
2. Wire them in `src/lib/productAssets.ts` (or extend an existing `themed()` / bento map) with **actual pixel dimensions** from the PNG.
3. Run `npm run build` to verify paths resolve.
