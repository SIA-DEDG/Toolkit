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
const HGAP = 22         // espaço horizontal entre irmãos
const CANVAS_PAD = 24   // respiro nas bordas do canvas

// Cor de destaque e fundo do ícone por família (mesma cor das caixas de decisão do ramo)
const FAM_STYLE = {
  A: { accentColor: FAM_A, iconBg: 'rgba(109,40,217,0.15)' },
  B: { accentColor: FAM_B, iconBg: 'rgba(14,116,144,0.15)' },
  C: { accentColor: FAM_C, iconBg: 'rgba(180,83,9,0.15)' },
}

// Instrumentos com nome completo (sem abreviações) e sua família (fam)
const INSTRUMENTS_RAW = {
  convenio: { id: 'convenio-pd&i', fam: 'A', icon: NotepadText, title: 'Convênio de PD&I', description: 'Com repasse financeiro - Art. 9º, Lei 10.973' },
  acordo: { id: 'acordo-pd&i', fam: 'A', icon: Handshake, title: 'Acordo de Parceria PD&I', description: 'Sem repasse financeiro - Art. 9º, Lei 10.973' },
  licitacao: { id: 'licitacao', fam: 'B', icon: FileText, title: 'Licitação', description: 'Convencional - Lei 14.133/2021' },
  etec: { id: 'encomenda-tecnologica', fam: 'B', icon: Computer, title: 'Encomenda Tecnológica', description: 'Arts. 20 a 22, Lei 10.973' },
  cpsi: { id: 'contrato-publico', fam: 'B', icon: Wrench, title: 'Contrato Público para Solução Inovadora', description: 'Por fases competitivas - Arts. 49-51' },
  direta: { id: 'contratacao-direta', fam: 'B', icon: ClipboardCheck, title: 'Contratação Direta', description: 'Dispensa / Inexigibilidade - Arts. 72-75, Lei 14.133' },
  doacao: { id: 'doacao-solucao', fam: 'B', icon: Package, title: 'Doação de Solução Inovadora', description: 'Art. 14-A, Lei 10.973' },
  transferencia: { id: 'transferencia-tecnologia', fam: 'B', icon: RefreshCw, title: 'Transferência Tecnológica', description: 'Know-how interno - Arts. 6º e 37, Lei 10.973' },
  pmi: { id: 'pmi', fam: 'C', icon: Search, title: 'Procedimento de Manifestação de Interesse', description: 'PMI - Art. 26, Lei 14.133' },
  dialogo: { id: 'dialogo-competitivo', fam: 'C', icon: MessageCircle, title: 'Diálogo Competitivo', description: 'Art. 32, Lei 14.133/2021' },
  pitchHackathon: { id: 'pitch-hackton', fam: 'C', icon: Lightbulb, title: 'Pitches e Hackathons', description: 'Apresentação e prototipagem de ideias' },
  concurso: { id: 'concurso-publico-inovacao', fam: 'C', icon: Trophy, title: 'Concurso Público de Inovação', description: 'Formal com premiação - Art. 29, Lei 10.973' },
}

export const INSTRUMENTS = Object.fromEntries(
  Object.entries(INSTRUMENTS_RAW).map(([key, inst]) => [key, { ...inst, ...FAM_STYLE[inst.fam] }])
)

// --- Árvore de decisão -----------------------------------------------------
// Cada nó "box" é uma pergunta/rótulo do fluxo; cada nó "card" é um instrumento (folha).
// "connectMode: 'labeled'" insere um BranchLabel entre pai e cada filho, respeitando
// sempre o mesmo respiro (GAP) acima e abaixo do rótulo. "plain" liga direto, sem rótulo.
const card = (key) => ({ type: 'card', key })
const box = (key, def, connect = {}) => ({ type: 'box', key, def, connectMode: 'plain', ...connect })

