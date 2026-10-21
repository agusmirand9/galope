// Traduce los errores de Supabase al tono de GALOPÉ (voseo, sin tecnicismos).
const mensajes = {
  invalid_credentials: 'El email o la contraseña son incorrectos. Intentá de nuevo.',
  weak_password: 'Esa contraseña es muy débil. Usá al menos 8 caracteres.',
  over_request_rate_limit: 'Hiciste muchos intentos seguidos. Esperá un rato y probá de nuevo.',
}

export function traducir(error) {
  if (mensajes[error?.code]) return mensajes[error.code]
  if (error?.name === 'AuthRetryableFetchError' || /fetch/i.test(error?.message ?? '')) {
    return 'No pudimos conectarnos. Revisá tu conexión y probá de nuevo.'
  }
  return 'Algo salió mal. Probá de nuevo en un rato.'
}
