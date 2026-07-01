import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import { ScrollReveal } from '../motion/ScrollReveal'
import {
  ValuePropositionsPanel,
  type AudienceMode,
} from '../value-propositions/ValuePropositionsSection'
import {
  PRODUCT_CORNER_VECTOR_SRC,
  PRODUCT_HERO_BACKSTAGE_IMG,
  ProductGlassShell,
  type ProductCornerDecor,
} from './ProductGlassShell'
import { StageRevealTeaser } from './StageRevealTeaser'

const cardLinkClass =
  'group block h-full no-underline outline-none focus-visible:rounded-[22px] focus-visible:ring-2 focus-visible:ring-[#F92C99] focus-visible:ring-offset-4'

const BACKSTAGE_CORNER_DECOR: readonly ProductCornerDecor[] = [
  { corner: 'right-[2%] top-[4%]', flip: true },
  { corner: 'bottom-[16%] left-[2%]' },
]

const PINK_SHELL_GLOW =
  'shadow-[0_16px_48px_rgba(26,26,26,0.08),0_0_36px_-18px_rgba(249,44,153,0.2)]'

function ProductPreviewCard({
  title,
  href,
  external,
  imageSrc,
  imageAlt,
  cornerDecor,
  className,
}: {
  title: string
  href: string
  external?: boolean
  imageSrc: string
  imageAlt: string
  cornerDecor: readonly ProductCornerDecor[]
  className?: string
}) {
  const shell = (
    <div
      className={cn(
        'relative w-full overflow-visible motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out',
        'group-hover:scale-[1.012] group-focus-visible:scale-[1.012] motion-reduce:transition-none motion-reduce:group-hover:scale-100',
        className,
      )}
    >
      <ProductGlassShell
        src={imageSrc}
        alt={imageAlt}
        cornerDecor={cornerDecor}
        shellGlowShadow={PINK_SHELL_GLOW}
      />
    </div>
  )

  if (external) {
    return (
      <a
        href={href}
        className={cardLinkClass}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${title}. Opens in a new tab.`}
      >
        {shell}
      </a>
    )
  }

  return (
    <Link to={href} className={cardLinkClass} aria-label={title}>
      {shell}
    </Link>
  )
}

function ProductShowcase({ mode }: { mode: AudienceMode }) {
  const isStage = mode === 'students'

  if (isStage) {
    return <StageRevealTeaser theme="home" />
  }

  return (
    <div className="w-full max-w-lg lg:max-w-none">
      <ProductPreviewCard
        title="Manage through Backstage"
        href="/product#manage-backstage"
        imageSrc={PRODUCT_HERO_BACKSTAGE_IMG}
        imageAlt="Manage through Backstage"
        cornerDecor={BACKSTAGE_CORNER_DECOR}
      />
    </div>
  )
}

export function HomeProductSection() {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="products"
      aria-labelledby="home-products-heading"
      className="relative overflow-x-clip bg-white px-4 pb-12 pt-2 sm:px-6 sm:pb-16 sm:pt-4 md:pb-20 md:pt-6"
    >
      <div className="relative mx-auto max-w-6xl">
        <div className="relative overflow-visible px-5 py-6 sm:px-7 sm:py-8 lg:px-10 lg:py-10">
          <img
            src={PRODUCT_CORNER_VECTOR_SRC}
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none absolute -left-3 top-6 h-16 w-auto select-none opacity-[0.22] blur-[6px] sm:h-20"
          />
          <img
            src={PRODUCT_CORNER_VECTOR_SRC}
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none absolute -right-3 top-6 h-16 w-auto -scale-x-100 select-none opacity-[0.22] blur-[6px] sm:h-20"
          />

          <div className="relative z-[1]">
            <ScrollReveal>
              <div className="text-center">
                <p className="font-sans text-base font-medium tracking-normal text-[#F92C99] sm:text-lg">
                  What we offer
                </p>
                <h2
                  id="home-products-heading"
                  className="font-display mt-3 text-3xl font-bold tracking-tight text-[#1A1A1A] sm:mt-4 sm:text-4xl md:text-[2.75rem]"
                >
                  Stage and Backstage
                </h2>
                <p className="mx-auto mt-2.5 max-w-xl font-sans text-sm text-[#5A5A5A] sm:mt-3 sm:text-base">
                  Choose your role. See the product and what it unlocks.
                </p>
              </div>
            </ScrollReveal>

            <ValuePropositionsPanel
              embedded
              layout="bento"
              showEyebrow={false}
              scrollTargetRef={sectionRef}
              className="mt-6 max-w-none sm:mt-7"
              productOnlyModes={['students']}
              renderProduct={(mode) => <ProductShowcase mode={mode} />}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
