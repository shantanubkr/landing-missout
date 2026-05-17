import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

/**
 * FAQ copy for the home page.
 */
export type FaqItem = {
  id: string
  question: string
  answer: ReactNode
}

const partnerLinkClass =
  'font-medium text-[#1A1A1A] underline decoration-[#1A1A1A]/30 underline-offset-[0.2em] transition-[color,decoration-color] duration-200 hover:text-[#F92C99] hover:decoration-[#F92C99]/50 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F92C99]'

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    id: 'what-is-missout',
    question: 'What is Missout?',
    answer: (
      <>
        A platform for college events. Students use it to find what&apos;s happening on campus. Organisers use it to
        manage everything around their event from one dashboard.
      </>
    ),
  },
  {
    id: 'who-can-use',
    question: 'Who can use it?',
    answer: (
      <>
        Students and event organisers on college campuses — clubs, societies, fest teams, departments, anyone running a
        campus event.
      </>
    ),
  },
  {
    id: 'how-for-students',
    question: 'How does it work for students?',
    answer: (
      <>
        You open Missout, see what&apos;s happening on your campus, and register directly. No hunting through WhatsApp
        groups or Instagram stories.
      </>
    ),
  },
  {
    id: 'how-for-organisers',
    question: 'How does it work for organisers?',
    answer: (
      <>
        You get a dashboard where you handle everything — your team, registrations, event info, updates, media, sponsor
        details, and metrics. Instead of juggling spreadsheets, forms, and group chats, it&apos;s all in one place.
      </>
    ),
  },
  {
    id: 'replace-current-setup',
    question: 'Does it replace our current setup?',
    answer: (
      <>
        Not exactly. Missout is the organiser-facing infrastructure that didn&apos;t exist before — a proper dashboard
        to run and manage your event, plus a discovery layer so students can actually find it. Your internal execution
        stays the same.
      </>
    ),
  },
  {
    id: 'google-forms-instagram',
    question: 'What about Google Forms and Instagram?',
    answer: (
      <>
        Google Forms gives you a spreadsheet. Instagram gives you a post. Missout gives you a full organiser dashboard
        — registrations, team management, updates, media, metrics — and makes your event discoverable to students who
        weren&apos;t already in your group.
      </>
    ),
  },
  {
    id: 'only-big-fests',
    question: 'Is it only for big fests?',
    answer: (
      <>
        No. A department talk or a small society meetup works just as well. Smaller events probably benefit more since
        they usually have the least infrastructure around them.
      </>
    ),
  },
  {
    id: 'when-can-we-use',
    question: 'When can we use it?',
    answer: (
      <>
        We&apos;re in early access, onboarding our first set of college campuses. If you want to bring Missout to your
        campus,{' '}
        <Link to="/#contact" className={partnerLinkClass}>
          get in touch
        </Link>
        .
      </>
    ),
  },
]
