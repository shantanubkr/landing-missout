import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { ScrollReveal } from '../motion/ScrollReveal'

type FeatureChapterProps = {
  id: string
  title: string
  blurb: string
  reverse?: boolean
  children: React.ReactNode
  className?: string
}

/** Notion feature chapter: copy left, product visual right (or reversed). */
export function FeatureChapter({
  id,
  title,
  blurb,
  reverse = false,
  children,
  className,
}: FeatureChapterProps) {
  return (
    <section
      id={id}
      className={cn('scroll-mt-28 border-t border-[#E8E8E8] bg-white px-4 py-16 sm:px-6 sm:py-20', className)}
    >
      <div
        className={cn(
          'mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14',
          reverse && 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1',
        )}
      >
        <ScrollReveal>
          <h2 className="text-balance font-sans text-3xl font-bold tracking-tight text-[#1A1A1A] sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-pretty font-sans text-base leading-relaxed text-[#5A5A5A] sm:text-lg">
            {blurb}
          </p>
        </ScrollReveal>

        <ScrollReveal delayMs={70}>{children}</ScrollReveal>
      </div>
    </section>
  )
}

export type UseCaseCard = {
  href: string
  title: string
  iconSrc?: string
  /** Tailwind bg for icon circle */
  iconBg: string
}

/** Notion “See what X can do” horizontal use-case row. */
export function UseCaseRow({
  heading,
  items,
}: {
  heading: string
  items: readonly UseCaseCard[]
}) {
  return (
    <section className="bg-white px-4 py-12 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-6xl">
        <p className="font-sans text-sm text-[#5A5A5A]">{heading}</p>
        <ul className="mt-5 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
          {items.map((item) => (
            <li key={item.title} className="min-w-[10.5rem] shrink-0 sm:min-w-0">
              <Link
                to={item.href}
                className={cn(
                  'flex h-full flex-col rounded-2xl border border-[#E8E8E8] bg-white p-4 no-underline',
                  'transition-[border-color,background-color] duration-200 hover:border-[#C5C5C5] hover:bg-[#FAFAFA]',
                  'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006AFE]',
                )}
              >
                <span
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full',
                    item.iconBg,
                  )}
                >
                  {item.iconSrc ? (
                    <img
                      src={item.iconSrc}
                      alt=""
                      className="h-6 w-6 object-contain"
                      draggable={false}
                    />
                  ) : (
                    <span className="h-2.5 w-2.5 rounded-full bg-[#1A1A1A]/50" />
                  )}
                </span>
                <span className="mt-4 font-sans text-sm font-semibold leading-snug text-[#1A1A1A]">
                  {item.title}
                  <span aria-hidden className="ml-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export type FeatureGridItem = {
  title: string
  blurb: string
  href: string
}

/** Notion-style feature grid under a hero visual. */
export function FeatureGrid({ items }: { items: readonly FeatureGridItem[] }) {
  return (
    <ul className="mx-auto mt-10 grid max-w-6xl gap-3 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
      {items.map((item) => (
        <li key={item.title}>
          <Link
            to={item.href}
            className={cn(
              'block h-full rounded-2xl bg-[#F4F4F4] p-5 no-underline sm:p-6',
              'transition-colors duration-200 hover:bg-[#ECECEC]',
              'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006AFE]',
            )}
          >
            <span className="font-sans text-base font-bold text-[#1A1A1A]">
              {item.title}
              <span aria-hidden className="ml-1">
                →
              </span>
            </span>
            <p className="mt-2 font-sans text-sm leading-relaxed text-[#5A5A5A]">
              {item.blurb}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  )
}
