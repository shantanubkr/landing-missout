import { cn } from '../../lib/cn'
import type { ProductShot } from '../../lib/productAssets'
import { FuMeta } from './FuTypography'
import { FuProductShot } from './FuProductShot'

export type FuOnboardingStep = {
  step: number
  shot: ProductShot
  alt: string
}

export type FuOnboardingGridProps = {
  steps: readonly FuOnboardingStep[]
  className?: string
}

/**
 * Grid spans tuned to each onboarding PNG ratio:
 * - Step 1 (~2.4:1): full width — needs horizontal room to stay readable
 * - Step 2 (~2.1:1): half width on desktop
 * - Step 3 (~0.9:1): half width, tall portrait
 * - Step 4 (~1.4:1): centered, slightly narrower than full
 */
const STEP_LAYOUT: Record<number, string> = {
  1: 'sm:col-span-2 lg:col-span-12',
  2: 'sm:col-span-1 lg:col-span-6',
  3: 'sm:col-span-1 lg:col-span-6',
  4: 'sm:col-span-2 lg:col-span-10 lg:col-start-2',
}

export function FuOnboardingGrid({ steps, className }: FuOnboardingGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-start gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5',
        className,
      )}
    >
      {steps.map((item) => (
        <figure
          key={item.step}
          className={cn('m-0 min-w-0', STEP_LAYOUT[item.step] ?? 'col-span-full')}
        >
          <FuMeta className="mb-2 tabular-nums">
            Step {String(item.step).padStart(2, '0')}
          </FuMeta>
          <FuProductShot shot={item.shot} alt={item.alt} />
        </figure>
      ))}
    </div>
  )
}
