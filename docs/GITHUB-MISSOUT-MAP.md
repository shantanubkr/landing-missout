# GitHub.com → MissOut landing translation

This site mirrors **GitHub’s marketing IA and visual system** (Primer-like spacing, components, motion). Content, CTAs, and assets are **MissOut**.

## Global chrome

| GitHub | MissOut | Notes |
|--------|---------|--------|
| Octocat logo | Star mark | `/brand/missout_star.svg` |
| Products mega | Stage + Backstage + Explore MissOut | Platform column + right rail |
| Developers | Students | Stage, hotlists, activities |
| Businesses | Organizers | Backstage, onboarding, demo |
| Resources | Resources | Stories, partners, help, blog |
| Pricing | Pricing | Stage free / Backstage custom |
| Search | — | Omitted (landing) |
| Sign in / Sign up | Book a demo / Get started | External onboarding + mailto |

## Home (`/`) section order

| # | GitHub section | MissOut section |
|---|----------------|-----------------|
| 1 | Announce pill | Product/news pill (e.g. Stage restructure) |
| 2 | Hero H1 + email signup | **Made to show up** + subtitle + Get started / Book a demo |
| 3 | Mascot + rainbow | Star peek + floating pixels + rainbow rule |
| 4 | Product walkthrough (grid) | Backstage/Stage screenshot tabs + pixel field |
| 5 | GitHub activity marquee | MissOut activity (fest ops metaphors) |
| 6 | GitHub Platform (2 products) | **MissOut Platform** — Stage + Backstage |
| 7 | More ways (5 cards) | **More ways** — Stage row + Backstage row |
| 8 | Enterprise band | “Whatever you’re running…” + Get started |
| 9 | Testimonials + stats | Partner quotes + campus stats |
| 10 | Companies marquee | **Colleges using MissOut** (partner logos) |
| 11 | Customer stories | Partner campus stories |
| 12 | Featured repositories | **Featured on Stage** (highlight fests/activities) |
| 13 | Community CTA + grid | Join the community + contrib-style grid + CTAs |
| 14 | Footer newsletter | Stay in the loop + Get started / Book a demo |

## Product mapping

| GitHub product | MissOut equivalent | Route |
|----------------|-------------------|--------|
| GitHub | **Stage** | `/features/stage` |
| Copilot | **Backstage** (ops hub) | `/features/backstage` |
| Actions | Registrations / workflows | `/features/registrations` |
| Code Quality | — | — |
| Code Security | Permissions | `/permissions` |
| Secret Protection | — | — |
| Codespaces | — | — |
| Team | Committees | `/team` |
| Enterprise | Institutions / multi-fest | `/enterprise` |

## Inner pages

| GitHub-style page | MissOut route | Purpose |
|-------------------|---------------|---------|
| Features hub | `/features` | All capabilities |
| Feature detail | `/features/:slug` | Stage, Backstage, discover, etc. |
| Pricing | `/pricing` | Stage / Backstage / Partner |
| Why GitHub | `/why-missout` | Value prop |
| About | `/about` | Mission |
| Customer stories | `/customer-stories` | Social proof |
| Docs | `/docs` | Help center index |
| Blog | `/blog` | Updates |
| Contact | `/contact` | Sales & support |
| Get started | `/get-started` | Onboarding CTAs |

## Brand tokens

- Primary CTA: `#006afe` (MissOut blue)
- Accent / tab active: `#f92c99` (pink) + GitHub orange tab underline fallback
- Typography: system UI stack (GitHub home parity)
- Radius: 6px / 12px pills (GitHub), not sharp MissOut-only UI

## Assets

- Product shots: `/product/...` via `missout-1` public mount
- Brand: `landing-missout/public/brand`
- Partner logos: `/partner_fests/logos/...`

## Polish checklist (implemented)

| Area | GitHub reference | MissOut implementation |
|------|------------------|------------------------|
| Sticky header blur | Frosted nav on scroll | `missout-brand.css` backdrop on `.gh-header` |
| Nav active state | Current section highlight | `gh-nav-trigger--active` on Pricing + mega sections |
| Walkthrough chrome | Browser-style product frame | Window dots + step title bar on `WalkthroughDemo` |
| Section intros | Subcopy under H2 | `gh-section-lead` on platform, featured, stories |
| Featured repos | Repo cards grid | `FeaturedOnStage` → Stage activity cards |
| Inner page wayfinding | Breadcrumbs | `PageHero` + `Breadcrumbs` on features/pricing |
| Document title | Per-route `<title>` | `pageMeta.ts` via `MarketingLayout` |
| Footer social | Social icons row | Instagram / LinkedIn / X above legal row |
| Focus rings | Accessible focus | MissOut blue `focus-visible` on home |

## Content swap guide

When replacing placeholder copy:

1. **Hero pill** — ship notes in `siteContent.ts` → `HERO.announcement`
2. **Walkthrough tabs** — real Backstage/Stage screenshots in `WALKTHROUGH_STEPS`
3. **Activity marquee** — live ops events in `ACTIVITY_ITEMS`
4. **Featured on Stage** — real college/activity slugs in `FeaturedOnStage.tsx` (link to Stage URLs)
5. **Partner marquee** — logo paths already under `/partner_fests/logos`
6. **Customer stories** — link to `/customer-stories` detail when CMS exists

## Future parity (optional)

- Copilot-style “assistant” → MissOut AI/help (when product exists)
- GitHub Universe → MissOut fest season campaign page
- Status page → Stage/Backstage status (if hosted)
- Open Graph images per route (hero + product shots)
