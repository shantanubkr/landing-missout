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
  xHref?: string
  youtubeHref?: string
}

const sizeMap = {
  sm: { outer: 'h-9 w-9', glyph: 'h-5 w-5' },
  md: { outer: 'h-16 w-16', glyph: 'h-10 w-10' },
} as const

/** White-filled pixel SVGs in `public/social/`; mask + `currentColor` follows link text. */
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
  product: 'hover:text-[#006AFE] focus-visible:outline-[#006AFE]',
}

type SocialItem = {
  id: string
  href: string
  label: string
  glyph: string
}

export function SocialIcons({
  className,
  size = 'md',
  theme = 'home',
  instagramHref = socialLinks.instagram,
  linkedinHref = socialLinks.linkedin,
  xHref = socialLinks.x,
  youtubeHref = socialLinks.youtube,
}: SocialIconsProps) {
  const ring = hoverClass[theme]
  const { outer, glyph } = sizeMap[size]

  const items: SocialItem[] = [
    { id: 'instagram', href: instagramHref, label: 'Missout on Instagram', glyph: '/social/instagram.svg' },
    { id: 'linkedin', href: linkedinHref, label: 'Missout on LinkedIn', glyph: '/social/linkedin.svg' },
    { id: 'x', href: xHref, label: 'Missout on X', glyph: '/social/x.svg' },
    { id: 'youtube', href: youtubeHref, label: 'Missout on YouTube', glyph: '/social/youtube.svg' },
  ]

  return (
    <ul className={cn('m-0 flex list-none flex-wrap items-center gap-1 p-0', className)}>
      {items.map((item) => (
        <li key={item.id} className="[list-style:none]">
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center justify-center text-[#1A1A1A] transition-colors duration-200 ease-out',
              'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
              'motion-reduce:transition-none',
              outer,
              ring,
            )}
            aria-label={item.label}
          >
            <SocialGlyph src={item.glyph} className={glyph} />
          </a>
        </li>
      ))}
    </ul>
  )
}
