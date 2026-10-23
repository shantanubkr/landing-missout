import {
  FuButtonAnchor,
  FuButtonLink,
  type FuButtonSize,
} from '../findus'
import {
  GET_STARTED_HREF,
  GET_STARTED_LABEL,
  REQUEST_DEMO_HREF,
  REQUEST_DEMO_LABEL,
} from '../../lib/ctas'

type FuSitewideCtaPairProps = {
  size?: FuButtonSize
  className?: string
}

/** Locked Get started + Request a demo pair for marketing pages. */
export function FuSitewideCtaPair({ size = 'lg', className }: FuSitewideCtaPairProps) {
  return (
    <>
      <FuButtonAnchor
        href={GET_STARTED_HREF}
        variant="primary"
        size={size}
        className={className}
      >
        {GET_STARTED_LABEL}
      </FuButtonAnchor>
      <FuButtonLink to={REQUEST_DEMO_HREF} variant="secondary" size={size} className={className}>
        {REQUEST_DEMO_LABEL}
      </FuButtonLink>
    </>
  )
}
