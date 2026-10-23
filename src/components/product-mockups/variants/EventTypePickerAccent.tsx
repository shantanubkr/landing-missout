import { cn } from '../../../lib/cn'
import { EVENT_TYPE_PICKER_ACCENT } from '../../../lib/productMockupFixtures'

/** Floating accent chip — event type chooser from the events feature screenshot. */
export function EventTypePickerAccent({ className }: { className?: string }) {
  const data = EVENT_TYPE_PICKER_ACCENT

  return (
    <div
      aria-hidden
      className={cn(
        'w-[9.5rem] overflow-hidden rounded-[var(--fu-radius)] border border-[var(--fu-card-border)] bg-[var(--fu-bs-canvas)] shadow-[0_20px_40px_rgba(0,0,0,0.12)] sm:w-[10.5rem]',
        className,
      )}
    >
      <div className="border-b border-[var(--fu-hairline)] bg-[var(--fu-bs-canvas)] px-3 py-2">
        <p className="m-0 text-[10px] font-medium text-[var(--fu-bs-muted)]">{data.label}</p>
      </div>
      <ul className="m-0 list-none bg-[var(--fu-bs-canvas)] p-1.5">
        {data.options.map((option) => (
          <li
            key={option.label}
            className={cn(
              'rounded-[var(--fu-radius-sm)] px-2.5 py-2 text-[11px] font-medium',
              option.selected
                ? 'bg-[var(--fu-bs-well-org-bg)] text-[var(--fu-bs-well-org-fg)]'
                : 'bg-[var(--fu-bs-canvas)] text-[var(--fu-bs-ink)]',
            )}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
