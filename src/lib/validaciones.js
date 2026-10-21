// Validaciones del lado del cliente: sirven para guiar a la persona, NO para proteger datos.
// La validación real tiene que estar también en Supabase (ver supabase/migrations/002_validar_nombre.sql).

export const LIMITES = { nombreMin: 2, nombreMax: 50, passwordMin: 8, passwordMax: 72 }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const NOMBRE = /^[\p{L}\p{M}][\p{L}\p{M}' .-]*$/u // letras (con tildes), espacios, apóstrofo, punto y guion

export const normalizarEmail = (valor) => valor.trim().toLowerCase()

export function validarNombre(valor) {
  const nombre = valor.trim()
  if (!nombre) return 'Contanos cómo te llamás.'
  if (nombre.length < LIMITES.nombreMin) return `Tu nombre tiene que tener al menos ${LIMITES.nombreMin} letras.`
  if (nombre.length > LIMITES.nombreMax) return `Usá hasta ${LIMITES.nombreMax} caracteres.`
  if (!NOMBRE.test(nombre)) return 'Usá solo letras, sin números ni símbolos.'
  return null
}

export function validarEmail(valor) {
  const email = valor.trim()
  if (!email) return 'Ingresá tu email.'
  if (email.length > 254 || !EMAIL.test(email)) return 'Revisá el email: tiene que ser algo como nombre@correo.com.'
  return null
}

// Para crear cuenta. En el ingreso NO se exige largo mínimo: pueden existir cuentas con otras reglas.
export function validarPasswordNueva(valor) {
  if (!valor) return 'Ingresá una contraseña.'
  if (valor.length < LIMITES.passwordMin) return `Usá al menos ${LIMITES.passwordMin} caracteres.`
  if (valor.length > LIMITES.passwordMax) return `Usá hasta ${LIMITES.passwordMax} caracteres.`
  return null
}

export const validarPasswordIngreso = (valor) => (valor ? null : 'Ingresá tu contraseña.')
