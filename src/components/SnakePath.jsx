import React from 'react'

/**
 * Gera um caminho senoidal com amplitude e frequência UNIFORMES.
 *
 * Lógica:
 * - 9 colunas de 140px cada → total 1260px
 * - Nós nos centros de cada coluna: x = 70, 210, 350, ..., 1190
 * - Todos os arcos têm a mesma amplitude (±42px do centro)
 * - Cubic Bezier com tangentes HORIZONTAIS nos nós:
 *     CP1 = (x_nó + 70,  y_nó)
 *     CP2 = (x_próximo - 70, y_próximo)
 *   → S-curve perfeitamente simétrica e uniforme entre cada par
 */

const COL_WIDTH = 140
const COLS      = 9
const TOTAL_W   = COL_WIDTH * COLS
const MID_Y     = 85
const AMPLITUDE = 42

// Centro X de cada coluna
const nodeX = Array.from({ length: COLS }, (_, i) => COL_WIDTH * i + COL_WIDTH / 2)

// Y alternado: início/fim no centro, demais alternam baixo/cima
const nodeY = nodeX.map((_, i) => {
  if (i === 0 || i === COLS - 1) return MID_Y
  return i % 2 === 1 ? MID_Y + AMPLITUDE : MID_Y - AMPLITUDE
})

// Constrói o path do primeiro nó (círculo) ao último (seta), sem ultrapassar
function buildPath() {
  const half = COL_WIDTH / 2   // 70px

  let d = `M ${nodeX[0]},${nodeY[0]}`

  for (let i = 0; i < COLS - 1; i++) {
    const x0 = nodeX[i],     y0 = nodeY[i]
    const x1 = nodeX[i + 1], y1 = nodeY[i + 1]
    d += ` C ${x0 + half},${y0} ${x1 - half},${y1} ${x1},${y1}`
  }

  return d
}

const PATH = buildPath()

export default function SnakePath({ extraTop = 0 }) {
  return (
    <svg
      viewBox={`0 0 ${TOTAL_W} 170`}
      preserveAspectRatio="none"
      className="absolute left-0 w-full pointer-events-none"
      style={{ top: 128 + extraTop, height: 170, zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Sombra sutil */}
      <path
        d={PATH}
        fill="none"
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Linha principal */}
      <path
        d={PATH}
        fill="none"
        stroke="#2C5282"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Exporta os nós para alinhamento dos cards/nodes em ProcessFlowPage
export { nodeX, nodeY, MID_Y, AMPLITUDE }
