import { useId, useRef, useState } from 'react'
import { cn } from '../../lib/cn'
import { FAQ_ITEMS } from '../../lib/faqData'
import { useFaqOutlineDecorMotion } from '../../hooks/useFaqOutlineDecorMotion'
import { ScrollReveal } from '../motion/ScrollReveal'

const OUTLINE_STAR = '/brand/missout_outline_star.svg'

function Chevron({ open }: { open: boolean }) {
  return (
    <span
      className={cn(
        'ml-2 inline-flex shrink-0 text-[#1A1A1A] transition-transform duration-200 ease-in-out',
        'motion-reduce:transition-none',
        open && 'rotate-180',
      )}
      aria-hidden
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5 7.5L10 12.5L15 7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function FaqSection() {
  const baseId = useId()
  const [openId, setOpenId] = useState<string | null>(null)

  const faqWideScopeRef = useRef<HTMLDivElement | null>(null)
  const faqOutlineLeftRef = useRef<HTMLDivElement | null>(null)
  const faqOutlineRightRef = useRef<HTMLDivElement | null>(null)
  useFaqOutlineDecorMotion(faqWideScopeRef, faqOutlineLeftRef, faqOutlineRightRef)

  const faqList = (
    <ul
      className="m-0 w-full list-none border-y border-[#C5C5C5] p-0 [padding-inline-start:0] text-left"
      aria-label="Frequently asked questions"
    >
      {FAQ_ITEMS.map((item) => {
        const isOpen = openId === item.id
        const panelId = `${baseId}-panel-${item.id}`
        const buttonId = `${baseId}-q-${item.id}`

        return (
          <li
            key={item.id}
            className="border-b border-[#C5C5C5] last:border-b-0 [list-style:none]"
          >
            <h3 className="m-0 text-left text-base font-normal">
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-3 py-4 text-left font-sans text-base text-[#1A1A1A] sm:py-5 sm:text-lg"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId((prev) => (prev === item.id ? null : item.id))}
              >
                <span>{item.question}</span>
                <Chevron open={isOpen} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid font-sans text-sm leading-relaxed text-[#5A5A5A] sm:text-base',
                'transition-[grid-template-rows] duration-300 ease-in-out',
                'motion-reduce:transition-none',
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
              )}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="pb-4 pr-1 pl-0 sm:pb-5">{item.answer}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )

  return (
    <section
      id="faq"
      className="bg-white pt-10 pb-16 sm:pt-12 sm:pb-20 md:pt-14 md:pb-24"
      aria-labelledby={`${baseId}-heading`}
    >
      {/*
        Stars: anchored to viewport edges; moderate horizontal translate so more of the graphic
        stays visible inside the window (overflow-x-clip still trims the outer edge).
      */}
      <div
        ref={faqWideScopeRef}
        className="relative right-1/2 left-1/2 -mx-[50vw] w-screen max-w-[100vw] overflow-x-clip"
      >
        <div
          ref={faqOutlineLeftRef}
          aria-hidden
          className={cn(
            'pointer-events-none absolute left-0 z-0 block',
            'top-28 h-[min(15rem,38vh)]',
            'sm:top-64 sm:h-[min(26rem,54vh)]',
            'md:top-72 md:h-[min(36rem,62vh)]',
            'lg:top-80 lg:h-[min(38rem,64vh)]',
            'xl:top-96 xl:h-[min(40rem,66vh)]',
          )}
        >
          <img
            src={OUTLINE_STAR}
            alt=""
            className="h-[min(15rem,38vh)] w-auto max-w-none -translate-x-[58%] -translate-y-1/2 scale-x-[-1] select-none md:-translate-x-[42%] sm:h-[min(26rem,54vh)] md:h-[min(36rem,62vh)] lg:h-[min(38rem,64vh)] xl:h-[min(40rem,66vh)]"
            width={718}
            height={735}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <div
          ref={faqOutlineRightRef}
          aria-hidden
          className={cn(
            'pointer-events-none absolute right-0 z-0 block',
            'top-28 h-[min(15rem,38vh)]',
            'sm:top-64 sm:h-[min(26rem,54vh)]',
            'md:top-72 md:h-[min(36rem,62vh)]',
            'lg:top-80 lg:h-[min(38rem,64vh)]',
            'xl:top-96 xl:h-[min(40rem,66vh)]',
          )}
        >
          <img
            src={OUTLINE_STAR}
            alt=""
            className="h-[min(15rem,38vh)] w-auto max-w-none translate-x-[58%] -translate-y-1/2 select-none md:translate-x-[42%] sm:h-[min(26rem,54vh)] md:h-[min(36rem,62vh)] lg:h-[min(38rem,64vh)] xl:h-[min(40rem,66vh)]"
            width={718}
            height={735}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 sm:px-6">
          <ScrollReveal className="text-center">
            <p className="font-sans text-sm font-medium tracking-normal text-[#F92C99] sm:text-base">
              FAQ
            </p>
            <h2
              id={`${baseId}-heading`}
              className="font-display mt-2 text-3xl font-bold leading-none tracking-tight sm:mt-3 sm:text-4xl md:text-5xl"
            >
              <span className="block text-[#1A1A1A]">Frequently asked</span>
              <span className="-mt-[0.12em] block text-[#5A5A5A] sm:-mt-[0.1em] md:-mt-[0.085em]">
                questions
              </span>
            </h2>
          </ScrollReveal>
          <div className="mt-5 w-full sm:mt-6 md:mt-7 lg:mt-8">{faqList}</div>
        </div>
      </div>
    </section>
  )
}
