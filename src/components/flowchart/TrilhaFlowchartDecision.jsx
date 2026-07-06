import { InstrumentCard } from './InstrumentCard'
import { Handshake, NotepadText, Lightbulb, MessageCircle, Computer, Wrench, Package, ClipboardCheck, RefreshCw, FileText, Search, Trophy, Zap } from 'lucide-react'

const BRAND = '#0e59a8'
const FAM_A = '#6d28d9'
const FAM_B = '#0e7490'
const FAM_C = '#b45309'
const CARD_W = 201
const CARD_H = 98

// Canvas com as dimensões do frame da trilha no Figma
const CANVAS_W = 1926
const CANVAS_H = 850

// Caixas de pergunta/decisão — { centro X, topo Y, largura, altura } exatos do Figma
const BOX = {
  root:    { cx: 662,  y: 0,   w: 345, h: 45 },
  p1:      { cx: 662,  y: 80,  w: 543, h: 55 },
  p2a:     { cx: 217,  y: 202, w: 316, h: 34 },
  p2b:     { cx: 661,  y: 202, w: 316, h: 34 },
  p2c:     { cx: 1112, y: 202, w: 316, h: 34 },
  grau:    { cx: 764,  y: 414, w: 269, h: 44 },
  caso:    { cx: 960,  y: 635, w: 213, h: 34 },
  formato: { cx: 1510, y: 363, w: 217, h: 34 },
}

// Cards de instrumento — centro X e topo Y exatos do Figma
const POS = {
  convenio:      { cx: 100,  y: 303 },
  acordo:        { cx: 326,  y: 303 },
  licitacao:     { cx: 560,  y: 303 },
  etec:          { cx: 528,  y: 528 },
  cpsi:          { cx: 762,  y: 528 },
  direta:        { cx: 716,  y: 735 },
  doacao:        { cx: 960,  y: 735 },
  transferencia: { cx: 1202, y: 735 },
  pmi:           { cx: 990,  y: 303 },
  dialogo:       { cx: 1248, y: 303 },
  pitch:         { cx: 1340, y: 462 },
  hackathon:     { cx: 1584, y: 462 },
  concurso:      { cx: 1826, y: 462 },
}

// Y das barras horizontais (buses) que ligam cada pai aos filhos
const BUS = { l1: 168, a: 270, b1: 270, b2: 494, b3: 700, c1: 270, c2: 430 }

// Cor de destaque e fundo do ícone por família (mesma cor das caixas de decisão do ramo)
const FAM_STYLE = {
  A: { accentColor: FAM_A, iconBg: 'rgba(109,40,217,0.15)' },
  B: { accentColor: FAM_B, iconBg: 'rgba(14,116,144,0.15)' },
  C: { accentColor: FAM_C, iconBg: 'rgba(180,83,9,0.15)' },
}

// Instrumentos com sua família (fam); a cor de cada nó é derivada da família via FAM_STYLE
const INSTRUMENTS_RAW = {
  convenio: { id: 'convenio-pd&i', fam: 'A', icon: NotepadText, title: 'Convênio', description: 'de PD&I - Art. 9º, Lei 10.973' },
  acordo: { id: 'acordo-pd&i', fam: 'A', icon: Handshake, title: 'Acordo', description: 'de PD&I - Art. 9º, Lei 10.973' },
  doacao: { id: 'doacao-solucao', fam: 'B', icon: Package, title: 'Doação', description: 'Solução Inovadora - Art. 14-A' },
  transferencia: { id: 'transferencia-tecnologia', fam: 'B', icon: RefreshCw, title: 'Transfer.', description: 'Tecnologia - Arts. 6º/37' },
  licitacao: { id: 'licitacao', fam: 'B', icon: FileText, title: 'Licitação', description: 'convencional - Lei 14.133/2021' },
  direta: { id: 'contratacao-direta', fam: 'B', icon: ClipboardCheck, title: 'Contrat. Direta', description: 'Arts. 72-75 - Lei 14.133' },
  etec: { id: 'encomenda-tecnologica', fam: 'B', icon: Computer, title: 'ETEC', description: 'Encomenda Tecnológica - Arts. 20-22' },
  cpsi: { id: 'contrato-publico', fam: 'B', icon: Wrench, title: 'CPSI', description: 'por fases competitivas - Arts. 49-51' },
  pmi: { id: 'pmi', fam: 'C', icon: Search, title: 'PMI', description: 'Manifestação de Interesse - Art. 26' },
  dialogo: { id: 'dialogo-competitivo', fam: 'C', icon: MessageCircle, title: 'Diálogo', description: 'Competitivo - Art. 32, Lei 14.133' },
  pitch: { id: 'pitch-hackton', fam: 'C', icon: Lightbulb, title: 'Pitch', description: 'Apresentação de Ideias' },
  hackathon: { id: 'pitch-hackton', fam: 'C', icon: Zap, title: 'Hackathon', description: 'Prototipagem coletiva' },
  concurso: { id: 'concurso-publico-inovacao', fam: 'C', icon: Trophy, title: 'Concurso', description: 'Formal com prêmio - Art. 29' },
}

