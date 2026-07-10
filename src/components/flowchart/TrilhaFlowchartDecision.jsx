import { InstrumentCard } from './InstrumentCard'
import { Handshake, NotepadText, Lightbulb, MessageCircle, Computer, Wrench, Package, ClipboardCheck, RefreshCw, FileText, Search, Trophy } from 'lucide-react'

const BRAND = '#0e59a8'
const FAM_A = '#6d28d9'
const FAM_B = '#0e7490'
const FAM_C = '#b45309'

const CARD_W = 188
const CARD_H = 116

// Regras de espaçamento vertical: caixa -> rótulo de ramo -> caixa/card usa sempre o mesmo respiro
const GAP = 30          // espaço acima e abaixo de um rótulo de ramo (BranchLabel)
const GAP_PLAIN = 36    // espaço em conexões diretas, sem rótulo de ramo
const LABEL_H = 34      // altura de referência do rótulo de ramo, usada no cálculo do espaçamento
const HGAP = 40        // espaço horizontal entre irmãos
const CANVAS_PAD = 24   // respiro nas bordas do canvas

// Cor de destaque e fundo do ícone por família (mesma cor das caixas de decisão do ramo)
const FAM_STYLE = {
  A: { accentColor: FAM_A, iconBg: 'rgba(109,40,217,0.15)' },
  B: { accentColor: FAM_B, iconBg: 'rgba(14,116,144,0.15)' },
  C: { accentColor: FAM_C, iconBg: 'rgba(180,83,9,0.15)' },
}

// Instrumentos com nome completo (sem abreviações) e sua família (fam)
const INSTRUMENTS_RAW = {
  convenio: { id: 'convenio-pd&i', fam: 'A', icon: NotepadText, title: 'Convênio de PD&I', description: 'Com repasse financeiro — Art. 9º, Lei 10.973' },
  acordo: { id: 'acordo-pd&i', fam: 'A', icon: Handshake, title: 'Acordo de Parceria PD&I', description: 'Sem repasse financeiro — Art. 9º, Lei 10.973' },
  licitacao: { id: 'licitacao', fam: 'B', icon: FileText, title: 'Licitação', description: 'Convencional — Lei 14.133/2021' },
  etec: { id: 'encomenda-tecnologica', fam: 'B', icon: Computer, title: 'Encomenda Tecnológica', description: 'Arts. 20 a 22, Lei 10.973' },
  cpsi: { id: 'contrato-publico', fam: 'B', icon: Wrench, title: 'Contrato Público para Solução Inovadora', description: 'Por fases competitivas — Arts. 49-51' },
  direta: { id: 'contratacao-direta', fam: 'B', icon: ClipboardCheck, title: 'Contratação Direta', description: 'Dispensa / Inexigibilidade — Arts. 72-75, Lei 14.133' },
  doacao: { id: 'doacao-solucao', fam: 'B', icon: Package, title: 'Doação de Solução Inovadora', description: 'Art. 14-A, Lei 10.973' },
  transferencia: { id: 'transferencia-tecnologia', fam: 'B', icon: RefreshCw, title: 'Transferência Tecnológica', description: 'Know-how interno — Arts. 6º e 37, Lei 10.973' },
  pmi: { id: 'pmi', fam: 'C', icon: Search, title: 'Procedimento de Manifestação de Interesse', description: 'PMI — Art. 26, Lei 14.133' },
  dialogo: { id: 'dialogo-competitivo', fam: 'C', icon: MessageCircle, title: 'Diálogo Competitivo', description: 'Art. 32, Lei 14.133/2021' },
  pitchHackathon: { id: 'pitch-hackton', fam: 'C', icon: Lightbulb, title: 'Pitches e Hackathons', description: 'Apresentação e prototipagem de ideias' },
  concurso: { id: 'concurso-publico-inovacao', fam: 'C', icon: Trophy, title: 'Concurso Público de Inovação', description: 'Formal com premiação — Art. 29, Lei 10.973' },
}

export const INSTRUMENTS = Object.fromEntries(
  Object.entries(INSTRUMENTS_RAW).map(([key, instrument]) => [key, { ...instrument, ...FAM_STYLE[instrument.fam] }])
)

const card = (key) => ({ type: 'card', key })
const box = (key, def, connect = {}) => ({ type: 'box', key, def, connectMode: 'plain', ...connect })

