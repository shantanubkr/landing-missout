import { cn } from '../../lib/cn'
import { MISSOUT_OUTLINE_STAR } from '../../lib/brandAssets'

const OUTLINE_PATH =
  'M437.185 0.6203L404.678 111.164L349.828 95.0344L317.322 205.578L261.481 189.157L277.734 133.886L114.111 85.7712L98.1398 140.083L153.021 156.221L136.768 211.494L191.619 227.623L175.366 282.894L230.216 299.023L213.681 355.255L103.98 322.996L87.7264 378.268L32.8449 362.13L0.620823 471.714L109.393 503.7L125.647 448.427L236.338 480.977L203.832 591.52L258.682 607.65L226.176 718.193L280.098 734.049L345.111 512.963L510.653 561.642L494.399 616.914L603.172 648.899L635.396 539.315L525.664 507.048L541.917 451.776L487.036 435.637L503.571 379.406L558.453 395.544L574.706 340.273L629.556 356.402L645.809 301.13L700.691 317.268L716.662 262.957L553.008 214.833L536.755 270.104L480.945 253.693L497.198 198.421L442.347 182.292L491.107 16.4766L437.185 0.6203Z'

export type MissoutOutlineStarProps = {
  className?: string
  stroke?: string
  strokeWidth?: number
}

/** Outline star mark — stroke color and weight are configurable for decor use. */
export function MissoutOutlineStar({
  className,
  stroke = 'currentColor',
  strokeWidth = 2.75,
}: MissoutOutlineStarProps) {
  return (
    <svg
      viewBox={`0 0 ${MISSOUT_OUTLINE_STAR.width} ${MISSOUT_OUTLINE_STAR.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn('block h-full w-auto max-w-none', className)}
    >
      <path
        d={OUTLINE_PATH}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="miter"
        strokeLinecap="butt"
        strokeMiterlimit={10}
      />
    </svg>
  )
}
