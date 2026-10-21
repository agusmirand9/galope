import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    let activo = true
    supabase.auth.getSession()
      .then(({ data }) => { if (activo) setSession(data.session) })
      .catch(() => { /* sin conexión o sesión dañada: se sigue como visitante */ })
      .finally(() => { if (activo) setCargando(false) }) // sin esto, un error dejaba el Splash para siempre

    const { data: listener } = supabase.auth.onAuthStateChange((_evento, nueva) => {
      setSession(nueva)
    })
    return () => {
      activo = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const value = {
    session,
    usuario: session?.user ?? null,
    cargando,
    registrarse: (email, password, nombre) =>
      supabase.auth.signUp({ email, password, options: { data: { nombre } } }),
    ingresar: (email, password) => supabase.auth.signInWithPassword({ email, password }),
    salir: () => supabase.auth.signOut(),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)
