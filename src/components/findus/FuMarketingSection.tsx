import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import type { MissoutAvatarSize } from '../../lib/avatars'
import type { FuBrandHue } from '../../lib/design/findus'
import type { FuSectionTone } from './FuSection'
import { FuContainer, type FuContainerProps } from './FuContainer'
import { FuMascot } from './FuMascot'
import { FuSection, type FuSectionProps } from './FuSection'
import { FuBody, FuEyebrow, FuTitle } from './FuTypography'

export type FuMarketingSectionProps = {
  tone?: FuSectionTone
  padding?: FuSectionProps['padding']
  width?: FuContainerProps['width']
  eyebrow?: string
  eyebrowTone?: 'neutral' | 'blue' | 'pink' | 'lime'
  title?: string
  body?: ReactNode
  mascot?: boolean
  mascotSize?: MissoutAvatarSize
  mascotAnimation?: string
  mascotAccent?: FuBrandHue
  className?: string
  children?: ReactNode
}

/** Standard marketing content section — H2 + body + optional children. */
export function FuMarketingSection({
  tone = 'default',
  padding = 'md',
  width = 'default',
  eyebrow,
  eyebrowTone = 'blue',
  title,
  body,
  mascot = false,
  mascotSize = 'md',
  mascotAnimation = 'idle',
  mascotAccent,
  className,
  children,
}: FuMarketingSectionProps) {
  const showMascot = mascot && Boolean(title)

  return (
    <FuSection tone={tone} padding={padding} className={className}>
      <FuContainer width={width}>
        {eyebrow ? (
          <FuEyebrow tone={eyebrowTone} className="mb-3">
            {eyebrow}
          </FuEyebrow>
        ) : null}
        {title ? (
          <div className={cn('mb-4 flex items-start justify-between gap-4 sm:gap-6', !body && !children && 'mb-0')}>
            <FuTitle level="h2" className="min-w-0 flex-1">
              {title}
            </FuTitle>
            {showMascot ? (
              <FuMascot
                size={mascotSize}
                framed
                animation={mascotAnimation}
                accent={mascotAccent}
                className="hidden sm:inline-flex shrink-0"
              />
            ) : null}
          </div>
        ) : null}
        {body ? <FuBody className={cn('max-w-3xl', children && 'mb-8')}>{body}</FuBody> : null}
        {children}
      </FuContainer>
    </FuSection>
  )
}
