/**
 * Every replaceable screenshot on the site.
 *
 * Files live in `public/`. To swap a shot: drop the new file in that folder
 * and point the slot below at it. Decorative SVGs stay in
 * components. About team photo is `src/assets/about/team.jpg`.
 */
const F = '/landing-figma'
const WAYS = `${F}/ways`
const DEMO = `${F}/product-demo`

export const SHOTS = {
  backstageHome: `${F}/backstage-home.jpg`,
  stageHome: `${F}/stage-home.jpg`,

  ways: {
    buildPublish: `${WAYS}/build-publish.jpg`,
    runCheckIns: `${WAYS}/run-check-ins.jpg`,
    manageCommittees: `${WAYS}/manage-committees.jpg`,
    sendUpdates: `${WAYS}/send-updates.jpg`,
    recruit: `${WAYS}/recruit-your-team.jpg`,
    money: `${WAYS}/money-proof.jpg`,
  },

  demo: {
    makeEvent: `${DEMO}/make-event.png`,
    backstageHomeUi: `${DEMO}/backstage-home-ui.png`,
    checkInUi: `${DEMO}/check-in-ui.png`,
    checkInDesk: `${DEMO}/check-in-desk.jpg`,
    checkIn: `${DEMO}/check-in.png`,
    registrationsHub: `${DEMO}/registrations-hub.jpg`,
    registrations: `${DEMO}/registrations.png`,
    contingentsList: `${DEMO}/contingents-list.jpg`,
    contingents: `${DEMO}/contingents.png`,
    paymentsMoney: `${DEMO}/payments-money.jpg`,
    payments: `${DEMO}/payments.png`,
  },

  menu: {
    backstage: `${F}/backstage-home.jpg`,
    stage: `${F}/stage-home.jpg`,
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
