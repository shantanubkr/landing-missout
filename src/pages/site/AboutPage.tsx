import {
  AboutHelloStar,
  AboutHeroStars,
  AboutPhoto,
  MarkCluster,
  MarkDoor,
  MarkFive,
  MarkInbox,
  MarkStar,
} from '../../components/AboutMarks'
import { FigmaSiteShell } from '../../components/FigmaSiteShell'
import { FigmaButtonPrimary, FigmaButtonSecondary, FigmaH1 } from '../../components/figma/FigmaPrimitives'
import { AnimatedText, FadeUp } from '../../components/motion/AnimatedText'
import { CountUp } from '../../components/motion/CountUp'
import { BOOK_DEMO_WHATSAPP, CONTACT_MAILTO } from '../../lib/links'
import { REQUEST_DEMO_PATH } from '../../lib/siteRoutes'
import teamPhoto from '../../assets/about/team.jpg'
import type { ReactNode } from 'react'

const BTN = '!h-9 !min-w-[104px] !px-4 !text-[14px] sm:!h-10 sm:!min-w-[120px] sm:!text-[15px]'

const STATS = [
  { value: 5, suffix: '', label: 'of us on the desk', mark: <MarkFive className="h-10 w-auto" /> },
  { value: 733, suffix: '+', label: 'students we have checked in', mark: <MarkCluster className="h-9 w-auto" /> },
  { value: 1, suffix: '+', label: 'live fest, on purpose', mark: <MarkStar className="h-10 w-auto" /> },
] as const

const STORIES: { title: string; body: string; mark: ReactNode }[] = [
  {
    title: 'Students first',
    body: 'We started on campus. We still work from it. The people in the picture are the people who answer.',
    mark: <MarkFive className="h-10 w-auto" />,
  },
  {
    title: 'A person answers',
    body: 'Email, WhatsApp, a walk over. If a committee writes, someone on the team reads it.',
    mark: <MarkInbox className="h-11 w-auto" />,
  },
  {
    title: 'We know that hour',
    body: 'The one before doors open. That is the work we care about, because we used to stand in it.',
    mark: <MarkDoor className="h-12 w-auto" />,
  },
]

export function AboutPage() {
  return (
    <FigmaSiteShell>
      <div className="site-grid bg-white">
        <div className="site-grid-col">
          <header className="overflow-hidden border-b border-line py-16 text-center sm:py-20 lg:py-24">
            <div className="relative">
              <AboutHeroStars />
              <div className="site-cell relative z-[1]">
              <FigmaH1 size="xl" className="mx-auto max-w-[14ch]">
                We were in the room.
              </FigmaH1>
              <FadeUp trigger="load" delay={480}>
                <p className="font-display mx-auto mt-5 max-w-[36ch] text-[clamp(17px,1.27vw,22px)] leading-[1.35] text-pretty text-[#555]">
                  Five of us ran college fests, then built the desk we wished we had. The picture is us. The inbox is us.
                </p>
              </FadeUp>
              <FadeUp trigger="load" delay={640} className="mt-8 flex flex-wrap justify-center gap-3">
                <FigmaButtonPrimary href={CONTACT_MAILTO} className={BTN}>
                  Write us
                </FigmaButtonPrimary>
                <FigmaButtonSecondary href={BOOK_DEMO_WHATSAPP} className={BTN}>
                  WhatsApp the desk
                </FigmaButtonSecondary>
              </FadeUp>
              </div>
            </div>
          </header>

          <section aria-label="Who we are" className="grid grid-cols-1 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                tabIndex={0}
                className="about-stat site-cell relative border-b border-line py-10 sm:border-r sm:py-12 sm:last:border-r-0"
              >
                <div className="pointer-events-none absolute top-6 right-[clamp(20px,2.4vw,40px)] opacity-90">
                  {stat.mark}
                </div>
                <p className="font-display m-0 text-[clamp(44px,4.2vw,72px)] leading-none tracking-[0.01em] text-brand-pink">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-display m-0 mt-3 max-w-[18ch] text-[15px] leading-[1.35] text-[#666]">
                  {stat.label}
                </p>
              </div>
            ))}
          </section>

          <section aria-labelledby="people-title">
            <div className="site-cell border-b border-line py-12 text-center sm:py-16">
              <MarkFive className="mx-auto mb-6 h-11 w-[min(100%,280px)]" />
              <AnimatedText
                as="h2"
                id="people-title"
                text="The people in the picture"
                className="font-display m-0 text-[clamp(28px,2.6vw,44px)] leading-[0.95] tracking-[0.01em] text-black"
              />
              <FadeUp delay={80}>
                <p className="font-display mx-auto mt-4 max-w-[38ch] text-[clamp(16px,1.05vw,18px)] leading-[1.4] text-[#555]">
                  We stood in the same halls we now help run. That has not changed.
                </p>
              </FadeUp>
            </div>
            <div className="border-b border-line px-[clamp(20px,2.4vw,40px)] py-[clamp(20px,2.4vw,40px)]">
              <AboutPhoto src={teamPhoto} alt="The MissOut team" />
            </div>
          </section>

          <section aria-label="How we work" className="grid grid-cols-1 sm:grid-cols-3">
            {STORIES.map((story) => (
              <div
                key={story.title}
                tabIndex={0}
                className="about-story site-cell flex flex-col border-b border-line py-10 sm:border-r sm:py-12 sm:last:border-r-0"
              >
                <div className="mb-5">{story.mark}</div>
                <p className="about-story-title font-display m-0 text-[clamp(18px,1.2vw,22px)] text-black">
                  {story.title}
                </p>
                <p className="font-display m-0 mt-2 flex-1 text-[15px] leading-[1.4] text-[#666]">{story.body}</p>
              </div>
            ))}
          </section>

          <div className="site-cell flex flex-col gap-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
            <div>
              <p className="font-display m-0 inline-flex items-center gap-2 text-[13px] tracking-[0.08em] text-[#666] uppercase">
                <AboutHelloStar />
                Come say hello
              </p>
              <p className="font-display m-0 mt-3 max-w-[28ch] text-[clamp(22px,2vw,32px)] leading-[1.05] tracking-[0.01em] text-black">
                If you want to talk, write. It is the same five people.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <FigmaButtonPrimary href={CONTACT_MAILTO} className={BTN}>
                Write us
              </FigmaButtonPrimary>
              <FigmaButtonSecondary to={REQUEST_DEMO_PATH} className={BTN} tone="black">
                Leave a note
              </FigmaButtonSecondary>
            </div>
          </div>
        </div>
      </div>
    </FigmaSiteShell>
  )
}
