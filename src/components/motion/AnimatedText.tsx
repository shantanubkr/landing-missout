import { Fragment, type CSSProperties, type ElementType, type ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'

type AnimatedTextProps = {
  text: string
  as?: ElementType
  className?: string
  /** ms before the first line/word starts */
  delay?: number
  /** ms between words (proxy for wrapped lines) */
  stagger?: number
  trigger?: 'view' | 'load'
  id?: string
}

/** Headline that fades in and slides up, staggered per word. */
export function AnimatedText({
  text,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 40,
  trigger = 'view',
  id,
}: AnimatedTextProps) {
  const [ref, inView] = useInView<HTMLElement>(trigger)
  const lines = text.split('\n')
  const y = trigger === 'load' ? 24 : 32
  let wordIndex = 0

  return (
    <Tag
      ref={ref}
      id={id}
      aria-label={text.replace(/\n/g, ' ')}
      className={`anim-words ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--d': `${delay}ms`, '--s': `${stagger}ms`, '--reveal-y': `${y}px` } as CSSProperties}
    >
      {lines.map((line, li) => {
        const words = line.split(' ')
        return (
          <Fragment key={`${line}-${li}`}>
            {li > 0 ? <br /> : null}
            {words.map((word, i) => {
              const idx = wordIndex++
              return (
                <Fragment key={`${word}-${idx}`}>
                  <span className="w" aria-hidden>
                    <span style={{ '--i': idx } as CSSProperties}>{word}</span>
                  </span>
                  {i < words.length - 1 ? ' ' : null}
                </Fragment>
              )
            })}
          </Fragment>
        )
      })}
    </Tag>
  )
}

type FadeUpProps = {
  as?: ElementType
  className?: string
  delay?: number
  trigger?: 'view' | 'load'
  children?: ReactNode
  y?: number
  scale?: number
  duration?: number
  stagger?: number
}

export function FadeUp({
  as: Tag = 'div',
  className = '',
  delay = 0,
  trigger = 'view',
  children,
  y,
  scale,
  duration,
  stagger,
}: FadeUpProps) {
  const [ref, inView] = useInView<HTMLElement>(trigger)
  const revealY = y ?? (trigger === 'load' ? 24 : 32)
  const ms = duration ?? (scale != null ? 800 : 600)
  return (
    <Tag
      ref={ref}
      className={`anim-fade-up ${stagger ? 'anim-stagger' : ''} ${inView ? 'is-in' : ''} ${className}`}
      style={
        {
          '--d': `${delay}ms`,
          '--reveal-y': `${revealY}px`,
          '--reveal-s': scale ?? 1,
          '--reveal-ms': `${ms}ms`,
          '--stagger': `${stagger ?? 100}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  )
}
