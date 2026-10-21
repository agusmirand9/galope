import { useAuth } from '../context/AuthContext'
import Boton from '../components/Boton'

// Provisorio: sirve para probar sesión y cierre de sesión hasta armar las pestañas.
export default function Inicio() {
  const { usuario, salir } = useAuth()
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 px-6">
      <h1 className="font-titulo text-2xl text-azul">Inicio</h1>
      <p>Sesión iniciada como {usuario?.user_metadata?.nombre} ({usuario?.email}).</p>
      <Boton variante="contorno" onClick={salir}>Cerrar sesión</Boton>
    </main>
  )
}
