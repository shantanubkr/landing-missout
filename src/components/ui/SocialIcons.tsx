import { cn } from '../../lib/cn'
import { socialLinks } from '../../lib/social'

type SocialTheme = 'home' | 'product'

export type SocialIconsProps = {
  className?: string
  /** Visual tap target around each icon (no ring). */
  size?: 'sm' | 'md'
  /** `home` = pink; `product` = blue. */
  theme?: SocialTheme
  /** Override default URLs from `lib/social`. */
  instagramHref?: string
  linkedinHref?: string
}

const sizeMap = {
  sm: { outer: 'h-11 w-11', glyph: 'h-[26px] w-[26px]' },
  md: { outer: 'h-16 w-16', glyph: 'h-10 w-10' },
} as const

/** White-filled pixel SVGs in `public/social/` — mask + `currentColor` follows link text (default + hover). */
function SocialGlyph({ src, className }: { src: string; className?: string }) {
  const maskUrl = `url("${src}")`
  return (
    <span
      aria-hidden
      className={cn('inline-block shrink-0 bg-current', className)}
      style={{
        WebkitMaskImage: maskUrl,
        maskImage: maskUrl,
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
      }}
    />
  )
}

const hoverClass: Record<SocialTheme, string> = {
  home: 'hover:text-[#F92C99] focus-visible:outline-[#F92C99]',
  product:
    'hover:text-[#006AFE] focus-visible:outline-[#006AFE]',
}

export function SocialIcons({
  className,
  size = 'md',
  theme = 'home',
  instagramHref = socialLinks.instagram,
  linkedinHref = socialLinks.linkedin,
}: SocialIconsProps) {
  const ring = hoverClass[theme]
  const { outer, glyph } = sizeMap[size]
  return (
    <ul className={cn('flex flex-wrap items-center gap-1', className)}>
      <li>
        <a
          href={instagramHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center justify-center text-[#1A1A1A] transition-colors duration-200 ease-out',
            'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            'motion-reduce:transition-none',
            outer,
            ring,
          )}
          aria-label="Missout on Instagram"
        >
          <SocialGlyph src="/social/instagram.svg" className={glyph} />
        </a>
      </li>
      <li>
        <a
          href={linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'inline-flex items-center justify-center text-[#1A1A1A] transition-colors duration-200 ease-out',
            'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
            'motion-reduce:transition-none',
            outer,
            ring,
          )}
          aria-label="Missout on LinkedIn"
        >
          <SocialGlyph src="/social/linkedin.svg" className={glyph} />
        </a>
      </li>
    </ul>
  )
}
