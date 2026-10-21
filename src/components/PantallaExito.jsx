import LayoutAuth from './LayoutAuth'
import Boton from './Boton'

export default function PantallaExito({ titulo, texto, onContinuar }) {
  return (
    <LayoutAuth>
      <h1 className="font-titulo text-2xl leading-snug text-azul">{titulo}</h1>
      <p className="text-lg font-semibold">{texto}</p>
      <Boton onClick={onContinuar}>Continuar</Boton>
    </LayoutAuth>
  )
}
