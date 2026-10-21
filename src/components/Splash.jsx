import Logo from './Logo'

export default function Splash() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-celeste-claro">
      {/* Antes: className="text-3xl" pisaba el ancho del logo y el SVG salía a tamaño libre */}
      <Logo className="w-40" />
      <div role="status" aria-label="Cargando"
        className="size-6 animate-spin rounded-full border-2 border-celeste border-t-azul motion-reduce:animate-none" />
    </main>
  )
}
