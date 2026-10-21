import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { traducir } from '../../lib/mensajes'
import LayoutAuth from '../../components/LayoutAuth'
import Campo from '../../components/Campo'
import Boton from '../../components/Boton'
import PantallaExito from '../../components/PantallaExito'

const emailValido = (e) => /^\S+@\S+\.\S+$/.test(e)

export default function CrearCuenta() {
  const { registrarse } = useAuth()
  const navigate = useNavigate()
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordTocada, setPasswordTocada] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null) // { campo: 'email' | 'general', texto }
  const [etapa, setEtapa] = useState('formulario') // 'formulario' | 'exito'

  const valido = nombre.trim() && emailValido(email) && password.length >= 8
  const passwordCorta = passwordTocada && password.length < 8

  async function enviar(e) {
    e.preventDefault()
    if (!valido) return
    setEnviando(true)
    setError(null)
    const { data, error } = await registrarse(email.trim(), password, nombre.trim())
    setEnviando(false)
    if (error) {
      if (error.code === 'user_already_exists') {
        return setError({ campo: 'email', texto: (
          <>Ya hay una cuenta con ese email. <Link to="/ingresar" className="underline">Iniciá sesión</Link></>
        ) })
      }
      return setError({ campo: 'general', texto: traducir(error) })
    }
    if (!data.session) {
      return setError({ campo: 'general', texto: 'Revisá tu email para confirmar la cuenta.' })
    }
    setEtapa('exito') // la sesión ya existe, pero nos quedamos acá hasta tocar CONTINUAR
  }

  if (etapa === 'exito') {
    return (
      <PantallaExito
        titulo={`¡Hola ${nombre.trim()}!`}
        texto="Creaste tu cuenta con éxito. ¡Empezá tu primer viaje!"
        onContinuar={() => navigate('/crear-viaje')}
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
      <form onSubmit={enviar} noValidate className="flex flex-col gap-3">
        <Campo etiqueta="Nombre" valor={nombre} onChange={setNombre} autoComplete="given-name" />
        <Campo etiqueta="Email" tipo="email" valor={email} onChange={setEmail} autoComplete="email"
          mensaje={error?.campo === 'email' ? error.texto : null} esError />
        <Campo etiqueta="Contraseña" tipo="password" valor={password} onChange={setPassword}
          onBlur={() => setPasswordTocada(true)} autoComplete="new-password"
          mensaje="*Debe contener mínimo 8 caracteres" esError={passwordCorta} />
        {error?.campo === 'general' && (
          <p role="alert" className="text-sm font-semibold text-marron"><span aria-hidden="true">⚠ </span>{error.texto}</p>
        )}
        <Boton type="submit" disabled={!valido} cargando={enviando}>Crear</Boton>
      </form>
    </LayoutAuth>
  )
}
