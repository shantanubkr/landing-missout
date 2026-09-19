# INTRCT Technologies — Landing Page Build Brief

## 0. Tech stack — read this first

**Use the exact same tech stack, project setup, and config as `missout-landing`.**
Before writing any code, inspect that repo/project (framework, styling approach, component structure, font loading, deployment target) and mirror it here. Same package manager, same folder conventions, same build tooling. Do not introduce a different stack "because it fits better" — consistency with `missout-landing` is a hard requirement, not a suggestion.

---

## 1. What this is

A landing page for **INTRCT Technologies** — a student-run product studio. It currently ships:
- **Missout** (findus.missout.in) — a campus event discovery app
- **Still Alive** — a second INTRCT product

The live (unstyled/reference) site is **https://intrct.vercel.app/** — it's a client-rendered React app, so pull all *copy, product names, positioning language, and structure* directly from that site by opening it in a browser (it won't render via a simple fetch). **Take the information only, not the visual style.**

## 2. Audience

Primarily students, roughly ages 18–24, but not exclusively. Copy and tone should read as **written by a peer, not a marketing team** — informed and competent, but not corporate, not hypey, and not full of slang either. Think "a smart senior explaining what they built," not "SaaS landing page voice" and not "Gen-Z meme voice."

## 3. Core creative direction

**The concept: a tastefully revamped Windows 7 — reimagined as a 2024/2025-era OS, not a costume.**

Reference: https://betanews.com/article/windows-7-returns-with-the-stunning-2024-edition/
That piece covers a concept reimagining of Windows 7 — it keeps Windows 7's bones (window chrome, taskbar, Start button, desktop metaphor, Aero-glass surfaces, desktop widgets) but blends in modern execution (crisper UI, Windows 11-era conventions like Quick Settings, modernized File Explorer, refined typography). That's the balance to strike: **nostalgic silhouette, modern craft.** Not a literal OS skin or joke — a real product landing page that *borrows the language* of that desktop era (window frames, traffic-light-style controls, taskbar/dock structure, desktop-icon grids, widget-like cards) filtered through current design standards.

**Tone reference (personal, not corporate):** https://www.heyclicky.com/
Pull the *spirit* from this site, not its exact look:
- A fake system status bar / menu bar treatment near the top
- Content blocks framed like OS windows (title bar with window controls, labeled filenames like `about.mov`, `pricing.txt`)
- Founder-note / "notes app" style section written in first person, lowercase, conversational
- Desktop-icon-style visual motifs
- Real, embedded social proof presented like screenshots rather than a generic testimonial carousel
- Playful details (retro emoticons, system sounds/cursor states) used sparingly, not as the whole personality

**Structural/interaction reference:** https://www.diabrowser.com/
- The floating navbar (pill-free, clean, sits above content, not full-width corporate header)
- Restrained numbered feature sections
- Clean product screenshots in simple rounded frames, generous whitespace
- Toggle/switch UI elements as a possible interaction motif

**Do not copy any of these three sites directly.** They're reference points for *mood and structural ideas only*. The end result should feel like an original INTRCT identity, not a clone of any one of them.

## 4. Explicit constraints — do NOT do these

- No purple/pink gradients (or gradient-heavy hero backgrounds in general)
- No generic oversized "hero banner text" treatment (huge centered headline + subhead + two CTA buttons, the default SaaS template move)
- No pill-shaped buttons
- No chip/pill-shaped tags or badges
- No slang-forward copy ("fr fr", "no cap," excessive emoji, forced Gen-Z voice) — student-relevant ≠ juvenile. Keep it articulate and professional in how it communicates, even while looking informal/personal in its visual language.

## 5. Visual reference assets (attached)

Two reference images are attached for **element-level inspiration only** — not layout or color rules to follow literally:

1. A stacked nav/menu list where each row has a solid color block containing a dot, paired with a label (Chat / Questions / Articles / Communities). Useful as a reference for how flat color-blocked list rows or nav items *could* look — not a direction to literally build a 4-item colored menu.
2. A grainy, dot-textured dark background with a serif + monospace mixed logotype ("Agent/\c") and a small pixel/mosaic mark. Useful as a reference for film-grain/noise texture treatment and mixed-typeface wordmark styling — not a literal color or brand direction.

Treat both as loose inspiration for individual UI/typography choices, not templates to replicate.

## 6. Suggested page structure

(Adjust based on what's actually on intrct.vercel.app — content comes from there.)

1. **Floating top nav** — INTRCT wordmark/mark, minimal links, no pill buttons
2. **Hero** — not a generic banner; consider a "desktop" framing (a taskbar-like strip, a window-chrome card holding the core headline/positioning) instead of dead-centered giant text
3. **About / what INTRCT is** — pulled from the reference site's own "about" language
4. **Products section** — Missout and Still Alive, each presented like an app window or desktop icon tile, linking out
5. **Personal/founder note section** — first-person, conversational, low-key (heyclicky-style notes block)
6. **Social proof** (if available from the reference site) — presented as screenshot-style embeds rather than a generic carousel
7. **Footer** — simple, consistent with the rest (no corporate footer sprawl)

## 7. Deliverable

A single cohesive landing page, built with the `missout-landing` stack, implementing the above direction. Prioritize:
- Functional realism (things should look like real, working UI — window chrome that behaves like window chrome, not decorative flourish)
- Visual accuracy to the Windows-7-reimagined-but-modern concept
- Output that doesn't read as AI-generated or template-derived
