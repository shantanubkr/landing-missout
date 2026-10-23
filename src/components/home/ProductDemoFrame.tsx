import { cn } from '../../lib/cn'

type ProductDemoFrameProps = {
  title?: string
  children: React.ReactNode
  className?: string
  /** home pink accents vs product blue */
  tone?: 'home' | 'product'
}

/** Light product chrome - reuse previous glass/stroke language without glow soup. */
export function ProductDemoFrame({
  title = 'missout.in',
  children,
  className,
  tone = 'home',
}: ProductDemoFrameProps) {
  const barDot =
    tone === 'product' ? 'bg-[#006AFE]/35' : 'bg-[#F92C99]/35'

  return (
    <div
      className={cn(
        'overflow-hidden rounded-[20px] border-[0.6px] border-[var(--nav-stroke)] bg-white md:rounded-[22px]',
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-[#E8E8E8] px-3.5 py-2.5">
        <span className={cn('h-2 w-2 rounded-full', barDot)} aria-hidden />
        <span className="h-2 w-2 rounded-full bg-[#E8E8E8]" aria-hidden />
        <span className="h-2 w-2 rounded-full bg-[#E8E8E8]" aria-hidden />
        <span className="ml-2 truncate font-sans text-xs text-[#9A9A9A]">{title}</span>
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