export const INSTRUMENTS = Object.fromEntries(
  Object.entries(INSTRUMENTS_RAW).map(([key, inst]) => [key, { ...inst, ...FAM_STYLE[inst.fam] }])
)

// Caixa de decisão ou rótulo no fluxograma
function QBox({ text, subtitle, width = 160, height = 65, bg = BRAND, color = '#fff', pill = false }) {
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ width, height, background: bg, padding: '6px 12px', borderRadius: pill ? 999 : 8 }}
    >
      <p className="m-0 text-center leading-snug" style={{ fontSize: 14, fontWeight: 600, color }}>
        {text}
      </p>
      {subtitle && (
        <p className="m-0 text-center leading-snug mt-1" style={{ fontSize: 12, fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>
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

// Rótulo SVG (pílula azul-clara) posicionado sobre os conectores do fluxograma
function BranchLabel({ x, y, text, anchor = 'middle' }) {
  const PAD_X = 14
  const EST_W = text.length * 6.4 + PAD_X * 2
  const H = 26
  const rx = anchor === 'middle' ? x - EST_W / 2 : anchor === 'end' ? x - EST_W : x
  const cy = y - 8
  return (
    <g>
      <rect x={rx} y={cy - H / 2} width={EST_W} height={H} rx={7} ry={7} fill="#e8f0fb" stroke={BRAND} strokeWidth={1} />
      <text x={x} y={cy} textAnchor={anchor} dominantBaseline="central" style={{ fontSize: 13, fontWeight: 500, fill: '#2a4365', fontFamily: 'inherit' }}>
        {text}
      </text>
    </g>
  )
}

// Deslocamento à esquerda do canvas (respiro para o card mais à esquerda)
const OFFSET_X = 24

// Posição absoluta (topo-esquerda) de uma caixa/card a partir do centro X e topo Y
const boxLeft = (o) => o.cx - o.w / 2
const cardLeft = (cx) => cx - CARD_W / 2

// Fluxograma de decisão em canvas absoluto com conectores SVG e cards de instrumentos
export function TrilhaFlowchartDecision({ onInstrumentClick, headerAction }) {
  const B = BOX
  const P = POS
  const bot = (o) => o.y + o.h

  const segs = [
    // Raiz → P1 → barra 1 → três perguntas P2
    `M${B.root.cx},${bot(B.root)} V${B.p1.y}`,
    `M${B.p1.cx},${bot(B.p1)} V${BUS.l1}`,
    `M${B.p2a.cx},${BUS.l1} H${B.p2c.cx}`,
    `M${B.p2a.cx},${BUS.l1} V${B.p2a.y}`,
    `M${B.p2b.cx},${BUS.l1} V${B.p2b.y}`,
    `M${B.p2c.cx},${BUS.l1} V${B.p2c.y}`,

    // Ramo A: P2A → Convênio / Acordo
    `M${B.p2a.cx},${bot(B.p2a)} V${BUS.a}`,
    `M${P.convenio.cx},${BUS.a} H${P.acordo.cx}`,
    `M${P.convenio.cx},${BUS.a} V${P.convenio.y}`,
    `M${P.acordo.cx},${BUS.a} V${P.acordo.y}`,

    // Ramo B nível 1: P2B → Licitação / caixa "grau de risco"
    `M${B.p2b.cx},${bot(B.p2b)} V${BUS.b1}`,
    `M${P.licitacao.cx},${BUS.b1} H${B.grau.cx}`,
    `M${P.licitacao.cx},${BUS.b1} V${P.licitacao.y}`,
    `M${B.grau.cx},${BUS.b1} V${B.grau.y}`,
    // Ramo B nível 2: grau → ETEC / CPSI / caixa "caso especial"
    `M${B.grau.cx},${bot(B.grau)} V${BUS.b2}`,
    `M${P.etec.cx},${BUS.b2} H${B.caso.cx}`,
    `M${P.etec.cx},${BUS.b2} V${P.etec.y}`,
    `M${P.cpsi.cx},${BUS.b2} V${P.cpsi.y}`,
    `M${B.caso.cx},${BUS.b2} V${B.caso.y}`,
    // Ramo B nível 3: caso → Direta / Doação / Transferência
    `M${B.caso.cx},${bot(B.caso)} V${BUS.b3}`,
    `M${P.direta.cx},${BUS.b3} H${P.transferencia.cx}`,
    `M${P.direta.cx},${BUS.b3} V${P.direta.y}`,
    `M${P.doacao.cx},${BUS.b3} V${P.doacao.y}`,
    `M${P.transferencia.cx},${BUS.b3} V${P.transferencia.y}`,

    // Ramo C nível 1: P2C → PMI / Diálogo / caixa "formato de evento"
    `M${B.p2c.cx},${bot(B.p2c)} V${BUS.c1}`,
    `M${P.pmi.cx},${BUS.c1} H${B.formato.cx}`,
    `M${P.pmi.cx},${BUS.c1} V${P.pmi.y}`,
    `M${P.dialogo.cx},${BUS.c1} V${P.dialogo.y}`,
    `M${B.formato.cx},${BUS.c1} V${B.formato.y}`,
    // Ramo C nível 2: formato → Pitch / Hackathon / Concurso
    `M${B.formato.cx},${bot(B.formato)} V${BUS.c2}`,
    `M${P.pitch.cx},${BUS.c2} H${P.concurso.cx}`,
    `M${P.pitch.cx},${BUS.c2} V${P.pitch.y}`,
    `M${P.hackathon.cx},${BUS.c2} V${P.hackathon.y}`,
    `M${P.concurso.cx},${BUS.c2} V${P.concurso.y}`,
  ]

  // Card posicionado por chave do INSTRUMENTS
  const cardAt = (key) => (
    <div key={key} style={abs(cardLeft(P[key].cx), P[key].y)} className="z-[1] relative">
      <Card data={INSTRUMENTS[key]} onInstrumentClick={onInstrumentClick} />
    </div>
  )

  return (
    <div className="relative overflow-visible" style={{ width: CANVAS_W, height: CANVAS_H, transform: `translateX(${OFFSET_X}px)` }}>

      {headerAction && (
        <div className="absolute z-[2]" style={{ right: 20, top: 20 }}>
          {headerAction}
        </div>
      )}

      <svg
        className="absolute inset-0 overflow-visible pointer-events-none z-0"
        width={CANVAS_W} height={CANVAS_H}
        viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
        fill="none"
        aria-hidden="true"
      >
        <g stroke={BRAND} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {segs.map((d, i) => <path key={i} d={d} />)}
        </g>

        <BranchLabel x={B.p2a.cx} y={185} text="Desenvolver" />
        <BranchLabel x={B.p2b.cx} y={185} text="Adquirir / Contratar" />
        <BranchLabel x={B.p2c.cx} y={185} text="Explorar mercado" />

        <BranchLabel x={P.convenio.cx} y={286} text="Outra entidade executa" />
        <BranchLabel x={P.acordo.cx} y={286} text="Institucional executa junto" />

        <BranchLabel x={P.licitacao.cx} y={286} text="Sim, solução padronizada" />
        <BranchLabel x={B.grau.cx} y={382} text="Não, a desenvolver" />

        <BranchLabel x={P.etec.cx} y={511} text="Alto risco - inexiste" />
        <BranchLabel x={P.cpsi.cx} y={511} text="Risco moderado" />
        <BranchLabel x={B.caso.cx} y={603} text="Caso especial de doação" />

        <BranchLabel x={P.pmi.cx} y={286} text="Interesse do mercado para P&D" />
        <BranchLabel x={P.dialogo.cx} y={286} text="Solução técnica para problema" />
        <BranchLabel x={B.formato.cx} y={332} text="Ideias abertas e inovações" />

        <BranchLabel x={P.pitch.cx} y={447} text="Apresentação" />
        <BranchLabel x={P.hackathon.cx} y={447} text="Prototipagem" />
        <BranchLabel x={P.concurso.cx} y={447} text="Formal com prêmio" />
      </svg>

      <div style={abs(boxLeft(B.root), B.root.y)} className="z-[1] relative">
        <QBox text="Necessidade Institucional" width={B.root.w} height={B.root.h} bg="#042d63" pill />
      </div>
      <div style={abs(boxLeft(B.p1), B.p1.y)} className="z-[1] relative">
        <QBox
          text="O que a instituição precisa fazer?"
          subtitle="Ponto de partida da necessidade institucional"
          width={B.p1.w} height={B.p1.h} bg="#116ed0"
        />
      </div>

      <div style={abs(boxLeft(B.p2a), B.p2a.y)} className="z-[1] relative">
        <QBox text="Quem executa o projeto de P&D?" width={B.p2a.w} height={B.p2a.h} bg={FAM_A} />
      </div>
      <div style={abs(boxLeft(B.p2b), B.p2b.y)} className="z-[1] relative">
        <QBox text="A solução já existe no mercado?" width={B.p2b.w} height={B.p2b.h} bg={FAM_B} />
      </div>
      <div style={abs(boxLeft(B.p2c), B.p2c.y)} className="z-[1] relative">
        <QBox text="O que quer descobrir / mapear?" width={B.p2c.w} height={B.p2c.h} bg={FAM_C} />
      </div>

      <div style={abs(boxLeft(B.grau), B.grau.y)} className="z-[1] relative">
        <QBox text="Qual o grau de risco técnico e maturidade?" width={B.grau.w} height={B.grau.h} bg={FAM_B} />
      </div>
      <div style={abs(boxLeft(B.caso), B.caso.y)} className="z-[1] relative">
        <QBox text="Qual o caso especial?" width={B.caso.w} height={B.caso.h} bg={FAM_B} />
      </div>
      <div style={abs(boxLeft(B.formato), B.formato.y)} className="z-[1] relative">
        <QBox text="Qual formato de evento?" width={B.formato.w} height={B.formato.h} bg={FAM_C} />
      </div>

      {Object.keys(POS).map(cardAt)}
    </div>
  )
}
