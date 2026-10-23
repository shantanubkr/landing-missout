import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { ProductDemoFrame } from './ProductDemoFrame'
import { STAGE_TEASER_IMAGES } from '../../lib/stageTeaserImages'

const FEED_ITEMS = [
  { title: 'Open mic night', meta: 'Workshop · Sat 7pm', img: STAGE_TEASER_IMAGES[0] },
  { title: 'Design sprint', meta: 'Competition · Sun', img: STAGE_TEASER_IMAGES[1] },
  { title: 'Campus showcase', meta: 'Performance · Fri', img: STAGE_TEASER_IMAGES[2] },
] as const

/** Stage discovery strip - real teaser photos + motion, organiser-outcome framing. */
export function StageFeedDemo({ className }: { className?: string }) {
  const reduceMotion = usePrefersReducedMotion()
  const [focus, setFocus] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setInterval(() => {
      setFocus((i) => (i + 1) % FEED_ITEMS.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [reduceMotion])

  return (
    <ProductDemoFrame title="Stage · Discover" tone="product" className={className}>
      <div className="bg-[#FAFAFA] p-4 sm:p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="font-sans text-sm font-semibold text-[#1A1A1A]">Upcoming</p>
          <span className="font-sans text-xs text-[#006AFE]">From your Backstage publish</span>
        </div>
        <ul className="space-y-2.5">
          {FEED_ITEMS.map((item, index) => {
            const active = index === focus
            return (
              <li key={item.title}>
                <motion.div
                  animate={{
                    scale: active ? 1 : 0.985,
                    opacity: active ? 1 : 0.72,
                  }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={cn(
                    'flex items-center gap-3 rounded-xl border bg-white p-2 pr-3',
                    active ? 'border-[#006AFE]/40' : 'border-[#E8E8E8]',
                  )}
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg outline outline-1 outline-black/10">
                    <img
                      src={item.img}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-sans text-sm font-semibold text-[#1A1A1A]">
                      {item.title}
                    </p>
                    <p className="truncate font-sans text-xs text-[#5A5A5A]">{item.meta}</p>
                  </div>
                </motion.div>
              </li>
            )
          })}
        </ul>
        <AnimatePresence initial={false}>
          <motion.p
            key={focus}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-3 font-sans text-xs text-[#5A5A5A]"
          >
            People find it on Stage after you publish.
          </motion.p>
        </AnimatePresence>
      </div>
    </ProductDemoFrame>
  )
}
