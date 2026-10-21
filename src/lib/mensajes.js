// Traduce los errores de Supabase al tono de GALOPÉ (voseo, sin tecnicismos).
// Los errores explican qué pasó y qué hacer; no se disculpan ni dramatizan.
const porCodigo = {
  invalid_credentials: 'El email o la contraseña son incorrectos. Intentá de nuevo.',
  email_not_confirmed: 'Todavía no confirmaste tu email. Revisá tu bandeja de entrada.',
  user_already_exists: 'Ya hay una cuenta con ese email.',
  email_exists: 'Ya hay una cuenta con ese email.',
  weak_password: 'Esa contraseña es muy débil. Usá al menos 8 caracteres y mezclá letras y números.',
  email_address_invalid: 'Ese email no es válido. Revisalo y probá de nuevo.',
  signup_disabled: 'Por ahora no se pueden crear cuentas nuevas.',
  over_request_rate_limit: 'Hiciste muchos intentos seguidos. Esperá un rato y probá de nuevo.',
  over_email_send_rate_limit: 'Enviamos muchos emails seguidos. Esperá unos minutos y probá de nuevo.',
}

const SIN_CONEXION = 'No pudimos conectarnos. Revisá tu conexión y probá de nuevo.'

export function traducir(error) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return SIN_CONEXION
  if (porCodigo[error?.code]) return porCodigo[error.code]
  if (error?.status === 429) return porCodigo.over_request_rate_limit
  if (error?.name === 'AuthRetryableFetchError' || error instanceof TypeError || /fetch|network/i.test(error?.message ?? '')) {
    return SIN_CONEXION
  }
  if (error?.status >= 500) return 'Tuvimos un problema de nuestro lado. Probá de nuevo en un rato.'
  return 'Algo salió mal. Probá de nuevo en un rato.'
}
