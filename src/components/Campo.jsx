import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// Los errores NO usan los colores de estado: marrón + ícono + borde + fondo crema.
export default function Campo({ etiqueta, tipo = 'text', valor, onChange, mensaje, esError = false, ...resto }) {
  const [visible, setVisible] = useState(false)
  const esPassword = tipo === 'password'
  const hayError = esError && mensaje

  return (
    <div>
      <div className={`flex items-center rounded-lg border-2 px-3 ${
        hayError ? 'border-marron bg-crema' : 'border-celeste bg-white focus-within:border-azul'}`}>
        <input
          aria-label={etiqueta}
          placeholder={etiqueta}
          type={esPassword && visible ? 'text' : tipo}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={hayError ? true : undefined}
          className="w-full bg-transparent py-3 text-azul outline-none placeholder:text-azul/50"
          {...resto}
        />
        {esPassword && (
          <button type="button" onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="pl-2 text-azul">
            {visible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
          </button>
        )}
      </div>
      {mensaje && (
        <p role={hayError ? 'alert' : undefined}
          className={`mt-1 text-sm ${hayError ? 'font-semibold text-marron' : 'text-azul/70'}`}>
          {hayError && <span aria-hidden="true">⚠ </span>}
          {mensaje}
        </p>
      )}
    </div>
  )
}