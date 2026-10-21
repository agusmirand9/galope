import { useId, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// Etiqueta siempre visible (el placeholder desaparece al escribir y no alcanza como etiqueta).
// Los errores NO usan los colores de estado: marrón + ícono + borde + fondo crema.
// "error" gana sobre "ayuda": el texto de ayuda se reemplaza por el error y vuelve cuando se corrige.
export default function Campo({ etiqueta, tipo = 'text', valor, onChange, ayuda, error, marcado = false, ...resto }) {
  const id = useId()
  const idMensaje = `${id}-mensaje`
  const [visible, setVisible] = useState(false)
  const esPassword = tipo === 'password'
  const mensaje = error || ayuda
  const conError = Boolean(error) || marcado // "marcado": borde de error sin mensaje propio

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-azul">{etiqueta}</label>
      <div className={`flex items-center rounded-lg border-2 px-3 transition-colors ${
        conError ? 'border-marron bg-crema' : 'border-celeste bg-white hover:border-azul/50 focus-within:border-azul'}`}>
        <input
          id={id}
          type={esPassword && visible ? 'text' : tipo}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={conError ? true : undefined}
          aria-describedby={mensaje ? idMensaje : undefined}
          className="w-full bg-transparent py-3 text-azul outline-none placeholder:text-azul/40"
          {...resto}
        />
        {esPassword && (
          <button type="button" onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={visible}
            className="ml-2 cursor-pointer rounded p-1 text-azul focus-visible:outline-2 focus-visible:outline-azul">
            {visible ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
          </button>
        )}
      </div>
      {mensaje && (
        <p id={idMensaje} role={error ? 'alert' : undefined}
          className={`mt-1 text-sm ${error ? 'font-semibold text-marron' : 'text-azul/70'}`}>
          {error && <span aria-hidden="true">⚠ </span>}
          {mensaje}
        </p>
      )}
    </div>
  )
}
