import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RutaProtegida() {
  const { session } = useAuth()
  return session ? <Outlet /> : <Navigate to="/bienvenida" replace />
}
