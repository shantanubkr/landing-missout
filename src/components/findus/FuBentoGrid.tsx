import type { ReactNode } from 'react'
import type { ProductShot } from '../../lib/productAssets'
import { ScrollReveal } from '../motion/ScrollReveal'
import { FuProductShot } from './FuProductShot'
import { FuBody, FuTitle } from './FuTypography'

export type FuBentoCell = {
  title: string
}

export type FuBentoGridProps = {
  title: string
  supporting?: string
  heroShot: ProductShot
  heroAlt: string
  cells: readonly FuBentoCell[]
  className?: string
}

/** Asymmetric bento — one large media cell + title-only supporting cells. */
export function FuBentoGrid({
  title,
  supporting,
  heroShot,
  heroAlt,
  cells,
  className,
}: FuBentoGridProps) {
  return (
    <div className={className}>
      <FuTitle level="h2" className="mb-3 max-w-xl">
        {title}
      </FuTitle>
      {supporting ? <FuBody className="mb-8 max-w-lg">{supporting}</FuBody> : null}

      <div className="grid items-start gap-4 lg:grid-cols-12 lg:gap-5">
        <ScrollReveal className="lg:col-span-7">
          <FuProductShot shot={heroShot} alt={heroAlt} loading="lazy" />
        </ScrollReveal>

        <div className="grid gap-4 lg:col-span-5">
          {cells.map((cell, index) => (
            <ScrollReveal key={cell.title} delayMs={150 + index * 80}>
              <BentoCell title={cell.title} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  )
}

function BentoCell({ title }: { title: ReactNode }) {
  return (
    <div className="rounded-[var(--fu-radius)] border border-[length:var(--fu-card-border-width)] border-[var(--fu-card-border)] bg-[var(--fu-surface)] px-5 py-6 sm:px-6 sm:py-7">
      <p className="fu-type-h3 m-0">{title}</p>
    </div>
  )
}
