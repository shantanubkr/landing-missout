import { Link } from 'react-router-dom'
import { FigmaButtonPrimary, FigmaButtonSecondary } from './figma/FigmaPrimitives'
import { PixelIcon, type PixelIconName } from './icons/PixelIcon'
import {
  PRODUCTS_FEATURED,
  PRODUCTS_MENU_COLUMNS,
  type ProductsMenuLink,
} from '../lib/products'
import {
  GET_STARTED_HREF,
  GET_STARTED_LABEL,
  REQUEST_DEMO_LABEL,
  SITE_LINKS,
} from '../lib/siteRoutes'

const MENU_ICON: Record<ProductsMenuLink['icon'], PixelIconName> = {
  committees: 'users',
  publish: 'cloud-upload',
  checkin: 'check-circle',
  updates: 'bullhorn',
  recruit: 'user-check',
  money: 'wallet',
}

function MenuIcon({ name }: { name: ProductsMenuLink['icon'] }) {
  return <PixelIcon name={MENU_ICON[name]} className="mt-0.5 size-4 shrink-0 text-[#656d76]" />
}

function FeatureRow({ item, onClose }: { item: ProductsMenuLink; onClose: () => void }) {
  return (
    <Link
      to={item.to}
      onClick={onClose}
      className="-mx-2 flex gap-3 rounded-md px-2 py-2.5 no-underline transition-colors duration-150 hover:bg-[#f6f8fa]"
    >
      <MenuIcon name={item.icon} />
      <span className="min-w-0">
        <span className="font-display block text-[14px] leading-snug text-[#1f2328]">{item.label}</span>
        <span className="font-display mt-0.5 block text-[12px] leading-snug text-[#656d76]">{item.description}</span>
      </span>
    </Link>
  )
}

function FeaturedProductCard({
  product,
  onClose,
}: {
  product: (typeof PRODUCTS_FEATURED)[number]
  onClose: () => void
}) {
  return (
    <Link
      to={product.to}
      onClick={onClose}
      className="group flex items-center gap-6 rounded-xl p-2 no-underline transition-colors duration-150 hover:bg-black/[0.04]"
    >
      <span className="product-menu-thumb relative flex h-[152px] w-[228px] shrink-0 items-center justify-center overflow-hidden rounded-[14px]">
        <img
          src={product.image}
          alt=""
          className="h-[78%] w-[86%] rounded-[10px] object-cover object-left-top shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
        />
      </span>
      <span className="flex min-w-0 flex-col justify-center">
        <span className="font-display block text-[16px] leading-tight text-[#1f2328]">{product.title}</span>
        <span className="font-display mt-1.5 block max-w-[15rem] whitespace-pre-line text-[13px] leading-[1.35] text-[#656d76]">
          {product.description}
        </span>
      </span>
    </Link>
  )
}

function AllFeaturesLink({ onClose }: { onClose: () => void }) {
  return (
    <Link
      to={SITE_LINKS.features}
      onClick={onClose}
      className="font-display inline-flex items-center gap-1 text-[14px] text-[#1f2328] no-underline transition-colors duration-150 hover:text-brand-pink"
    >
      All features
      <PixelIcon name="angle-right" className="size-3.5 text-current" />
    </Link>
  )
}

type ProductsMenuPanelProps = {
  onClose: () => void
  variant: 'desktop' | 'mobile'
}

export function ProductsMenuPanel({ onClose, variant }: ProductsMenuPanelProps) {
  if (variant === 'mobile') {
    return (
      <>
        <ul className="m-0 flex list-none flex-col gap-2 p-0">
          {PRODUCTS_FEATURED.map((product) => (
            <li key={product.to}>
              <FeaturedProductCard product={product} onClose={onClose} />
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <AllFeaturesLink onClose={onClose} />
        </div>
      </>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-center gap-3 px-8 py-9 lg:px-10 lg:py-10">
        {PRODUCTS_FEATURED.map((product) => (
          <FeaturedProductCard key={product.to} product={product} onClose={onClose} />
        ))}
      </div>

      <div className="flex flex-col px-8 py-9 lg:px-10 lg:py-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
          {PRODUCTS_MENU_COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-display m-0 mb-2 text-[12px] tracking-[0.06em] text-[#656d76] uppercase">
                {col.title}
              </p>
              <ul className="m-0 flex list-none flex-col p-0">
                {col.items.map((item) => (
                  <li key={item.to}>
                    <FeatureRow item={item} onClose={onClose} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-line pt-4">
          <AllFeaturesLink onClose={onClose} />
        </div>
      </div>
    </div>
  )
}

export function MobileMenuCtas({ onClose }: { onClose: () => void }) {
  return (
    <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
      <FigmaButtonPrimary href={GET_STARTED_HREF} onClick={onClose} className="!h-12 !w-full !min-w-0 !text-[16px]">
        {GET_STARTED_LABEL}
      </FigmaButtonPrimary>
      <FigmaButtonSecondary to={SITE_LINKS.demo} onClick={onClose} tone="black" className="!h-12 !w-full !min-w-0 !bg-white !text-[16px]">
        {REQUEST_DEMO_LABEL}
      </FigmaButtonSecondary>
    </div>
  )
}
