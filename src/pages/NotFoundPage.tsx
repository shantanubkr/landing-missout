import { usePageMeta } from '../hooks/usePageMeta'
import { ButtonLink } from '../components/ui'

export function NotFoundPage() {
  usePageMeta({
    title: 'Page not found',
    description:
      'The page you are looking for does not exist. Go back to Missout for campus events and collaborations.',
  })

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-sans text-sm font-medium tracking-wide text-[#F92C99]">404</p>
      <h1 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-[#1A1A1A] sm:text-3xl">
        This page does not exist
      </h1>
      <p className="mt-3 font-sans text-base leading-relaxed text-[#1A1A1A]/75">
        The link may be broken or the page may have moved.
      </p>
      <ButtonLink to="/" variant="primary" theme="home" size="md" className="mt-8">
        Back to home
      </ButtonLink>
    </div>
  )
}
