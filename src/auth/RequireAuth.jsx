import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/auth/AuthContext'

export default function RequireAuth({ children }) {
  const { isAuthenticated, isBootstrapped } = useAuth()
  const location = useLocation()

  if (!isBootstrapped) return null
  if (isAuthenticated) return children

  return <Navigate to="/login" replace state={{ from: location }} />
}