const TREE = box('root', { width: 340, height: 42, bg: '#042d63', pill: true, text: 'Necessidade Institucional' }, {
  children: [
    box('p1', { width: 520, height: 60, bg: '#116ed0', text: 'O que a instituição precisa fazer?', subtitle: 'Ponto de partida da necessidade institucional' }, {
      connectMode: 'labeled',
      labels: ['Desenvolver', 'Adquirir / Contratar', 'Explorar mercado'],
      children: [
        box('p2a', { width: 400, height: 60, bg: FAM_A, text: 'Haverá transferência ou repasse de recursos públicos para o parceiro?' }, {
          connectMode: 'labeled',
          labels: ['Sim — com repasse de recursos', 'Não — colaboração mútua'],
          children: [card('convenio'), card('acordo')],
        }),
        box('p2b', { width: 320, height: 46, bg: FAM_B, text: 'A solução já existe no mercado?' }, {
          connectMode: 'labeled',
          laneWidth: 380,
          drop: 240,
          labels: ['Sim — solução padronizada', 'Não — a desenvolver'],
          children: [
            card('licitacao'),
            box('grau', { width: 290, height: 50, bg: FAM_B, text: 'Qual o grau de risco técnico e maturidade?' }, {
              connectMode: 'labeled',
              laneWidth: 300,
              drop: 130,
              labels: ['Alto risco — solução inexiste', 'Risco moderado', 'Caso especial de doação'],
              children: [
                card('etec'),
                card('cpsi'),
                box('caso', { width: 220, height: 46, bg: FAM_B, text: 'Qual o caso especial?' }, {
                  connectMode: 'labeled',
                  labels: ['Contratação direta', 'Parceiro formal para P&D (gera contrato)', 'Constrói especificação técnica com mercado'],
                  children: [card('direta'), card('doacao'), card('transferencia')],
                }),
              ],
            }),
          ],
        }),
        box('p2c', { width: 320, height: 46, bg: FAM_C, text: 'O que quer descobrir / mapear?' }, {
          connectMode: 'labeled',
          labels: ['Interesse do mercado para P&D', 'Solução técnica para problema', 'Ideias abertas e inovações'],
          children: [
            card('pmi'),
            card('dialogo'),
            box('formato', { width: 220, height: 46, bg: FAM_C, text: 'Qual formato?' }, {
              connectMode: 'labeled',
              laneWidth: 250,
              drop: 120,
              labels: ['Apresentação e prototipagem', 'Formal com prêmio'],
              children: [card('pitchHackathon'), card('concurso')],
            }),
          ],
        }),
      ],
    }),
  ],
})

// --- Cálculo do layout (posições, rótulos e conectores) --------------------
const nodeOwnWidth = (node) => (node.type === 'card' ? CARD_W : node.def.width)
const nodeOwnHeight = (node) => (node.type === 'card' ? CARD_H : node.def.height)

function subtreeWidth(node) {
  const ownWidth = nodeOwnWidth(node)
  const children = node.children
  if (!children || children.length === 0) return ownWidth
  const childrenWidth = children.reduce((sum, child) => sum + laneWidth(child), 0) + HGAP * (children.length - 1)
  return Math.max(ownWidth, childrenWidth)
}

function laneWidth(node) {
  return node.laneWidth ?? subtreeWidth(node)
}

function computeLayout(tree) {
  const boxes = {}
  const positions = {}
  const labels = []
  const lines = []

  function layout(node, centerX, top) {
    const width = nodeOwnWidth(node)
    const height = nodeOwnHeight(node)

    if (node.type === 'card') positions[node.key] = { centerX, top }
    else boxes[node.key] = { centerX, top, width, height, ...node.def }

    const bottom = top + height
    const children = node.children
    if (!children || children.length === 0) return

    const labeled = node.connectMode === 'labeled'
    const gap = labeled ? GAP : GAP_PLAIN
    const labelTop = bottom + gap
    const busY = labeled ? labelTop + LABEL_H / 2 : bottom + gap / 2
    const childTop = labeled ? labelTop + LABEL_H + GAP : bottom + gap

    const childLanes = children.map(laneWidth)
    const totalWidth = childLanes.reduce((sum, lane) => sum + lane, 0) + HGAP * (children.length - 1)
    let left = centerX - totalWidth / 2

    const childCenters = []
    children.forEach((child, index) => {
      const lane = childLanes[index]
      const childCenterX = left + lane / 2
      childCenters.push(childCenterX)
      left += lane + HGAP

      const childTopY = childTop + (child.drop || 0)

      lines.push({ x1: childCenterX, y1: busY, x2: childCenterX, y2: childTopY })
      if (labeled) labels.push({ x: childCenterX, y: busY, text: node.labels[index] })

      layout(child, childCenterX, childTopY)
    })

    lines.push({ x1: centerX, y1: bottom, x2: centerX, y2: busY })
    if (childCenters.length > 1) {
      lines.push({ x1: childCenters[0], y1: busY, x2: childCenters[childCenters.length - 1], y2: busY })
    }
  }

  layout(tree, 0, 0)

  let minLeft = Infinity, maxRight = -Infinity, maxBottom = 0
  for (const box of Object.values(boxes)) {
    minLeft = Math.min(minLeft, box.centerX - box.width / 2)
    maxRight = Math.max(maxRight, box.centerX + box.width / 2)
    maxBottom = Math.max(maxBottom, box.top + box.height)
  }
  for (const position of Object.values(positions)) {
    minLeft = Math.min(minLeft, position.centerX - CARD_W / 2)
    maxRight = Math.max(maxRight, position.centerX + CARD_W / 2)
    maxBottom = Math.max(maxBottom, position.top + CARD_H)
  }

  const offsetX = CANVAS_PAD - minLeft
  const offsetY = CANVAS_PAD

  const shiftX = (value) => value + offsetX
  const shiftY = (value) => value + offsetY

  for (const box of Object.values(boxes)) { box.centerX = shiftX(box.centerX); box.top = shiftY(box.top) }
  for (const position of Object.values(positions)) { position.centerX = shiftX(position.centerX); position.top = shiftY(position.top) }
  for (const label of labels) { label.x = shiftX(label.x); label.y = shiftY(label.y) }

  const segments = lines.map((line) => `M${shiftX(line.x1)},${shiftY(line.y1)} L${shiftX(line.x2)},${shiftY(line.y2)}`)

  return {
    boxes,
    positions,
    labels,
    segments,
    canvasWidth: maxRight - minLeft + CANVAS_PAD * 2,
    canvasHeight: maxBottom + CANVAS_PAD * 2,
  }
}

