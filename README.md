# Missout — Landing Page

Marketing landing site for [Missout](https://missout.in) — a college event discovery and management platform.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (utility-first styles)
- **React Router v7** (client-side routing)
- **Framer Motion** (scroll animations / parallax)
- **Web3Forms** (contact form submissions)
- **Vercel** (hosting)

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, value props, FAQ, partners, contact |
| `/product` | Product — discover events (Missout) + manage events (Backnd) |
| `/about` | About — mission, audience, team |
| `*` | 404 |

## Local development

```bash
npm install
cp .env.example .env      # fill in optional keys (see below)
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment variables

Copy `.env.example` to `.env` and fill in the values:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Optional | [Web3Forms](https://web3forms.com) access key. Without it the contact form falls back to opening the visitor's mail client. |
| `VITE_SITE_URL` | Optional (recommended for prod) | Canonical site URL (e.g. `https://missout.in`). Used to set `<link rel="canonical">`, `og:url`, and `og:image`. |

Set both in the **Vercel dashboard → Settings → Environment Variables** before deploying.

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the built output locally
```

## Static assets

Images that need to be added to `public/` before deploy:

| Folder | Contents |
|--------|----------|
| `public/people/` | Team portrait PNGs: `Shantanu.png`, `Aryan.png`, `Samarth.png`, `Siddharth.png` (504×630 px) |
| `public/product/` | `missout.png`, `backnd.png` (product hero cards) |
| `public/product/discover-bento/` | `1_missout.png` … `8_logo.png` |
| `public/product/manage-bento/` | `1_Your_whole.png` … `8_manage_event.png` |
| `public/partner_fests/logos/` | `umang_logo.jpg` + logos for other partner fests |

## Project structure

```
src/
  pages/          # Route-level page components
  components/     # Feature-grouped UI components
  hooks/          # Custom React hooks (parallax, scroll, meta)
  lib/            # Static data and utility helpers
public/           # Static files served at /
```
