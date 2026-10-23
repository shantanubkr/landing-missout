import {
  PRODUCT_MOCKUP_DEFAULT_ACCENTS,
  PRODUCT_MOCKUP_VARIANTS,
  type ProductMockupAccentConfig,
  type ProductMockupVariantId,
} from '../../lib/productMockupVariants'

export type FuProductMockupRendererProps = {
  variant: ProductMockupVariantId
  accents?: readonly ProductMockupAccentConfig[]
  className?: string
}

export function FuProductMockupRenderer({ variant, className }: FuProductMockupRendererProps) {
  const Component = PRODUCT_MOCKUP_VARIANTS[variant]
  return <Component className={className} />
}

export function resolveMockupAccents(
  variant: ProductMockupVariantId,
  accents?: readonly ProductMockupAccentConfig[],
): readonly ProductMockupAccentConfig[] {
  return accents ?? PRODUCT_MOCKUP_DEFAULT_ACCENTS[variant] ?? []
}
