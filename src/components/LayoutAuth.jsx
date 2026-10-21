import Logo from './Logo'

export default function LayoutAuth({ children, pie }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col px-6 py-8">
      <header><Logo /></header>
      <div className="flex flex-1 flex-col justify-center gap-4 py-8">{children}</div>
      {pie && <p className="text-center text-xs">{pie}</p>}
    </main>
  )
}
