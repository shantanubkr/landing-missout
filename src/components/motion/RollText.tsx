/** Label that rolls up to a second line on hover of the closest `.group`. */
export function RollText({ children, hoverClassName = '' }: { children: string; hoverClassName?: string }) {
  return (
    <span className="roll-text">
      <span className="roll-text-line">{children}</span>
      <span className={`roll-text-line roll-text-line--next ${hoverClassName}`} aria-hidden>
        {children}
      </span>
    </span>
  )
}
