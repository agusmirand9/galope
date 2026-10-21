const estilos = {
  primario: 'bg-azul text-crema enabled:hover:bg-marron disabled:bg-azul/30',
  contorno: 'border-2 border-azul text-azul enabled:hover:bg-crema disabled:opacity-40',
}

export default function Boton({ variante = 'primario', cargando = false, disabled, children, ...resto }) {
  return (
    <button
      type="button" // dentro de un <form> hay que pedir type="submit" a propósito
      className={`w-full cursor-pointer rounded-lg px-4 py-3 font-semibold uppercase tracking-wide transition-colors disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul ${estilos[variante]}`}
      disabled={disabled || cargando}
      aria-busy={cargando || undefined}
      {...resto}
    >
      {cargando ? 'Un momento…' : children}
    </button>
  )
}
