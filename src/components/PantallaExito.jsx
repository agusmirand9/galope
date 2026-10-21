import LayoutAuth from './LayoutAuth'
import Boton from './Boton'

export default function PantallaExito({ titulo, texto, boton = 'Continuar', onContinuar }) {
  return (
    <LayoutAuth>
      <h1 className="font-titulo text-2xl leading-snug text-azul">{titulo}</h1>
      <p className="text-lg font-semibold">{texto}</p>
      <Boton autoFocus onClick={onContinuar}>{boton}</Boton>
    </LayoutAuth>
  )
}
