import imagotipo from '../assets/imagotipo.svg'

// Tu manual pide mínimo 120 px de ancho: w-32 equivale a 128 px.
export default function Logo({ className = 'w-32' }) {
  return <img src={imagotipo} alt="GALOPÉ" className={className} />
}