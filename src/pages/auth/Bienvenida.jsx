import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import LayoutAuth from '../../components/LayoutAuth'
import Boton from '../../components/Boton'

export default function Bienvenida() {
  const { session } = useAuth()
  const navigate = useNavigate()
  if (session) return <Navigate to="/" replace />

  return (
    <LayoutAuth>
      <h1 className="text-2xl font-semibold uppercase leading-tight text-azul">
        La libertad de viajar, con la confianza de estar bien acompañado
      </h1>
      <div className="mt-6 flex flex-col gap-3">
        <Boton onClick={() => navigate('/ingresar')}>Iniciar sesión</Boton>
        <Boton variante="contorno" onClick={() => navigate('/crear-cuenta')}>Crear cuenta</Boton>
      </div>
    </LayoutAuth>
  )
}
