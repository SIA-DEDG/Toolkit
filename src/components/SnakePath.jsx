import React from 'react'

const MID_Y     = 85
const AMPLITUDE = 30

function buildPath(cols, colWidth) {
  const half = colWidth / 2
  const nX = Array.from({ length: cols }, (_, i) => colWidth * i + half)
  const nY = nX.map((_, i) => {
    if (i === 0 || i === cols - 1) return MID_Y
    return i % 2 === 1 ? MID_Y + AMPLITUDE : MID_Y - AMPLITUDE
  })

  let d = `M ${nX[0]},${nY[0]}`
  for (let i = 0; i < cols - 1; i++) {
    d += ` C ${nX[i] + half},${nY[i]} ${nX[i + 1] - half},${nY[i + 1]} ${nX[i + 1]},${nY[i + 1]}`
  }
  return d
}

export default function SnakePath({ extraTop = 0, cols = 9, colWidth = 140 }) {
  const TOTAL_W = colWidth * cols
  const PATH    = buildPath(cols, colWidth)

  return (
    <svg
      viewBox={`0 0 ${TOTAL_W} 170`}
      preserveAspectRatio="none"
      className="absolute left-0 w-full pointer-events-none"
      style={{ top: 128 + extraTop, height: 170, zIndex: 0 }}
      aria-hidden="true"
    >
      <path d={PATH} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="6"   strokeLinecap="round" />
      <path d={PATH} fill="none" stroke="#2A4365"           strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  )
}

// Exporta os valores base para alinhamento externo
export { MID_Y, AMPLITUDE }
