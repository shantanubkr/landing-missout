# CURSOR_PROMPT — wire MissOut product visuals (verified SHOTS keys)

Destination repo folder is **`landing-missout`** (not New-landing-missout). Place this tree at **`landing-missout/assets/product-visuals/`** (extract the zip so `assets/product-visuals/…` lands inside `landing-missout/`). **Inspect the current Vite `publicDir`** — the project moved; the old `publicDir: '../landing-missout/public'` assumption is **no longer guaranteed**. Wire public URLs to wherever Vite actually serves static files from, or copy/symlink needed files into that public root (e.g. `public/landing-figma/…`) after checking `vite.config`.  
**Do not invent image keys.** Use the SHOTS paths below. **Site integration is instructions only — not performed.**

## `src/lib/assets.ts` — `SHOTS` (verified)

| Key | Replace with public file |
|-----|--------------------------|
| `SHOTS.backstageHome` | `/landing-figma/backstage-home.jpg` (or `.png`) |
| `SHOTS.stageHome` | `/landing-figma/stage-home.jpg` (or `.png`) |
| `SHOTS.ways.buildPublish` | `/landing-figma/ways/build-publish.jpg` |
| `SHOTS.ways.runCheckIns` | `/landing-figma/ways/run-check-ins.jpg` ← dual-phone check-in creative |
| `SHOTS.ways.manageCommittees` | `/landing-figma/ways/manage-committees.jpg` |
| `SHOTS.ways.sendUpdates` | `/landing-figma/ways/send-updates.jpg` ← compose UI |
| `SHOTS.ways.recruit` | `/landing-figma/ways/recruit-your-team.jpg` ← **people list**, not empty forms |
| `SHOTS.ways.money` | `/landing-figma/ways/money-proof.jpg` |
| `SHOTS.demo.makeEvent` | `/landing-figma/product-demo/make-event.png` ← **create chooser** (not completed form) |
| `SHOTS.demo.backstageHomeUi` | `/landing-figma/product-demo/backstage-home-ui.png` |
| `SHOTS.demo.checkInUi` | `/landing-figma/product-demo/check-in-ui.png` ← dual-phone; illustrative scan labeled |
| `SHOTS.demo.checkInDesk` | `/landing-figma/product-demo/check-in-desk.png` ← same creative for now |
| `SHOTS.demo.checkIn` | `/landing-figma/product-demo/check-in.png` |
| `SHOTS.demo.registrationsHub` | `/landing-figma/product-demo/registrations-hub.png` |
| `SHOTS.demo.registrations` | `/landing-figma/product-demo/registrations.png` |
| `SHOTS.demo.contingentsList` | `/landing-figma/product-demo/contingents-list.png` |
| `SHOTS.demo.contingents` | `/landing-figma/product-demo/contingents.png` |
| `SHOTS.demo.paymentsMoney` | `/landing-figma/product-demo/payments-money.png` |
| `SHOTS.demo.payments` | `/landing-figma/product-demo/payments.png` |
| `SHOTS.menu.backstage` | `/landing-figma/menu/backstage.png` |
| `SHOTS.menu.stage` | `/landing-figma/menu/stage.png` |

## `landingProductDemo.ts` (five ids · verified)

| id | Action |
|----|--------|
| `make-event` | Replace prior `SHOTS.demo.backstageHomeUi` with **`SHOTS.demo.makeEvent`** (chooser). Prefer `{ kind:'video', src:'/landing-figma/videos/make-event-preview.mp4', poster:'…-poster.png', alt:'…', loop:true, muted:true, objectFit:'contain' }` or image + contain. |
| `check-in` | Use **`SHOTS.demo.checkInUi`** image or video `/landing-figma/videos/check-in-preview.mp4` + poster. **`objectFit: 'contain'`**. Copy must not claim a live scan; creative is labeled Illustrative scan + empty genuine UI. |
| `registrations` | Replace **PLACEHOLDER** → image/video from `SHOTS.demo.registrations` / `registrations-preview.*`, fit **contain**. |
| `contingents` | Replace **PLACEHOLDER** → `SHOTS.demo.contingents` / preview video, fit **contain**. |
| `payments` | Replace **PLACEHOLDER** → `SHOTS.demo.payments` / preview video, fit **contain**. |

Type supports `{ kind:'video', src, poster, alt, loop, muted, objectFit }`.

## `featurePages.ts` (six ids · verified)

`manage-committees` · `build-publish` · `run-check-ins` · `send-updates` · `recruit-your-team` · `money-proof`

- Heroes: `SHOTS.ways.*` except **`run-check-ins` hero → `SHOTS.demo.checkInUi`** (per current source; dual-phone still).
- Moments: prefer **departments** (`out/backstage` / features manage) and **recruitment people/applications** instead of reusing `demo.contingentsList` for “Access follows department” / “Heads see queue”.

## `productPages.ts` (verified)

**BACKSTAGE_PAGE tabs:** `build`→`demo.makeEvent` · `register`→`demo.registrationsHub` · `check-in`→`demo.checkInUi` · `money`→`demo.paymentsMoney`  
**STAGE_PAGE tabs:** `discover`→`stageHome` · `check-in`→`ways.runCheckIns`  
- Stage **ticket / passes card**: use `/landing-figma/` stage passes still (`assets/.../stage/passes.png`) — **do not** repeat home.  
- Stage **updates**: only if a public updates capture exists (none in this package — **do not fabricate**).

## Check-in honesty clause (must keep in product copy if mentioned)
Festival check-in aggregator is empty (0/0). Creative pairs an **Illustrative scan** (demo non-pass QR) with **genuine empty** mobile check-in UI. No fake success; no disguised camera-blocked marketing frame.

## Unverified / not in SHOTS object
Tour stills, festival/event detail extras, recruitment-forms empty secondary — available under `assets/product-visuals/{tour,stage,backstage}/` but **no verified SHOTS keys**. Do not invent keys; wire only if product code already references paths.
