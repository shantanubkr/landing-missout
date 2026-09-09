import { usePageMeta } from '../hooks/usePageMeta'

type PlaceholderPageProps = {
  title: string
  description?: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  usePageMeta({
    title,
    description: description ?? title,
  })

  return (
    <div className="px-4 py-28 sm:px-6">
      <h1 className="font-sans text-4xl font-bold tracking-tight text-[#1A1A1A]">
        {title}
      </h1>
    </div>
  )
}
