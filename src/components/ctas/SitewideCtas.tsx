import { ButtonAnchor, ButtonLink, type ButtonSize, type ButtonTheme } from '../ui'
import { GET_STARTED_HREF, REQUEST_DEMO_HREF } from '../../lib/ctas'

type CtaStyleProps = {
  theme?: ButtonTheme
  size?: ButtonSize
  className?: string
}

export function GetStartedButton({
  theme = 'home',
  size = 'md',
  className,
}: CtaStyleProps) {
  return (
    <ButtonAnchor
      href={GET_STARTED_HREF}
      variant="primary"
      theme={theme}
      size={size}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      Get started
    </ButtonAnchor>
  )
}

export function RequestDemoButton({
  theme = 'home',
  size = 'md',
  className,
}: CtaStyleProps) {
  return (
    <ButtonLink
      to={REQUEST_DEMO_HREF}
      variant="outline"
      theme={theme}
      size={size}
      className={className}
    >
      Request a demo
    </ButtonLink>
  )
}

export function SitewideCtaPair({
  theme = 'home',
  size = 'lg',
  className,
}: CtaStyleProps) {
  return (
    <>
      <GetStartedButton theme={theme} size={size} className={className} />
      <RequestDemoButton theme={theme} size={size} className={className} />
    </>
  )
}
