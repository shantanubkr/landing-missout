import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import type { IconName } from '../icons'
import type { FuBrandHue } from '../../lib/design/findus'
import { FU_ELEVATION } from '../../lib/design/findus'
import { fuFocusRing, fuMotion } from '../../lib/design/findusMotion'
import { FuIconChip } from './FuIconChip'
import { FuBody, FuTitle } from './FuTypography'

export type FuFeatureGridItem = {
  title: string
  body: string
  href?: string
  icon?: ReactNode
  iconName?: IconName
  /** Optional icon accent — small dot only, not card fill. */
  tint?: FuBrandHue | 'neutral'
}

export type FuFeatureGridProps = {
  items: readonly FuFeatureGridItem[]
  columns?: 2 | 3
  className?: string
}

const columnClass = {
  2: 'sm:grid-cols-2',
  3: 'md:grid-cols-3',
} as const

const cardClass = cn(
  'block h-full rounded-[var(--fu-radius)] bg-[var(--fu-canvas)] p-5 sm:p-6',
  FU_ELEVATION.card,
)

function GridCell({ item }: { item: FuFeatureGridItem }) {
  const content = (
    <>
      {item.icon ? (
        <div className="mb-3">{item.icon}</div>
      ) : item.iconName ? (
        <div className="mb-3">
          <FuIconChip
            name={item.iconName}
            tint={item.tint === 'neutral' || !item.tint ? 'neutral' : item.tint}
          />
        </div>
      ) : null}
      <FuTitle level="h3" className="mb-2">
        {item.title}
      </FuTitle>
      <FuBody size="sm">{item.body}</FuBody>
    </>
  )

  if (item.href) {
    return (
      <Link
        to={item.href}
        className={cn(
          cardClass,
          'no-underline text-inherit',
          fuMotion.hoverLift,
          FU_ELEVATION.cardHover,
          fuFocusRing,
        )}
      >
        {content}
      </Link>
    )
  }

  return <div className={cardClass}>{content}</div>
}

/** Quiet feature grid — white cards on canvas, hairline borders, neutral icon wells. */
export function FuFeatureGrid({ items, columns = 3, className }: FuFeatureGridProps) {
  return (
    <div className={cn('grid gap-4 sm:gap-5', columnClass[columns], className)}>
      {items.map((item) => (
        <GridCell key={item.title} item={item} />
      ))}
    </div>
  )
}
