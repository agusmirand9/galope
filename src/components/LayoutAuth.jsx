import { Link } from 'react-router-dom'
import Logo from './Logo'

function PieLegal() {
  return (
    <>
      <Link to="/terminos" className="underline">Términos</Link> · <Link to="/privacidad" className="underline">Privacidad</Link>
    </>
  )
}

// Celular: una columna. Escritorio (lg+): panel de marca a la izquierda + formulario a la derecha.
export default function LayoutAuth({ children, pie }) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-2">
      <aside aria-hidden="true"
        className="relative hidden overflow-hidden bg-azul text-crema lg:flex lg:flex-col lg:justify-end lg:p-14">
        
        <div className="relative max-w-md">
          <p className="font-titulo text-5xl leading-tight">Yo galopé.</p>
          <p className="mt-4 text-lg">La libertad de viajar, con la tranquilidad de ir bien acompañado.</p>
        </div>
      </aside>

      <main className="flex min-h-dvh flex-col px-6 py-8 lg:px-16 lg:py-12">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
          <header><Logo /></header>
          <div className="flex flex-1 flex-col justify-center gap-4 py-8">{children}</div>
          <p className="text-center text-xs">{pie ?? <PieLegal />}</p>
        </div>
      </main>
    </div>
  )
}
