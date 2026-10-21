const estilos = {
  primario: 'bg-azul text-crema disabled:bg-azul/30',
  contorno: 'border-2 border-azul text-azul disabled:opacity-40',
}

export default function Boton({ variante = 'primario', cargando = false, disabled, children, ...resto }) {
  return (
    <button
      className={`w-full rounded-lg px-4 py-3 font-semibold uppercase tracking-wide focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul ${estilos[variante]}`}
      disabled={disabled || cargando}
      {...resto}
    >
      {cargando ? 'Un momento…' : children}
    </button>
  )
}
