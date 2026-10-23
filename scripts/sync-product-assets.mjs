#!/usr/bin/env node
/**
 * Copy newly dropped PNGs from repo root into public/product paths.
 * Run after exporting fresh screenshots — then update dimensions in productAssets.ts if they changed.
 */
import { copyFileSync, existsSync } from 'fs'

const root = new URL('..', import.meta.url).pathname

const copies = [
  ['light_Events_home_features.png', 'public/product/home-features/events_light.png'],
  ['dark_Events_home_features.png', 'public/product/home-features/events_dark.png'],
  ['registration_light.png', 'public/product/home-features/registrations_light.png'],
  ['registration_dark.png', 'public/product/home-features/registrations_dark.png'],
  ['checkin_light 1.png', 'public/product/home-features/checkin_light.png'],
  ['checkin_dark 1.png', 'public/product/home-features/checkin_dark.png'],
  ['checkin_light 1.png', 'public/product/features/checkin_light.png'],
  ['checkin_dark 1.png', 'public/product/features/checkin_dark.png'],
  ['department_create_light 1.png', 'public/product/features/department_create_light.png'],
  ['department_create_dark 1.png', 'public/product/features/department_create_dark.png'],
  ['event_type_picker_light 1.png', 'public/product/features/event_type_picker_light.png'],
  ['event_type_picker 1.png', 'public/product/features/event_type_picker_dark.png'],
  ['event_type_picker 1.png', 'public/product/features/event_type_picker.png'],
  ['send_update_light 1.png', 'public/product/features/send_update_light.png'],
  ['send_update_dark 1.png', 'public/product/features/send_update_dark.png'],
  ['3_ticketing.png', 'public/product/discover-bento/3_ticketing.png'],
  ['3_ticketing_dark.png', 'public/product/discover-bento/3_ticketing_dark.png'],
  ['stage_iphone.png', 'public/product/stage/stage_iphone.png'],
]

let copied = 0
for (const [from, to] of copies) {
  const src = `${root}/${from}`
  const dest = `${root}/${to}`
  if (!existsSync(src)) continue
  copyFileSync(src, dest)
  console.log(`${from} → ${to}`)
  copied += 1
}

console.log(copied ? `Synced ${copied} asset(s).` : 'No root drop files found to sync.')
