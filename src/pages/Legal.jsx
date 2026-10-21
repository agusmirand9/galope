import { Link } from 'react-router-dom'

// Provisorio: reemplazar por el texto real de Términos y Política de privacidad.
export default function Legal({ titulo }) {
  return (
    <main className="mx-auto max-w-md px-6 py-8">
      <h1 className="font-titulo text-2xl text-azul">{titulo}</h1>
      <p className="my-4">Texto pendiente.</p>
      <Link to="/bienvenida" className="underline">Volver</Link>
    </main>
  )
}
