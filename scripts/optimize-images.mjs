#!/usr/bin/env node
/**
 * Resize + WebP compress raster assets under public/.
 * Extracts embedded PNGs from bloated SVG exports (Figma base64 pattern).
 */
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, unlinkSync, existsSync, statSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PUBLIC = join(ROOT, 'public')

function run(cmd, args) {
  execFileSync(cmd, args, { stdio: 'pipe' })
}

function bytes(path) {
  return statSync(path).size
}

function fmt(n) {
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
}

function extractEmbeddedPng(svgPath, outPng) {
  const content = readFileSync(svgPath, 'utf8')
  const m = content.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/)
  if (!m) return false
  writeFileSync(outPng, Buffer.from(m[1], 'base64'))
  return true
}

/** Resize so longest edge <= maxEdge, then encode WebP. */
function toWebp(input, output, { maxEdge = 1600, quality = 82 } = {}) {
  const tmp = `${output}.tmp.png`
  run('cp', [input, tmp])
  run('sips', ['-Z', String(maxEdge), tmp, '--out', tmp])
  run('cwebp', ['-q', String(quality), '-m', '6', tmp, '-o', output])
  unlinkSync(tmp)
}

function optimizePngInPlace(pngPath, maxEdge, quality = 82) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp')
  const before = bytes(pngPath)
  toWebp(pngPath, webpPath, { maxEdge, quality })
  unlinkSync(pngPath)
  const after = bytes(webpPath)
  return { webpPath, before, after }
}

const jobs = []

/** Bloated SVG → WebP (delete SVG after). */
for (const rel of [
  'partner_fests/background_graphic.svg',
  'product/product_bg.svg',
]) {
  const svg = join(PUBLIC, rel)
  const webp = svg.replace(/\.svg$/i, '.webp')
  const tmpPng = `${webp}.extract.png`
  const before = bytes(svg)
  if (!extractEmbeddedPng(svg, tmpPng)) {
    console.warn(`skip (no embed): ${rel}`)
    continue
  }
  const maxEdge = rel.includes('product_bg') ? 1600 : 1240
  toWebp(tmpPng, webp, { maxEdge, quality: 80 })
  unlinkSync(tmpPng)
  unlinkSync(svg)
  jobs.push({ rel, before, after: bytes(webp), out: basename(webp) })
}

/** Unused 4.6MB SVG — extract WebP only, remove SVG. */
{
  const svg = join(PUBLIC, 'about_hero_graphic.svg')
  if (existsSync(svg)) {
    const webp = join(PUBLIC, 'about_hero_graphic.webp')
    const tmpPng = `${webp}.extract.png`
    const before = bytes(svg)
    if (extractEmbeddedPng(svg, tmpPng)) {
      toWebp(tmpPng, webp, { maxEdge: 1512, quality: 80 })
      unlinkSync(tmpPng)
      unlinkSync(svg)
      jobs.push({ rel: 'about_hero_graphic.svg', before, after: bytes(webp), out: 'about_hero_graphic.webp' })
    }
  }
}

/** Product hero cards — max ~736px layout, 2× retina. */
for (const rel of ['product/Stage.png', 'product/backstage.png']) {
  const p = join(PUBLIC, rel)
  if (!existsSync(p)) continue
  const { before, after } = optimizePngInPlace(p, 1000, 82)
  jobs.push({ rel, before, after, out: basename(p).replace('.png', '.webp') })
}

/** Partner logos — shown up to ~208px, 2× retina. */
for (const name of ['nm_logo.png', 'bitsdesign_logo.png', 'jaihind_logo.png', 'Rangreza_Logo.png', 'evo_logo.png']) {
  const p = join(PUBLIC, 'partner_fests/logos', name)
  if (!existsSync(p)) continue
  const { before, after } = optimizePngInPlace(p, 416, 85)
  jobs.push({ rel: `partner_fests/logos/${name}`, before, after, out: name.replace('.png', '.webp') })
}

/** Discover + manage bento tiles — already ~840px wide; compress. */
for (const dir of ['product/discover-bento', 'product/manage-bento']) {
  const folder = join(PUBLIC, dir)
  for (const name of [
    '1_missout.png', '2_locate.png', '3_ticketing.png', '4_tagline.png', '5_updates.png',
    '6_discover.png', '7_powered.png', '8_logo.png',
    '1_Your_whole.png', '2_PBAC.png', '3_Your_dashboard.png', '4_metrics.png',
    '5_activity_logs.png', '6_form_builder.png', '7_backstage_title.png', '8_manage_event.png',
  ]) {
    const p = join(folder, name)
    if (!existsSync(p)) continue
    const { before, after } = optimizePngInPlace(p, 900, 82)
    jobs.push({ rel: `${dir}/${name}`, before, after, out: name.replace('.png', '.webp') })
  }
}

/** Team portraits — keep 504px width, recompress. */
for (const name of ['Shantanu.png', 'Aryan.png', 'Samarth.png']) {
  const p = join(PUBLIC, 'people', name)
  if (!existsSync(p)) continue
  const { before, after } = optimizePngInPlace(p, 504, 85)
  jobs.push({ rel: `people/${name}`, before, after, out: name.replace('.png', '.webp') })
}

/** Misc large PNGs. */
for (const rel of ['value_propositions/background_graphic.png', 'missoutxsdu.png']) {
  const p = join(PUBLIC, rel)
  if (!existsSync(p)) continue
  const { before, after } = optimizePngInPlace(p, 1200, 80)
  jobs.push({ rel, before, after, out: basename(p).replace('.png', '.webp') })
}

let saved = 0
for (const j of jobs) {
  saved += j.before - j.after
  console.log(`${j.rel} → ${j.out}: ${fmt(j.before)} → ${fmt(j.after)}`)
}
console.log(`\nTotal saved: ${fmt(saved)} across ${jobs.length} assets`)
