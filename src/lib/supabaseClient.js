import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const clave = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY

// Sin estas variables la app quedaba en blanco sin explicación: mejor fallar con un mensaje claro.
if (!url || !clave) {
  throw new Error(
    'Faltan las variables VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY. ' +
    'Copiá .env.example como .env.local, completalo y reiniciá "npm run dev".'
  )
}

export const supabase = createClient(url, clave)
