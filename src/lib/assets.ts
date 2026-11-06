/**
 * Every replaceable screenshot on the site.
 *
 * Primary delivery: WebP under `public/landing-figma/`.
 * Masters also live under `assets/product-visuals/` for export.
 */
const F = '/landing-figma'
const WAYS = `${F}/ways`
const DEMO = `${F}/product-demo`

export const SHOTS = {
  backstageHome: `${F}/backstage-home.webp`,
  stageHome: `${F}/stage-home.webp`,
  /** Stage ticket / passes — not the same as home listing. */
  stagePasses: `${F}/stage/passes.webp`,

  ways: {
    buildPublish: `${WAYS}/build-publish.webp`,
    runCheckIns: `${WAYS}/run-check-ins.webp`,
    manageCommittees: `${WAYS}/manage-committees.webp`,
    sendUpdates: `${WAYS}/send-updates.webp`,
    recruit: `${WAYS}/recruit-your-team.webp`,
    money: `${WAYS}/money-proof.webp`,
  },

  demo: {
    makeEvent: `${DEMO}/make-event.webp`,
    backstageHomeUi: `${DEMO}/backstage-home-ui.webp`,
    checkInUi: `${DEMO}/check-in-ui.webp`,
    checkInDesk: `${DEMO}/check-in-desk.webp`,
    checkIn: `${DEMO}/check-in.webp`,
    registrationsHub: `${DEMO}/registrations-hub.webp`,
    registrations: `${DEMO}/registrations.webp`,
    contingentsList: `${DEMO}/contingents-list.webp`,
    contingents: `${DEMO}/contingents.webp`,
    paymentsMoney: `${DEMO}/payments-money.webp`,
    payments: `${DEMO}/payments.webp`,
  },

  menu: {
    backstage: `${F}/menu/backstage.webp`,
    stage: `${F}/menu/stage.webp`,
  },
} as const

export const PARTNER_LOGOS = [
  { name: 'NMIMS', src: '/partner_fests/logos/nm_logo.webp' },
  { name: 'BITS Design School', src: '/partner_fests/logos/bitsdesign_logo.webp' },
  { name: 'Jai Hind College', src: '/partner_fests/logos/jaihind_logo.webp' },
  { name: 'BITSoM', src: '/partner_fests/logos/bitsomlogo.webp' },
  { name: 'Thakur College', src: '/partner_fests/logos/thakur_college_logo.png' },
  { name: 'Shiv Nadar', src: '/partner_fests/logos/shiv.webp' },
] as const
