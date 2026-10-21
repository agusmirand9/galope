import Logo from './Logo'

export default function Splash() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-celeste-claro">
      <Logo className="text-3xl" />
      <div role="status" aria-label="Cargando"
        className="size-6 animate-spin rounded-full border-2 border-celeste border-t-azul" />
    </main>
  )
}
