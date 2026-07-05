import { useId } from 'react'
import { cn } from '../../lib/cn'
import { ScrollReveal } from '../motion/ScrollReveal'

type AudienceCard = {
  key: string
  pill: string
  headlineWords: readonly [string, string, string]
  body: string
}

const AUDIENCE_CARDS: readonly AudienceCard[] = [
  {
    key: 'students',
    pill: 'For Students',
    headlineWords: ['Discover', 'Register', 'Track'],
    body: 'Discover, register, and keep track of everything happening in colleges at one place.',
  },
  {
    key: 'organisers',
    pill: 'For Organisers',
    headlineWords: ['Create', 'Manage', 'Control'],
    body: 'A clean dashboard to manage your event registrations, updates, and authority without the chaos.',
  },
  {
    key: 'campuses',
    pill: 'For Campuses',
    headlineWords: ['Unify', 'Organise', 'Surface'],
    body: 'One platform that brings every club, fest, and event under a single discoverable system.',
  },
]

function AudienceBlock({ card }: { card: AudienceCard }) {
  return (
    <article className="text-center md:text-left">
      <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
        {card.pill}
      </p>
      <h3 className="font-display mt-4 text-balance text-[2rem] font-bold leading-[1.05] tracking-tight text-[#1A1A1A] sm:mt-5 sm:text-[2.35rem]">
        {card.headlineWords.map((word, i) => (
          <span key={word} className={cn('block', i === 1 && 'text-[#F92C99]')}>
            {word}
          </span>
        ))}
      </h3>
      <p className="mx-auto mt-5 max-w-sm font-sans text-base leading-relaxed text-[#5A5A5A] text-pretty sm:mt-6 sm:text-lg md:mx-0">
        {card.body}
      </p>
    </article>
  )
}

export function AboutAudienceSection() {
  const headingId = useId()

  return (
    <section
      id="about-audiences"
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:py-24"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center">
            <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
              Who it&apos;s for
            </p>
            <h2
              id={headingId}
              className="font-display mx-auto mt-4 max-w-4xl text-balance text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-5 sm:text-4xl md:text-5xl"
            >
              One platform, three sides of campus
            </h2>
          </div>
        </ScrollReveal>

        <ul className="m-0 mt-12 grid list-none gap-12 p-0 sm:mt-14 md:mt-16 md:grid-cols-3 md:gap-10 lg:gap-12">
          {AUDIENCE_CARDS.map((card, index) => (
            <li
              key={card.key}
              className={cn(
                'min-w-0',
                index > 0 && 'md:border-l md:border-[#ECECEC] md:pl-10 lg:pl-12',
              )}
            >
              <ScrollReveal delayMs={70 + index * 80}>
                <AudienceBlock card={card} />
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
