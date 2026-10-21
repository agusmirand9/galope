import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { traducir } from '../../lib/mensajes'
import LayoutAuth from '../../components/LayoutAuth'
import Campo from '../../components/Campo'
import Boton from '../../components/Boton'
import PantallaExito from '../../components/PantallaExito'

export default function Ingreso() {
  const { ingresar } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState(null)
  const [nombre, setNombre] = useState(null) // null = todavía en el formulario

  const valido = email.trim() && password

  async function enviar(e) {
    e.preventDefault()
    if (!valido) return
    setEnviando(true)
    setError(null)
    const { data, error } = await ingresar(email.trim(), password)
    setEnviando(false)
    if (error) return setError(traducir(error))
    setNombre(data.user.user_metadata?.nombre ?? '')
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

  return (
    <LayoutAuth>
      <h1 className="font-titulo text-2xl text-azul">Iniciá sesión</h1>
      <form onSubmit={enviar} noValidate className="flex flex-col gap-3">
        <Campo etiqueta="Email" tipo="email" valor={email} onChange={setEmail} autoComplete="email"
          esError={!!error} />
        <Campo etiqueta="Contraseña" tipo="password" valor={password} onChange={setPassword}
          autoComplete="current-password" mensaje={error} esError={!!error} />
        <Boton type="submit" disabled={!valido} cargando={enviando}>Iniciar sesión</Boton>
      </form>
      <p className="text-sm">
        ¿No tenés cuenta? <Link to="/crear-cuenta" className="font-semibold underline">Creá tu cuenta</Link>
      </p>
    </LayoutAuth>
  )
}
