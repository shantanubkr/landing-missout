import { usePageMeta } from '../hooks/usePageMeta'
import { FuRequestDemoFlow } from '../components/findus'

export function RequestDemoPage() {
  usePageMeta({
    title: 'Request a demo',
    description: 'Tell us your role and number for a Backstage walkthrough.',
  })

  return <FuRequestDemoFlow />
}
