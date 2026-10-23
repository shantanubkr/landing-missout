import type { ComponentType } from 'react'
import { EventCreateMockup } from '../components/product-mockups/variants/EventCreateMockup'
import { EventTypePickerAccent } from '../components/product-mockups/variants/EventTypePickerAccent'

export type ProductMockupVariantId = 'event-create'

export type ProductMockupAccentId = 'event-type-picker'

export type ProductMockupAccentPlacement = 'bottom-right' | 'top-right' | 'bottom-left'

export type ProductMockupAccentConfig = {
  id: ProductMockupAccentId
  placement?: ProductMockupAccentPlacement
  rotate?: number
}

export const PRODUCT_MOCKUP_VARIANTS: Record<
  ProductMockupVariantId,
  ComponentType<{ className?: string }>
> = {
  'event-create': EventCreateMockup,
}

export const PRODUCT_MOCKUP_ACCENTS: Record<
  ProductMockupAccentId,
  ComponentType<{ className?: string }>
> = {
  'event-type-picker': EventTypePickerAccent,
}

/** Default accent pairings per mockup variant. */
export const PRODUCT_MOCKUP_DEFAULT_ACCENTS: Partial<
  Record<ProductMockupVariantId, ProductMockupAccentConfig[]>
> = {
  'event-create': [{ id: 'event-type-picker', placement: 'bottom-right', rotate: -3 }],
}
