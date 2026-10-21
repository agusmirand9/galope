import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { traducir } from '../../lib/mensajes'
import { LIMITES, normalizarEmail, validarEmail, validarNombre, validarPasswordNueva } from '../../lib/validaciones'
import LayoutAuth from '../../components/LayoutAuth'
import Campo from '../../components/Campo'
import Boton from '../../components/Boton'
import PantallaExito from '../../components/PantallaExito'

const YA_EXISTE = (
  <>Ya hay una cuenta con ese email. <Link to="/ingresar" className="underline">Iniciá sesión</Link></>
)

export default function CrearCuenta() {
  const { registrarse } = useAuth()
  const navigate = useNavigate()
  const formulario = useRef(null)
  const [valores, setValores] = useState({ nombre: '', email: '', password: '' })
  const [tocados, setTocados] = useState({})
  const [intento, setIntento] = useState(false) // se activa al tocar "Crear": muestra todos los errores juntos
  const [enviando, setEnviando] = useState(false)
  const [errorServidor, setErrorServidor] = useState(null) // { campo: 'email' | 'general', texto }
  const [etapa, setEtapa] = useState('formulario') // 'formulario' | 'exito' | 'confirmar'

  const errores = {
    nombre: validarNombre(valores.nombre),
    email: validarEmail(valores.email),
    password: validarPasswordNueva(valores.password),
  }
  // Un error se muestra recién cuando la persona salió del campo (o intentó enviar), no mientras escribe.
  const ver = (campo) => (tocados[campo] || intento ? errores[campo] : null)
  const cambiar = (campo) => (valor) => {
    setValores((v) => ({ ...v, [campo]: valor }))
    setErrorServidor(null)
  }
  const tocar = (campo) => () => setTocados((t) => ({ ...t, [campo]: true }))

  async function enviar(e) {
    e.preventDefault()
    if (enviando) return // evita registros duplicados por doble toque o Enter repetido
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
      resultado = await registrarse(normalizarEmail(valores.email), valores.password, valores.nombre.trim())
    } catch (err) {
      resultado = { error: err } // un corte de red puede lanzar en vez de devolver { error }
    }
    setEnviando(false)

    const { data, error } = resultado
    if (error) {
      if (error.code === 'user_already_exists' || error.code === 'email_exists') {
        return setErrorServidor({ campo: 'email', texto: YA_EXISTE })
      }
      return setErrorServidor({ campo: 'general', texto: traducir(error) })
    }
    // Con confirmación de email activada, Supabase NO devuelve error si el email ya existe:
    // devuelve un usuario sin identidades. Hay que detectarlo a mano.
    if (data.user?.identities?.length === 0) {
      return setErrorServidor({ campo: 'email', texto: YA_EXISTE })
    }
    // Cuenta creada pero sin sesión = falta confirmar el email. No es un error: es otro paso.
    setEtapa(data.session ? 'exito' : 'confirmar')
  }

  if (etapa === 'exito') {
    return (
      <PantallaExito
        titulo={`¡Hola ${valores.nombre.trim()}!`}
        texto="Creaste tu cuenta con éxito. ¡Empezá tu primer viaje!"
        onContinuar={() => navigate('/crear-viaje')}
      />
    )
  }
  if (etapa === 'confirmar') {
    return (
      <PantallaExito
        titulo="Revisá tu email"
        texto={`Te mandamos un link a ${normalizarEmail(valores.email)} para confirmar tu cuenta. Si no lo ves, mirá en spam.`}
        boton="Ir a iniciar sesión"
        onContinuar={() => navigate('/ingresar')}
      />
    )
  }

  const pie = (
    <>Al registrarte en Galopé, aceptás nuestros <Link to="/terminos" className="underline">Términos</Link> y{' '}
    <Link to="/privacidad" className="underline">Política de privacidad</Link>.</>
  )

  return (
    <LayoutAuth pie={pie}>
      <h1 className="font-titulo text-2xl text-azul">Crear cuenta</h1>
      <form ref={formulario} onSubmit={enviar} noValidate className="flex flex-col gap-4">
        <Campo etiqueta="Nombre" name="nombre" valor={valores.nombre} onChange={cambiar('nombre')}
          onBlur={tocar('nombre')} autoComplete="given-name" maxLength={LIMITES.nombreMax}
          error={ver('nombre')} />
        <Campo etiqueta="Email" name="email" tipo="email" valor={valores.email} onChange={cambiar('email')}
          onBlur={tocar('email')} autoComplete="email" inputMode="email" placeholder="nombre@correo.com"
          error={ver('email') ?? (errorServidor?.campo === 'email' ? errorServidor.texto : null)} />
        <Campo etiqueta="Contraseña" name="password" tipo="password" valor={valores.password}
          onChange={cambiar('password')} onBlur={tocar('password')} autoComplete="new-password"
          maxLength={LIMITES.passwordMax} ayuda={`Mínimo ${LIMITES.passwordMin} caracteres.`}
          error={ver('password')} />
        {errorServidor?.campo === 'general' && (
          <p role="alert" className="text-sm font-semibold text-marron">
            <span aria-hidden="true">⚠ </span>{errorServidor.texto}
          </p>
        )}
        {/* El botón ya no se deshabilita en silencio: si algo falta, al tocarlo se explica qué. */}
        <Boton type="submit" cargando={enviando}>Crear</Boton>
      </form>
      <p className="text-sm">
        ¿Ya tenés cuenta? <Link to="/ingresar" className="font-semibold underline">Iniciá sesión</Link>
      </p>
    </LayoutAuth>
  )
}
