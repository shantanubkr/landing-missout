# Missout | Landing Page

Marketing landing site for [Missout](https://missout.in) — Figma NEW UI (Stage + Backstage).

## Stack

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4**
- **React Router v7**
- **Web3Forms** (optional contact form POST)
- **Vercel Analytics**
- **Vercel** (hosting)

## Pages

| Route | Page |
|-------|------|
| `/` | Home (Figma frame, product demo, CTAs) |
| `/products/backstage` | Backstage product |
| `/products/stage` | Stage product |
| `/features` | Features hub |
| `/features/:featureId` | Feature story (e.g. `build-publish`, `run-check-ins`) |
| `/about` | About |
| `/developers` | Developers / students |
| `/contact` | Contact + demo request flow |
| `/privacy` | Privacy policy |
| `/terms-of-service` | Terms of service |
| `*` | 404 |

Legacy URLs (e.g. `/stage`, `/product/backstage`, old `/features/*` paths) redirect to the routes above.

## Local development

```bash
npm install
cp .env.example .env   # optional keys
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Optional | [Web3Forms](https://web3forms.com) key for in-browser contact submit. Without it, submit uses mailto. |
| `VITE_SITE_URL` | Optional (recommended for prod) | Canonical origin, e.g. `https://missout.in`. Updates `og:url` and social images at runtime. |

Set in **Vercel → Settings → Environment Variables** for production.

## Build

```bash
npm run build
npm run preview
```

## Static assets

Product shots, Figma exports, brand, and partner logos live under `public/` (notably `public/landing-figma/`, `public/product/`, `public/brand/`). Path slots are defined in `src/lib/assets.ts`.

## Project structure

```
src/
  pages/          # Route-level pages
  components/     # UI (Figma shell, motion, product kit)
  hooks/
  lib/            # Routes, feature data, asset paths
public/           # Static files served at /
docs/             # Design IA notes (optional reference)
```
