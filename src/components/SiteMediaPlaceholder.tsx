import type { CSSProperties, ReactNode } from 'react'
import { placeholderTone } from '../lib/mediaPlaceholders'

export type SiteMediaPlaceholderProps = {
  /** Stable id for color (path, feature id, alt text, etc.) */
  seed: string
  label?: string
  aspect?: string
  className?: string
  children?: ReactNode
  /** Show a faint caption inside the block */
  showLabel?: boolean
}

export function SiteMediaPlaceholder({
  seed,
  label,
  aspect = '16/10',
  className = '',
  children,
  showLabel = true,
}: SiteMediaPlaceholderProps) {
  const tone = placeholderTone(seed)
  const caption = label ?? 'Placeholder'

  return (
    <div
      className={`relative overflow-hidden rounded-[inherit] ${className}`}
      style={
        {
          aspectRatio: aspect,
          backgroundColor: tone.bg,
          '--ph-accent': tone.accent,
        } as CSSProperties
      }
      role="img"
      aria-label={caption}
    >
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(0 0 0 / 0.045) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.045) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
        aria-hidden
      />
      <div
        className="absolute top-[12%] right-[10%] h-[28%] w-[34%] rounded-[8px] border border-black/[0.06] bg-white/50"
        aria-hidden
      />
      <div
        className="absolute bottom-[14%] left-[8%] h-[42%] w-[52%] rounded-[10px] border border-black/[0.07] bg-white/65 shadow-[0_8px_24px_rgb(0_0_0/0.06)]"
        style={{ borderLeftColor: tone.accent, borderLeftWidth: 3 }}
        aria-hidden
      />
      {showLabel ? (
        <span className="font-display absolute bottom-3 left-3 rounded-[4px] bg-white/80 px-2 py-1 text-[11px] tracking-[0.06em] text-[#666] uppercase backdrop-blur-sm">
          {caption}
        </span>
      ) : null}
      {children}
    </div>
  )
}
