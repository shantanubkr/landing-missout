import { Link } from 'react-router-dom'
import { ScrollReveal } from '../motion/ScrollReveal'
import { MANAGE_BENTO_IMAGES } from '../../lib/productAssets'
import { ProductGlassShell } from '../product/ProductGlassShell'
import { StageFeedDemo } from './StageFeedDemo'
import { CheckInDemo } from './CheckInDemo'

const SHOWCASES = [
  {
    id: 'registrations',
    title: 'Registrations',
    body: 'Forms, teams, and status in one place instead of scattered sheets.',
    src: MANAGE_BENTO_IMAGES.form,
    href: '/product/backstage#registrations',
  },
  {
    id: 'dashboard',
    title: 'Your dashboard',
    body: "See what's live, what's filling up, and what needs a decision.",
    src: MANAGE_BENTO_IMAGES.dashboard,
    href: '/product/backstage',
  },
  {
    id: 'roles',
    title: 'Roles and access',
    body: 'Give the team the right keys. Keep the rest locked.',
    src: MANAGE_BENTO_IMAGES.pbac,
    href: '/product/backstage#roles',
  },
  {
    id: 'metrics',
    title: 'Metrics',
    body: 'Attendance and activity you can actually report on.',
    src: MANAGE_BENTO_IMAGES.metrics,
    href: '/product/backstage',
  },
] as const

export function CapabilityModulesSection() {
  return (
    <section
      id="capabilities"
      aria-labelledby="capabilities-heading"
      className="relative bg-white px-4 py-14 sm:px-6 sm:py-16 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="max-w-xl">
            <h2
              id="capabilities-heading"
              className="font-display text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl"
            >
              Everything behind a successful event.
            </h2>
            <p className="mt-3 font-sans text-base text-[#5A5A5A] sm:text-lg">
              Registrations, teams, check-ins, communications, and analytics in Backstage.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-10">
          {SHOWCASES.map((item, i) => (
            <ScrollReveal key={item.id} delayMs={i * 60}>
              <Link
                to={item.href}
                className="group block no-underline outline-none focus-visible:rounded-[22px] focus-visible:ring-2 focus-visible:ring-[#F92C99] focus-visible:ring-offset-4"
              >
                <div className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out group-hover:scale-[1.01] motion-reduce:group-hover:scale-100">
                  <ProductGlassShell src={item.src} alt={item.title} />
                </div>
                <h3 className="mt-4 font-sans text-xl font-bold text-[#1A1A1A]">
                  {item.title}
                </h3>
                <p className="mt-1.5 max-w-md font-sans text-sm text-[#5A5A5A] sm:text-base">
                  {item.body}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 max-w-xl lg:mt-16">
          <ScrollReveal>
            <CheckInDemo />
            <p className="mt-3 font-sans text-sm text-[#5A5A5A]">
              Check-in without the clipboard scramble.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

export function IndirectStageBand() {
  return (
    <section
      id="stage-outcome"
      aria-labelledby="stage-outcome-heading"
      className="relative overflow-x-clip bg-[#FAFAFA] px-4 py-14 sm:px-6 sm:py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <ScrollReveal>
          <h2
            id="stage-outcome-heading"
            className="font-display text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl"
          >
            Where people find and join your event.
          </h2>
          <p className="mt-3 max-w-md font-sans text-base text-[#5A5A5A] sm:text-lg">
            You publish from Backstage. Stage is the discovery and registration surface
            attendees actually open.
          </p>
          <Link
            to="/product/stage"
            className="mt-5 inline-flex font-sans text-sm font-semibold text-[#006AFE] no-underline outline-none hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006AFE]"
          >
            See Stage
          </Link>
        </ScrollReveal>

        <ScrollReveal delayMs={80}>
          <StageFeedDemo />
        </ScrollReveal>
      </div>
    </section>
  )
}
