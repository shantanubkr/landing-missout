import { cn } from '../../lib/cn'

type OrganiserOfferIntroProps = {
  className?: string
  theme?: 'home' | 'product'
}

export function OrganiserOfferIntro({ className, theme = 'home' }: OrganiserOfferIntroProps) {
  const isProduct = theme === 'product'

  return (
    <div className={cn('mx-auto max-w-2xl text-center', className)}>
      <p
        className={cn(
          'font-display text-lg font-semibold leading-snug tracking-tight text-[#1A1A1A] sm:text-xl md:text-2xl',
        )}
      >
        Everything behind a successful event.
      </p>
      <p
        className={cn(
          'mt-2 font-sans text-sm leading-relaxed sm:mt-2.5 sm:text-base',
          isProduct ? 'text-[#6B6B6B]' : 'text-[#5A5A5A]',
        )}
      >
        Registrations, teams, payments, check-ins, communications, and analytics... all in one
        place.
      </p>
    </div>
  )
}
