import { Link, Navigate, useParams } from 'react-router-dom'
import { FeatureStory } from '../../components/feature/FeatureStory'
import { FigmaSiteShell } from '../../components/FigmaSiteShell'
import { FigmaH1 } from '../../components/figma/FigmaPrimitives'
import { PixelIcon } from '../../components/icons/PixelIcon'
import { ProductPage } from '../../components/product/ProductKit'
import { FEATURE_PAGES, getFeaturePage } from '../../lib/featurePages'
import { BACKSTAGE_PAGE, STAGE_PAGE } from '../../lib/productPages'
import { SITE_LINKS } from '../../lib/siteRoutes'

export function BackstageProductPage() {
  return (
    <FigmaSiteShell>
      <ProductPage page={BACKSTAGE_PAGE} />
    </FigmaSiteShell>
  )
}

export function StageProductPage() {
  return (
    <FigmaSiteShell>
      <ProductPage page={STAGE_PAGE} />
    </FigmaSiteShell>
  )
}

export function FeaturesPage() {
  return (
    <FigmaSiteShell>
      <div className="mx-auto max-w-[1728px] bg-white">
        <div className="mx-4 border-x border-line sm:mx-[6.97%]">
          <header className="border-b border-line px-[clamp(20px,2.08vw,36px)] py-16 sm:py-20">
            <FigmaH1>Backstage features</FigmaH1>
            <p className="font-display m-0 mt-4 max-w-[36ch] text-[clamp(16px,1.05vw,18px)] leading-[1.4] text-[#555]">
              Committees, events, check-in, updates, hiring, and money.
            </p>
          </header>
          <ul className="m-0 list-none p-0">
            {FEATURE_PAGES.map((page) => (
              <li key={page.id} className="border-b border-line">
                <Link
                  to={page.path}
                  className="group flex items-baseline justify-between gap-6 px-[clamp(20px,2.08vw,36px)] py-8 no-underline sm:py-10"
                >
                  <span>
                    <span className="font-display block text-[clamp(24px,2.2vw,36px)] leading-[0.95] text-black transition-colors duration-200 group-hover:text-brand-pink">
                      {page.title}
                    </span>
                    <span className="font-display mt-2 block max-w-[42ch] text-[15px] leading-[1.4] text-[#666]">
                      {page.lede}
                    </span>
                  </span>
                  <PixelIcon name="angle-right" className="size-5 shrink-0 text-[#bbb] transition-colors duration-200 group-hover:text-brand-pink" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </FigmaSiteShell>
  )
}

export function FeatureStoryPage() {
  const { featureId } = useParams()
  const page = getFeaturePage(featureId)
  if (!page) return <Navigate to={SITE_LINKS.features} replace />
  return (
    <FigmaSiteShell>
      <FeatureStory page={page} />
    </FigmaSiteShell>
  )
}
