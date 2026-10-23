import { useLayoutEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { ContactSection } from '../components/contact'
import { ButtonAnchor, ButtonLink } from '../components/ui'
import { PRODUCT_CREATE_HREF } from '../lib/productUrls'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { FeatureChapter, FeatureGrid, UseCaseRow } from '../components/product/FeatureLayouts'
import { CreateChoiceDemo, CheckInDemo } from '../components/home'
import {
  ComposeUpdateDemo,
  RegistrationsTableDemo,
} from '../components/product/ProductUiDemos'
import {
  PRODUCT_HERO_BACKSTAGE_IMG,
  ProductGlassShell,
} from '../components/product/ProductGlassShell'
import { MANAGE_BENTO_IMAGES } from '../lib/productAssets'

const USE_CASES = [
  {
    href: '#create',
    title: 'Create Event or Host a Festival',
    iconSrc: '/value_propositions/create.svg',
    iconBg: 'bg-[#FDE8F3]',
  },
  {
    href: '#registrations',
    title: 'Take registrations',
    iconSrc: '/value_propositions/register.svg',
    iconBg: 'bg-[#E8F1FF]',
  },
  {
    href: '#check-in',
    title: 'Check people in',
    iconSrc: '/value_propositions/manage.svg',
    iconBg: 'bg-[#E8F8EF]',
  },
  {
    href: '#updates',
    title: 'Send updates once',
    iconSrc: '/value_propositions/track.svg',
    iconBg: 'bg-[#FFF4E5]',
  },
  {
    href: '#roles',
    title: 'Roles that stick',
    iconSrc: '/value_propositions/control.svg',
    iconBg: 'bg-[#EEE8FF]',
  },
] as const

const GRID = [
  {
    title: 'Create',
    blurb: 'Typed events day to day. Festivals when the ops are heavier.',
    href: '#create',
  },
  {
    title: 'Registrations',
    blurb: 'Forms, teams, capacity, and status in one table.',
    href: '#registrations',
  },
  {
    title: 'Check-in',
    blurb: 'QR and live counts instead of clipboard chaos.',
    href: '#check-in',
  },
  {
    title: 'Updates',
    blurb: 'Reach everyone who signed up - delivered on Stage.',
    href: '#updates',
  },
  {
    title: 'Roles',
    blurb: 'Permissions for core, volunteers, and departments.',
    href: '#roles',
  },
  {
    title: 'Metrics',
    blurb: 'Attendance and activity you can actually report.',
    href: '#roles',
  },
] as const

export function BackstageProductPage() {
  const { hash } = useLocation()

  usePageMeta({
    title: 'Backstage',
    description:
      'Run events on Missout Backstage - create events or festivals, registrations, check-in, updates, and team roles.',
  })

  useLayoutEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [hash])

  return (
    <div>
      <section className="bg-white px-4 pb-10 pt-28 sm:px-6 sm:pb-12 sm:pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-12">
            <div>
              <p className="font-sans text-sm text-[#5A5A5A]">Missout for organisers</p>
              <h1 className="mt-2 text-balance font-sans text-4xl font-bold tracking-tight text-[#1A1A1A] sm:text-5xl md:text-[3.25rem]">
                Free up time to actually run the event.
              </h1>
              <p className="mt-4 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#5A5A5A] sm:text-lg">
                Backstage is where you create, register, check in, update, and manage the
                team. Stage is how people find what you publish.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3">
                <ButtonAnchor
                  href={PRODUCT_CREATE_HREF}
                  variant="primary"
                  theme="product"
                  size="lg"
                  className="!font-semibold"
                >
                  Let&apos;s create
                </ButtonAnchor>
                <ButtonLink
                  to="#contact"
                  variant="outline"
                  theme="product"
                  size="lg"
                  className="!font-semibold"
                >
                  Request a demo
                </ButtonLink>
              </div>
            </div>

            <ScrollReveal>
              <ProductGlassShell
                src={PRODUCT_HERO_BACKSTAGE_IMG}
                alt="Manage through Backstage"
                loading="eager"
              />
            </ScrollReveal>
          </div>

          <FeatureGrid items={GRID} />
        </div>
      </section>

      <UseCaseRow heading="See what Backstage can do" items={USE_CASES} />

      {/* Create - full-width dual path (too wide for side-by-side chapter) */}
      <section
        id="create"
        className="scroll-mt-28 border-t border-[#E8E8E8] bg-white px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="max-w-2xl">
              <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
                Create Event or Host a Festival.
              </h2>
              <p className="mt-3 font-sans text-base leading-relaxed text-[#5A5A5A] sm:text-lg">
                Two sections on purpose. Create Event picks a type - competition, workshop,
                performance, seminar. Host a Festival is its own path for heavier ops.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delayMs={70}>
            <div className="mt-8 sm:mt-10">
              <CreateChoiceDemo />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div id="create-event" className="scroll-mt-28" />
      <div id="create-festival" className="scroll-mt-28" />

      {/* Registrations - wide table + form asset, stacked (not twin mockup chapter) */}
      <section
        id="registrations"
        className="scroll-mt-28 border-t border-[#E8E8E8] bg-white px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <div className="max-w-2xl">
              <p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#9A9A9A]">
                Registrations
              </p>
              <h2 className="mt-2 text-balance font-sans text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
                Take registrations without the spreadsheet stack.
              </h2>
              <p className="mt-3 font-sans text-base leading-relaxed text-[#5A5A5A] sm:text-lg">
                Forms, teams, capacity, and status in one place. Replaces Google Forms as
                the source of truth.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start lg:gap-8">
            <ScrollReveal>
              <RegistrationsTableDemo />
            </ScrollReveal>
            <ScrollReveal delayMs={70}>
              <div>
                <ProductGlassShell
                  src={MANAGE_BENTO_IMAGES.form}
                  alt="Registration form builder"
                />
                <p className="mt-3 font-sans text-sm text-[#5A5A5A]">
                  Build the form once. Status lives with every signup.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Check-in - dark door station, different from registrations */}
      <section
        id="check-in"
        className="scroll-mt-28 bg-[#0B0B0B] px-4 py-16 sm:px-6 sm:py-20"
      >
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-14">
          <ScrollReveal>
            <p className="font-sans text-xs font-medium uppercase tracking-[0.08em] text-[#C8F531]">
              Check-in
            </p>
            <h2 className="mt-2 text-balance font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Check people in without the clipboard scramble.
            </h2>
            <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-white/65 sm:text-lg">
              Scan QR at the door or tick the roster. Live counts so entry doesn’t become
              another WhatsApp thread.
            </p>
            <ul className="mt-6 space-y-2 font-sans text-sm text-white/80">
              <li className="flex gap-2">
                <span className="text-[#C8F531]" aria-hidden>
                  ✓
                </span>
                QR scan for tickets
              </li>
              <li className="flex gap-2">
                <span className="text-[#C8F531]" aria-hidden>
                  ✓
                </span>
                Manual tick on the roster
              </li>
              <li className="flex gap-2">
                <span className="text-[#C8F531]" aria-hidden>
                  ✓
                </span>
                Walk-ins without breaking the count
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delayMs={70}>
            <CheckInDemo />
          </ScrollReveal>
        </div>
      </section>

      <FeatureChapter
        id="updates"
        title="Send once. Reach everyone who signed up."
        blurb="Targeted updates with history. Attendees read them on Stage instead of hunting Instagram stories."
        reverse
      >
        <ComposeUpdateDemo />
      </FeatureChapter>

      <FeatureChapter
        id="roles"
        title="Give the team the right keys."
        blurb="Roles and permissions so core, volunteers, and departments aren’t sharing one login."
      >
        <ProductGlassShell
          src={MANAGE_BENTO_IMAGES.pbac}
          alt="Roles and permissions"
        />
      </FeatureChapter>

      <section className="border-t border-[#E8E8E8] bg-[#FAFAFA] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-2xl font-bold text-[#1A1A1A] sm:text-3xl">
            Discovery lives on Stage.
          </h2>
          <p className="mt-3 font-sans text-base text-[#5A5A5A]">
            People find and join what you publish.{' '}
            <Link
              to="/product/stage"
              className="font-semibold text-[#006AFE] no-underline"
            >
              See Stage →
            </Link>
          </p>
        </div>
      </section>

      <ContactSection accent="product" />
    </div>
  )
}
