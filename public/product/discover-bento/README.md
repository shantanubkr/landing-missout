# Discover / Events bento (`/product/discover-bento/*`)

Screenshots for **Discover Events** (`ProductDiscoverBentoSection`). PNG or WebP @2×.

**Gutters:** **`gap-[10px]`** everywhere (hero columns, rail stacks including above/below the flex spacer, hero→secondary gap, secondary grid) — matches **Manage** bento.

**Desktop hero:** **`grid grid-cols-3`** + **`gap-[10px]`** (even gutters). Row **`items-stretch`** — tops/bottoms align as in code. **No scroll drift on hero columns** (only the header drifts slightly).

- **Top-aligned:** `1_missout`, `4_tagline`, `6_discover`
- **Bottom-aligned:** `2_locate`, `4_tagline`, `7_powered` — tagline **`object-contain`** in the stretched middle cell; side rails use a **`flex-1`** spacer with **`gap-[10px]`** above and below it.

**Secondary row:** `3_ticketing` | `5_updates` | `8_logo` (`md:grid-cols-3`).

**Mobile:** hero stacks **left rail → tagline → right rail**, then the secondary row.

Paths: `/product/discover-bento/<filename>` — see `DB` in `ProductDiscoverBentoSection.tsx`.
