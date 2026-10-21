import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { traducir } from '../../lib/mensajes'
import { normalizarEmail, validarEmail, validarPasswordIngreso } from '../../lib/validaciones'
import LayoutAuth from '../../components/LayoutAuth'
import Campo from '../../components/Campo'
import Boton from '../../components/Boton'
import PantallaExito from '../../components/PantallaExito'

export default function Ingreso() {
  const { ingresar } = useAuth()
  const navigate = useNavigate()
  const formulario = useRef(null)
  const [valores, setValores] = useState({ email: '', password: '' })
  const [tocados, setTocados] = useState({})
  const [intento, setIntento] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [errorServidor, setErrorServidor] = useState(null)
  const [nombre, setNombre] = useState(null) // null = todavía en el formulario

  const errores = {
    email: validarEmail(valores.email),
    password: validarPasswordIngreso(valores.password),
  }
  const ver = (campo) => (tocados[campo] || intento ? errores[campo] : null)
  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }))
    setErrorServidor(null) // el error del servidor se va apenas la persona corrige algo
  }
  const tocar = (campo) => () => setTocados((t) => ({ ...t, [campo]: true }))

  async function enviar(e) {
    e.preventDefault()
    if (enviando) return
    setIntento(true)
    const primerError = Object.keys(errores).find((campo) => errores[campo])
    if (primerError) {
      formulario.current.elements.namedItem(primerError)?.focus()
      return
    }

    setEnviando(true)
    setErrorServidor(null)
    let resultado
    try {
      resultado = await ingresar(normalizarEmail(valores.email), valores.password)
    } catch (err) {
      resultado = { error: err }
    }
    setEnviando(false)

    if (resultado.error) return setErrorServidor(traducir(resultado.error))
    setNombre(resultado.data.user?.user_metadata?.nombre ?? '')
  }

  if (nombre !== null) {
    return (
      <PantallaExito
        titulo={nombre ? `¡Hola ${nombre}!` : '¡Hola!'}
        texto="Iniciaste sesión con éxito. ¡Bienvenido de vuelta!"
        onContinuar={() => navigate('/')}
      />
    )
  }

  // Credenciales incorrectas: se marcan los dos campos y el mensaje va una sola vez, bajo la contraseña.
  // No se dice cuál de los dos falló (evita revelar qué emails tienen cuenta).
  return (
    <LayoutAuth>
      <h1 className="font-titulo text-2xl text-azul">Iniciá sesión</h1>
      <form ref={formulario} onSubmit={enviar} noValidate className="flex flex-col gap-4">
        <Campo etiqueta="Email" name="email" tipo="email" valor={valores.email} onChange={cambiar('email')}
          onBlur={tocar('email')} autoComplete="email" inputMode="email" placeholder="nombre@correo.com"
          error={ver('email')} marcado={Boolean(errorServidor)} />
        <Campo etiqueta="Contraseña" name="password" tipo="password" valor={valores.password}
          onChange={cambiar('password')} onBlur={tocar('password')} autoComplete="current-password"
          error={ver('password') ?? errorServidor} />
        <Boton type="submit" cargando={enviando}>Iniciar sesión</Boton>
      </form>
      <p className="text-sm">
        ¿No tenés cuenta? <Link to="/crear-cuenta" className="font-semibold underline">Creá tu cuenta</Link>
      </p>
    </LayoutAuth>
  )
}
