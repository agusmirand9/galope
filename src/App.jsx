import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Splash from './components/Splash'
import RutaProtegida from './components/RutaProtegida'
import Bienvenida from './pages/auth/Bienvenida'
import CrearCuenta from './pages/auth/CrearCuenta'
import Ingreso from './pages/auth/Ingreso'
import Inicio from './pages/Inicio'
import Legal from './pages/Legal'

export default function App() {
  const { cargando } = useAuth()
  if (cargando) return <Splash />

  return (
    <Routes>
      <Route path="/bienvenida" element={<Bienvenida />} />
      {/* Sin guardia de "ya tenés sesión": cada página maneja su pantalla de éxito */}
      <Route path="/crear-cuenta" element={<CrearCuenta />} />
      <Route path="/ingresar" element={<Ingreso />} />
      <Route path="/terminos" element={<Legal titulo="Términos" />} />
      <Route path="/privacidad" element={<Legal titulo="Política de privacidad" />} />

      <Route element={<RutaProtegida />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/crear-viaje" element={<p className="p-6">Acá va el flujo de crear viaje.</p>} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