const TREE = box('root', { w: 340, h: 42, bg: '#042d63', pill: true, text: 'Necessidade Institucional' }, {
  children: [
    box('p1', { w: 520, h: 60, bg: '#116ed0', text: 'O que a instituição precisa fazer?', subtitle: 'Ponto de partida da necessidade institucional' }, {
      connectMode: 'labeled',
      labels: ['Desenvolver', 'Adquirir / Contratar', 'Explorar mercado'],
      children: [
        box('p2a', { w: 400, h: 60, bg: FAM_A, text: 'Haverá transferência ou repasse de recursos financeiros públicos para o parceiro?' }, {
          connectMode: 'labeled',
          labels: ['Sim, com repasse de recursos', 'Não — colaboração mútua'],
          children: [card('convenio'), card('acordo')],
        }),
        box('p2b', { w: 320, h: 46, bg: FAM_B, text: 'A solução já existe no mercado?' }, {
          connectMode: 'labeled',
          // Caminho do meio: reserva pouca largura entre os irmãos e desce para os ramos
          // laterais (A e C) poderem se aproximar do centro sem sobreposição.
          laneWidth: 380,
          drop: 220,
          labels: ['Sim, solução padronizada', 'Não, a desenvolver'],
          children: [
            card('licitacao'),
            box('grau', { w: 290, h: 50, bg: FAM_B, text: 'Qual o grau de risco técnico e maturidade?' }, {
              connectMode: 'labeled',
              // Reserva pouca largura para não empurrar Licitação para longe (a aproxima do centro)
              // e desce a caixa "grau de risco" para o cascateamento acontecer mais abaixo.
              laneWidth: 300,
              drop: 130,
              labels: ['Alto risco - inexiste', 'Risco moderado', 'Caso especial de doação'],
              children: [
                card('etec'),
                card('cpsi'),
                box('caso', { w: 220, h: 46, bg: FAM_B, text: 'Qual o caso especial?' }, {
                  children: [card('direta'), card('doacao'), card('transferencia')],
                }),
              ],
            }),
          ],
        }),
        box('p2c', { w: 320, h: 46, bg: FAM_C, text: 'O que quer descobrir / mapear?' }, {
          connectMode: 'labeled',
          labels: ['Interesse do mercado para P&D', 'Solução técnica para problema', 'Ideias abertas e inovações'],
          children: [
            card('pmi'),
            card('dialogo'),
            box('formato', { w: 220, h: 46, bg: FAM_C, text: 'Qual formato de evento?' }, {
              connectMode: 'labeled',
              // Última coluna: reserva menos largura e desce para Pitches/Concurso não colidirem
              // com o card de Diálogo nem com os rótulos vizinhos.
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
const nodeOwnWidth = (node) => (node.type === 'card' ? CARD_W : node.def.w)
const nodeOwnHeight = (node) => (node.type === 'card' ? CARD_H : node.def.h)

function subtreeWidth(node) {
  const ownW = nodeOwnWidth(node)
  const children = node.children
  if (!children || children.length === 0) return ownW
  const childrenW = children.reduce((sum, c) => sum + laneWidth(c), 0) + HGAP * (children.length - 1)
  return Math.max(ownW, childrenW)
}

// Largura horizontal que um nó reserva entre irmãos. Por padrão é a largura real da subárvore,
// mas um nó pode declarar `laneWidth` menor: sua subárvore larga "desce" (via `drop`) para um nível
// abaixo dos irmãos, então não precisa reservar toda a largura na fileira de cima.
function laneWidth(node) {
  return node.laneWidth ?? subtreeWidth(node)
}

function computeLayout(tree) {
  const boxes = {}
  const positions = {}
  const labelEls = []
  const lines = []

  function layout(node, cx, top) {
    const w = nodeOwnWidth(node)
    const h = nodeOwnHeight(node)

    if (node.type === 'card') positions[node.key] = { cx, y: top }
    else boxes[node.key] = { cx, y: top, w, h, ...node.def }

    const bottom = top + h
    const children = node.children
    if (!children || children.length === 0) return

    const labeled = node.connectMode === 'labeled'
    const gap = labeled ? GAP : GAP_PLAIN
    const labelTop = bottom + gap
    const busY = labeled ? labelTop + LABEL_H / 2 : bottom + gap / 2
    const childTop = labeled ? labelTop + LABEL_H + GAP : bottom + gap

    const childLanes = children.map(laneWidth)
    const totalW = childLanes.reduce((a, b) => a + b, 0) + HGAP * (children.length - 1)
    let x = cx - totalW / 2

    const childCenters = []
    children.forEach((child, i) => {
      const lane = childLanes[i]
      const childCx = x + lane / 2
      childCenters.push(childCx)
      x += lane + HGAP

      // `drop` desce a subárvore deste filho (e todo o seu conteúdo) alguns pixels a mais,
      // deixando o caminho do meio mais baixo para os ramos laterais se aproximarem do centro.
      const cTop = childTop + (child.drop || 0)

      lines.push({ x1: childCx, y1: busY, x2: childCx, y2: cTop })
      if (labeled) labelEls.push({ x: childCx, y: busY, text: node.labels[i] })

      layout(child, childCx, cTop)
    })

    lines.push({ x1: cx, y1: bottom, x2: cx, y2: busY })
    if (childCenters.length > 1) {
      lines.push({ x1: childCenters[0], y1: busY, x2: childCenters[childCenters.length - 1], y2: busY })
    }
  }

  layout(tree, 0, 0)

  // Desloca tudo para que nada fique fora do canvas (respiro nas bordas)
  let minLeft = Infinity, maxRight = -Infinity, maxBottom = 0
  for (const b of Object.values(boxes)) {
    minLeft = Math.min(minLeft, b.cx - b.w / 2)
    maxRight = Math.max(maxRight, b.cx + b.w / 2)
    maxBottom = Math.max(maxBottom, b.y + b.h)
  }
  for (const p of Object.values(positions)) {
    minLeft = Math.min(minLeft, p.cx - CARD_W / 2)
    maxRight = Math.max(maxRight, p.cx + CARD_W / 2)
    maxBottom = Math.max(maxBottom, p.y + CARD_H)
  }

  const offsetX = CANVAS_PAD - minLeft
  const offsetY = CANVAS_PAD

  const shiftX = (v) => v + offsetX
  const shiftY = (v) => v + offsetY

  for (const b of Object.values(boxes)) b.cx = shiftX(b.cx), b.y = shiftY(b.y)
  for (const p of Object.values(positions)) p.cx = shiftX(p.cx), p.y = shiftY(p.y)
  for (const l of labelEls) l.x = shiftX(l.x), l.y = shiftY(l.y)

  const segs = lines.map((l) => `M${shiftX(l.x1)},${shiftY(l.y1)} L${shiftX(l.x2)},${shiftY(l.y2)}`)

  return {
    boxes,
    positions,
    labelEls,
    segs,
    canvasW: maxRight - minLeft + CANVAS_PAD * 2,
    canvasH: maxBottom + CANVAS_PAD * 2,
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

// Card clicável de instrumento posicionado no fluxograma
function Card({ data, onInstrumentClick }) {
  return (
    <InstrumentCard
      accentColor={data.accentColor}
      iconBg={data.iconBg}
      icon={data.icon}
      title={data.title}
      description={data.description}
      width={CARD_W}
      height={CARD_H}
      onClick={() => onInstrumentClick(data.id)}
    />
  )
}

// Retorna estilo de posicionamento absoluto para elementos do canvas
function abs(left, top) {
  return { position: 'absolute', left, top }
}

function BranchLabel({ x, y, text, anchor = 'middle', maxWidth = 220 }) {
  const translateX =
    anchor === 'middle' ? '-50%' : anchor === 'end' ? '-100%' : '0%'

  return (
    <div
      className="absolute z-[1] pointer-events-none flex items-center justify-center"
      style={{
        left: x,
        top: y,
        transform: `translate(${translateX}, -50%)`,
        maxWidth,
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

const boxLeft = (b) => b.cx - b.w / 2
const cardLeft = (cx) => cx - CARD_W / 2

// Fluxograma de decisão em canvas absoluto com conectores SVG e cards de instrumentos
export function TrilhaFlowchartDecision({ onInstrumentClick, headerAction }) {
  const { boxes, positions, labelEls, segs, canvasW, canvasH } = LAYOUT

  const cardAt = (key) => (
    <div key={key} style={abs(cardLeft(positions[key].cx), positions[key].y)} className="z-[1] relative">
      <Card data={INSTRUMENTS[key]} onInstrumentClick={onInstrumentClick} />
    </div>
  )

  return (
    <div className="relative overflow-visible" style={{ width: canvasW, height: canvasH }}>
      {headerAction && (
        <div className="absolute z-[2]" style={{ right: 20, top: 20 }}>
          {headerAction}
        </div>
      )}

      <svg
        className="absolute inset-0 overflow-visible pointer-events-none z-0"
        width={canvasW} height={canvasH}
        viewBox={`0 0 ${canvasW} ${canvasH}`}
        fill="none"
        aria-hidden="true"
      >
        <g stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {segs.map((d, i) => <path key={i} d={d} />)}
        </g>
      </svg>

      {labelEls.map((l, i) => (
        <BranchLabel key={i} x={l.x} y={l.y} text={l.text} />
      ))}

      {Object.entries(boxes).map(([key, b]) => (
        <div key={key} style={abs(boxLeft(b), b.y)} className="z-[1] relative">
          <QBox text={b.text} subtitle={b.subtitle} width={b.w} height={b.h} bg={b.bg} pill={b.pill} />
        </div>
      ))}

      {Object.keys(positions).map(cardAt)}
    </div>
  )
}
