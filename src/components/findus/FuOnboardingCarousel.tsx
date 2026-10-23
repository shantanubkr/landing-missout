import { useState } from 'react'
import { cn } from '../../lib/cn'
import { FU_ELEVATION } from '../../lib/design/findus'
import { fuFocusRing, fuMotion, fuStepDotClass } from '../../lib/design/findusMotion'
import { MissoutIcon } from '../icons'
import { FuButton, FuButtonAnchor } from './FuButton'
import { FuProductShot } from './FuProductShot'
import { FuStepProgress } from './FuStepProgress'
import { FuMeta } from './FuTypography'
import type { FuOnboardingStep } from './FuOnboardingGrid'

export type FuOnboardingCarouselProps = {
  steps: readonly FuOnboardingStep[]
  getStartedHref: string
  getStartedLabel: string
  className?: string
}

/** One onboarding screenshot at a time — click Next/Back or dots instead of horizontal scroll. */
export function FuOnboardingCarousel({
  steps,
  getStartedHref,
  getStartedLabel,
  className,
}: FuOnboardingCarouselProps) {
  const [index, setIndex] = useState(0)
  const step = steps[index]
  const isFirst = index === 0
  const isLast = index === steps.length - 1

  if (!step) return null

  const progressColors = [
    'var(--fu-brand-lime)',
    'var(--fu-brand-blue)',
    'var(--fu-brand-pink)',
    'var(--fu-brand-blue)',
  ] as const

  return (
    <div className={cn('mx-auto max-w-3xl', className)}>
      <FuStepProgress
        current={index + 1}
        total={steps.length}
        fillColor={progressColors[index % progressColors.length]}
        showDots={false}
      />

      <FuMeta
        key={index}
        className={cn('mb-3 mt-4 tabular-nums', 'fu-enter', fuMotion.reduced)}
      >
        Step {String(step.step).padStart(2, '0')} · {index + 1} of {steps.length}
      </FuMeta>

      <div
        key={step.step}
        className={cn(
          'group fu-enter',
          fuMotion.reduced,
          FU_ELEVATION.card,
          FU_ELEVATION.cardHover,
          fuMotion.hoverLift,
          'overflow-hidden rounded-[var(--fu-radius)]',
        )}
      >
        <FuProductShot shot={step.shot} alt={step.alt} />
      </div>

      <div key={`actions-${index}`} className={cn('mt-6 flex flex-wrap items-center gap-3', 'fu-enter', fuMotion.reduced)}>
        {!isFirst ? (
          <FuButton
            type="button"
            variant="secondary"
            size="lg"
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
          >
            Back
          </FuButton>
        ) : null}
        {!isLast ? (
          <FuButton
            type="button"
            variant="primary"
            size="lg"
            className="group"
            onClick={() => setIndex((current) => Math.min(steps.length - 1, current + 1))}
          >
            Next step
            <MissoutIcon
              name="arrowRight"
              size={16}
              className={cn('ml-2 inline-block', fuMotion.arrowNudge)}
              aria-hidden
            />
          </FuButton>
        ) : (
          <FuButtonAnchor href={getStartedHref} variant="primary" size="lg" className="group">
            {getStartedLabel}
            <MissoutIcon
              name="externalLink"
              size={16}
              className={cn('ml-2 inline-block', fuMotion.arrowNudge)}
              aria-hidden
            />
          </FuButtonAnchor>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Onboarding steps">
        {steps.map((item, dotIndex) => {
          const active = dotIndex === index
          return (
            <button
              key={item.step}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`Go to step ${dotIndex + 1}`}
              onClick={() => setIndex(dotIndex)}
              className={cn(fuStepDotClass(active, true), fuFocusRing)}
            />
          )
        })}
      </div>
    </div>
  )
}
