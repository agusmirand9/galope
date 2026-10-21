import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Boton from '../components/Boton'

// Provisorio: sirve para probar sesión y cierre de sesión hasta armar las pestañas.
export default function Inicio() {
  const { usuario, salir } = useAuth()
  const [error, setError] = useState(null)

  async function cerrarSesion() {
    setError(null)
    const { error } = await salir()
    if (error) setError('No pudimos cerrar la sesión. Probá de nuevo.')
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-6">
      <h1 className="font-titulo text-2xl text-azul">Inicio</h1>
      <p>Sesión iniciada como {usuario?.user_metadata?.nombre} ({usuario?.email}).</p>
      {error && <p role="alert" className="text-sm font-semibold text-marron"><span aria-hidden="true">⚠ </span>{error}</p>}
      <Boton variante="contorno" onClick={cerrarSesion}>Cerrar sesión</Boton>
    </main>
  )
}