const LAYOUT = computeLayout(TREE)

// Caixa de decisão ou rótulo no fluxograma
function QBox({ text, subtitle, width = 160, height = 65, bg = BRAND, color = '#fff', pill = false }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width, minHeight: height, background: bg, padding: '8px 14px', borderRadius: pill ? 999 : 10 }}
    >
      <p className="m-0 text-center leading-snug" style={{ fontSize: 13, fontWeight: 600, color }}>
        {text}
      </p>
      {subtitle && (
        <p className="m-0 text-center leading-snug mt-1" style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

function BranchLabel({ x, y, text }) {
  return (
    <div
      className="absolute z-[1] pointer-events-none flex items-center justify-center"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        maxWidth: 220,
        minHeight: LABEL_H,
        width: 'max-content',
        background: '#e8f0fb',
        border: `1px solid ${BRAND}`,
        borderRadius: 8,
        padding: '5px 13px',
        fontSize: 12.5,
        fontWeight: 500,
        lineHeight: 1.3,
        color: '#2a4365',
        textAlign: 'center',
        whiteSpace: 'normal',
        overflowWrap: 'break-word',
      }}
    >
      {text}
    </div>
  )
}

const boxLeft = (box) => box.centerX - box.width / 2
const cardLeft = (centerX) => centerX - CARD_W / 2

// Fluxograma de decisão em canvas absoluto com conectores SVG e cards de instrumentos
export function TrilhaFlowchartDecision({ onInstrumentClick, headerAction }) {
  const { boxes, positions, labels, segments, canvasWidth, canvasHeight } = LAYOUT

  const cardAt = (key) => {
    const instrument = INSTRUMENTS[key]
    const { centerX, top } = positions[key]
    return (
      <div key={key} style={{ position: 'absolute', left: cardLeft(centerX), top }} className="z-[1] relative">
        <InstrumentCard
          accentColor={instrument.accentColor}
          iconBg={instrument.iconBg}
          icon={instrument.icon}
          title={instrument.title}
          description={instrument.description}
          width={CARD_W}
          height={CARD_H}
          onClick={() => onInstrumentClick(instrument.id)}
        />
      </div>
    )
  }

  return (
    <div className="relative overflow-visible" style={{ width: canvasWidth, height: canvasHeight }}>
      {headerAction && (
        <div className="absolute z-[2]" style={{ right: 20, top: 20 }}>
          {headerAction}
        </div>
      )}

      <svg
        className="absolute inset-0 overflow-visible pointer-events-none z-0"
        width={canvasWidth} height={canvasHeight}
        viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
        fill="none"
        aria-hidden="true"
      >
        <g stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {segments.map((pathData, index) => <path key={index} d={pathData} />)}
        </g>
      </svg>

      {labels.map((label, index) => (
        <BranchLabel key={index} x={label.x} y={label.y} text={label.text} />
      ))}

      {Object.entries(boxes).map(([key, box]) => (
        <div key={key} style={{ position: 'absolute', left: boxLeft(box), top: box.top }} className="z-[1] relative">
          <QBox text={box.text} subtitle={box.subtitle} width={box.width} height={box.height} bg={box.bg} pill={box.pill} />
        </div>
      ))}

      {Object.keys(positions).map(cardAt)}
    </div>
  )
}
