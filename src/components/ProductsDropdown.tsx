import { ProductsMenuPanel } from './ProductsMenuPanel'

type ProductsDropdownPanelProps = {
  onClose: () => void
  leaving?: boolean
}

/** Full-bleed mega menu attached to navbar (GitHub-style). */
export function ProductsDropdownPanel({ onClose, leaving }: ProductsDropdownPanelProps) {
  return (
    <div
      className={`products-mega-menu w-full border-b border-line shadow-[0_12px_32px_rgba(0,0,0,0.1)] ${leaving ? 'is-leaving' : ''}`}
      role="dialog"
      aria-label="Products menu"
    >
      <div className="mx-auto w-full max-w-[1216px]">
        <ProductsMenuPanel onClose={onClose} variant="desktop" />
      </div>
    </div>
  )
}
