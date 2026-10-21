// Trama de rutas del manual (líneas que se curvan, se enroscan y se cruzan).
// Usa currentColor: el color se define desde afuera con text-*.
export default function TramaRutas({ className = '' }) {
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor"
      strokeWidth="3" strokeLinecap="round" aria-hidden="true" className={className}>
      <path d="M-20 120 C 150 40, 260 220, 380 140 S 560 60, 640 180" />
      <path d="M-20 300 C 120 220, 200 400, 330 320 S 470 180, 640 330" />
      <path d="M-20 520 C 100 430, 240 640, 360 520 S 520 400, 640 560" />
      <path d="M-20 700 C 140 620, 220 780, 340 700 S 500 600, 640 740" />
      <path d="M90 -20 C 40 160, 220 260, 150 420 S 60 640, 200 820" />
      <path d="M420 -20 C 340 140, 520 300, 440 460 S 360 680, 500 820" />
      <path d="M280 330 C 220 380, 240 450, 300 440 C 360 430, 350 360, 300 370" />
    </svg>
  )
}
