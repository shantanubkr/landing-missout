import { cn } from '../../lib/cn'
import type { FuTagTone } from './FuTag'
import { FuTag } from './FuTag'
import { FuBody, FuTitle } from './FuTypography'

export type FuProblemBlockProps = {
  title: string
  body: string
  chips?: string[]
  className?: string
}

/** Problem statement — mostly neutral chips; at most one blue + one pink accent. */
export function FuProblemBlock({ title, body, chips, className }: FuProblemBlockProps) {
  const chipTones: FuTagTone[] = ['neutral', 'blue', 'neutral']

  return (
    <div className={cn('max-w-2xl', className)}>
      <FuTitle level="h2" className="mb-3">
        {title}
      </FuTitle>
      <FuBody className="mb-5">{body}</FuBody>
      {chips?.length ? (
        <div className="flex flex-wrap gap-2">
          {chips.map((chip, i) => (
            <FuTag key={chip} tone={chipTones[i] ?? 'neutral'}>
              {chip}
            </FuTag>
          ))}
        </div>
      ) : null}
    </div>
  )
}
