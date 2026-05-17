image.png# Partner fests (assets you add)

Drop files here and wire them in `src/lib/partnerFestsData.ts` (or extend that module later for CMS data).

## Logos (`logos/`)

For each partner you need a **fest logo** file. Recommended: **SVG** or **PNG** (transparent or solid background; aim for a square or wide logo area, ~2:1 to 1:1 aspect).

| What to set in data | Your file |
| --- | --- |
| `logoFile` = `my-fest.svg` | `public/partner_fests/logos/my-fest.svg` |

The URL on the site is: `/partner_fests/logos/<logoFile>`

- Replace the placeholder: swap `logoFile` to your real filename per fest.
- `festName` = display name of the **fest**
- `college` = **college / host** name
- `id` = stable string (e.g. slug) for keys; keep unique when you add more (10–40+).

A generic placeholder is provided: `logos/placeholder-fest.svg` (used until you point each entry at a real file).

## CTA band

| File | Use |
| --- | --- |
| `background_graphic.svg` | Full-bleed pink **CTA background** (pixel / grain); used in `PartnerFestsSection` via `<img>`. Replace the file to refresh the look. |

## Optional extras

| File (optional) | Use |
| --- | --- |
| `cta_top_edge.svg` | Only if you split the CTA into separate pieces later. |

After adding files, run `npm run build` to confirm paths resolve in production.

## Quick checklist

- [ ] One logo per fest in `logos/`
- [ ] Each row in `partnerFestsData` updated: `id`, `festName`, `college`, `logoFile`
- [ ] `background_graphic.svg` for the pink CTA (required for the designed CTA band)
