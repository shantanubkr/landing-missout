import { Navigate } from 'react-router-dom'

/** Legacy `/product` → Backstage (primary product). */
export function ProductPage() {
  return <Navigate to="/product/backstage" replace />
}
