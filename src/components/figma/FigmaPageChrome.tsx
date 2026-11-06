import type { ReactNode } from 'react'
import { FadeUp } from '../motion/AnimatedText'
import { FigmaH1 } from './FigmaPrimitives'

/** Content column used on inner pages. Vertical rails match the product pages. */
export function FigmaPageChrome({ children }: { children: ReactNode }) {
  return (
    <div className="site-grid bg-white">
      <div className="site-grid-col">{children}</div>
    </div>
  )
}

export function FigmaPageHero({
  title,
  subtitle,
  align = 'center',
}: {
  title: string
  subtitle?: string
  align?: 'center' | 'left'
}) {
  const center = align === 'center'
  return (
    <header className={`site-cell border-b border-line py-14 sm:py-20 lg:py-24 ${center ? 'text-center' : 'text-left'}`}>
      <FigmaH1 className={center ? 'mx-auto max-w-[16ch]' : 'max-w-[18ch]'}>{title}</FigmaH1>
      {subtitle ? (
        <FadeUp trigger="load" delay={500}>
          <p
            className={`font-display mt-5 max-w-3xl text-[clamp(17px,1.27vw,22px)] leading-[1.35] text-pretty text-[#333] ${center ? 'mx-auto' : ''}`}
          >
            {subtitle}
          </p>
        </FadeUp>
      ) : null}
    </header>
  )
}
