import { InstrumentCard } from './InstrumentCard'
import { Handshake, NotepadText, Lightbulb, MessageCircle, Computer, Wrench, Package, ClipboardCheck, RefreshCw, FileText, Search, Trophy, Zap } from 'lucide-react'

const BRAND = '#0e59a8'
const BRAND_BG = '#E3EFFF'
const FAM_A = '#6d28d9'
const FAM_B = '#0e7490'
const FAM_C = '#b45309'
const CARD_W = 280

const ARM_P2A = 20    // ramo até P2A (esquerda)
const ARM_P2B = 290   // ramo até P2B (centro)
const ARM_P2C = 20    // ramo até P2C (direita)

const A_GAP1 = 60     // P2A → Convênio / Acordo

const B_GAP1 = 50     // P2B → Licitação / P3risco
const B_GAP2 = 60    // P3risco → ETEC / CPSI / P4B
const B_GAP3 = 90     // P4B → Direta / Doação / Transfer

const C_GAP1 = 60     // P2C → PMI / Diálogo / P3C
const C_GAP2 = 140     // P3C → Pitch / Hackathon / Concurso

const NECESSIDADE_Y   = 15
const NECESSIDADE_H   = 50
const NECESSIDADE_BOT = NECESSIDADE_Y + NECESSIDADE_H

const P1_Y   = 100
const P1_H   = 80
const P1_BOT = P1_Y + P1_H

const BUS1_Y = P1_BOT + 50

const P2_H    = 70
const P2A_Y   = BUS1_Y + ARM_P2A
const P2A_BOT = P2A_Y + P2_H
const P2B_Y   = BUS1_Y + ARM_P2B
const P2B_BOT = P2B_Y + P2_H
const P2C_Y   = BUS1_Y + ARM_P2C
const P2C_BOT = P2C_Y + P2_H

const QBOX_H = 70

const A_BUS2 = P2A_BOT + Math.round(A_GAP1 * 0.6)
const A_L3   = P2A_BOT + A_GAP1

const B_BUS2 = P2B_BOT + Math.round(B_GAP1 * 0.6)
const B_L3   = P2B_BOT + B_GAP1
const B_L3B  = B_L3 + QBOX_H
const B_BUS3 = B_L3B + Math.round(B_GAP2 * 0.6)
const B_L4   = B_L3B + B_GAP2
const B_L4B  = B_L4 + QBOX_H
const B_BUS4 = B_L4B + Math.round(B_GAP3 * 0.6)
const B_L5   = B_L4B + B_GAP3

const C_BUS2 = P2C_BOT + Math.round(C_GAP1 * 0.6)
const C_L3   = P2C_BOT + C_GAP1
const C_L3B  = C_L3 + QBOX_H
const C_BUS3 = C_L3B + Math.round(C_GAP2 * 0.6)
const C_L4   = C_L3B + C_GAP2

const CANVAS_W = 1900
const CANVAS_H = Math.max(A_L3 + 200, B_L5 + 200, C_L4 + 200)

const CX = {
  root: 640,
  p2a: 250, p2b: 640, p2c: 1120,
  convenio: 120, acordo: 410,
  licitacao: 305, p3risco: 840,
  etec: 550, cpsi: 840, p4b: 1070,
  direta: 780, doacao: 1070, transferencia: 1360,
  pmi: 810, dialogo: 1120, p3c: 1380,
  pitch: 1090, hackathon: 1380, concurso: 1670,
}

export const INSTRUMENTS = {
  convenio: { id: 'convenio-pd&i', accentColor: '#209828', iconBg: 'rgba(32,152,40,0.15)', icon: NotepadText, title: 'Convênio', description: 'de PD&I - Art. 9º, Lei 10.973' },
  acordo: { id: 'acordo-pd&i', accentColor: '#08ba9c', iconBg: 'rgba(8,186,156,0.15)', icon: Handshake, title: 'Acordo', description: 'de PD&I - Art. 9º, Lei 10.973' },
  doacao: { id: 'doacao-solucao', accentColor: '#209828', iconBg: 'rgba(32,152,40,0.15)', icon: Package, title: 'Doação', description: 'Solução Inovadora - Art. 14-A' },
  transferencia: { id: 'transferencia-tecnologia', accentColor: '#6a0ea8', iconBg: 'rgba(106,14,168,0.15)', icon: RefreshCw, title: 'Transfer.', description: 'Tecnologia - Arts. 6º/37' },
  licitacao: { id: 'licitacao', accentColor: '#37474f', iconBg: 'rgba(55,71,79,0.15)', icon: FileText, title: 'Licitação', description: 'convencional - Lei 14.133/2021' },
  direta: { id: 'contratacao-direta', accentColor: '#dbaf00', iconBg: 'rgba(219,175,0,0.15)', icon: ClipboardCheck, title: 'Contrat. Direta', description: 'Arts. 72-75 - Lei 14.133' },
  etec: { id: 'encomenda-tecnologica', accentColor: '#0e59a8', iconBg: 'rgba(14,89,168,0.15)', icon: Computer, title: 'ETEC', description: 'Encomenda Tecnológica - Arts. 20-22' },
  cpsi: { id: 'contrato-publico', accentColor: '#c21d00', iconBg: 'rgba(194,29,0,0.15)', icon: Wrench, title: 'CPSI', description: 'por fases competitivas - Arts. 49-51' },
  pmi: { id: 'pmi', accentColor: '#e65100', iconBg: 'rgba(230,81,0,0.15)', icon: Search, title: 'PMI', description: 'Manifestação de Interesse - Art. 26' },
  dialogo: { id: 'dialogo-competitivo', accentColor: '#006064', iconBg: 'rgba(0,96,100,0.15)', icon: MessageCircle, title: 'Diálogo', description: 'Competitivo - Art. 32, Lei 14.133' },
  pitch: { id: 'pitch-hackton', accentColor: '#00A27F', iconBg: 'rgba(0,162,127,0.15)', icon: Lightbulb, title: 'Pitch', description: 'Apresentação de Ideias' },
  hackathon: { id: 'pitch-hackton', accentColor: '#00A27F', iconBg: 'rgba(0,162,127,0.15)', icon: Zap, title: 'Hackathon', description: 'Prototipagem coletiva' },
  concurso: { id: 'concurso-publico-inovacao', accentColor: '#880e4f', iconBg: 'rgba(136,14,79,0.15)', icon: Trophy, title: 'Concurso', description: 'Formal com prêmio - Art. 29' },
}

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
      onClick={() => onInstrumentClick(data.id)}
    />
  )
}

// Retorna estilo de posicionamento absoluto para elementos do canvas
function abs(left, top) {
  return { position: 'absolute', left, top }
}

// Rótulo SVG com fundo branco posicionado sobre os conectores do fluxograma
function BranchLabel({ x, y, text, anchor = 'middle' }) {
  const PAD_X = 35
  const PAD_Y = 3
  const EST_W = text.length * 5.5 + PAD_X * 2
  const H = 16 + PAD_Y * 2
  const rx = anchor === 'middle' ? x - EST_W / 2 : anchor === 'end' ? x - EST_W : x
  return (
    <g>
      <rect x={rx} y={y - 12 - PAD_Y} width={EST_W} height={H} rx={4} ry={4} fill="white" stroke={BRAND} strokeWidth={1} />
      <text x={x} y={y} textAnchor={anchor} style={{ fontSize: 14, fontWeight: 600, fill: BRAND, fontFamily: 'inherit' }}>
        {text}
      </text>
    </g>
  )
}

const cl = (cx) => cx - CARD_W / 2
const qcl = (cx, w) => cx - w / 2

// Fluxograma de decisão em canvas absoluto com conectores SVG e cards de instrumentos
export function TrilhaFlowchartDecision({ onInstrumentClick, headerAction }) {
  const c = CX

  const segs = [
    `M${c.root},${NECESSIDADE_BOT} V${P1_Y}`,
    `M${c.root},${P1_BOT} V${BUS1_Y}`,
    `M${c.p2a},${BUS1_Y} H${c.p2c}`,
    `M${c.p2a},${BUS1_Y} V${P2A_Y}`,
    `M${c.p2b},${BUS1_Y} V${P2B_Y}`,
    `M${c.p2c},${BUS1_Y} V${P2C_Y}`,

    `M${c.p2a},${P2A_BOT} V${A_BUS2}`,
    `M${c.convenio},${A_BUS2} H${c.acordo}`,
    `M${c.convenio},${A_BUS2} V${A_L3}`,
    `M${c.acordo},${A_BUS2} V${A_L3}`,

    `M${c.p2b},${P2B_BOT} V${B_BUS2}`,
    `M${c.licitacao},${B_BUS2} H${c.p3risco}`,
    `M${c.licitacao},${B_BUS2} V${B_L3}`,
    `M${c.p3risco},${B_BUS2} V${B_L3}`,
    `M${c.p3risco},${B_L3B} V${B_BUS3}`,
    `M${c.etec},${B_BUS3} H${c.p4b}`,
    `M${c.etec},${B_BUS3} V${B_L4}`,
    `M${c.cpsi},${B_BUS3} V${B_L4}`,
    `M${c.p4b},${B_BUS3} V${B_L4}`,
    `M${c.p4b},${B_L4B} V${B_BUS4}`,
    `M${c.direta},${B_BUS4} H${c.transferencia}`,
    `M${c.direta},${B_BUS4} V${B_L5}`,
    `M${c.doacao},${B_BUS4} V${B_L5}`,
    `M${c.transferencia},${B_BUS4} V${B_L5}`,

    `M${c.p2c},${P2C_BOT} V${C_BUS2}`,
    `M${c.pmi},${C_BUS2} H${c.p3c}`,
    `M${c.pmi},${C_BUS2} V${C_L3}`,
    `M${c.dialogo},${C_BUS2} V${C_L3}`,
    `M${c.p3c},${C_BUS2} V${C_L3}`,
    `M${c.p3c},${C_L3B} V${C_BUS3}`,
    `M${c.pitch},${C_BUS3} H${c.concurso}`,
    `M${c.pitch},${C_BUS3} V${C_L4}`,
    `M${c.hackathon},${C_BUS3} V${C_L4}`,
    `M${c.concurso},${C_BUS3} V${C_L4}`,
  ]

  return (
    <div className="relative overflow-visible" style={{ width: CANVAS_W, height: CANVAS_H, transform: 'translateX(40px)' }}>

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
        <g stroke={BRAND} strokeWidth="9" strokeLinecap="round" fill="none">
          {segs.map((d, i) => <path key={i} d={d} />)}
        </g>
        <g stroke={BRAND_BG} strokeWidth="5" strokeLinecap="round" fill="none">
          {segs.map((d, i) => <path key={i} d={d} />)}
        </g>

        <BranchLabel x={c.p2a} y={BUS1_Y - 14} text="Desenvolver" />
        <BranchLabel x={c.p2b} y={BUS1_Y - 14} text="Adquirir / Contratar" />
        <BranchLabel x={c.p2c} y={BUS1_Y - 14} text="Explorar mercado" />

        <BranchLabel x={c.convenio} y={A_BUS2 - 14} text="Outra entidade executa" />
        <BranchLabel x={c.acordo} y={A_BUS2 - 14} text="Institucional executa junto" />

        <BranchLabel x={c.licitacao} y={B_BUS2 - 14} text="Sim - Solução padronizada" />
        <BranchLabel x={c.p3risco} y={B_BUS2 - 14} text="Não - A desenvolver" />

        <BranchLabel x={c.etec} y={B_BUS3 - 14} text="Alto risco - Inexiste" />
        <BranchLabel x={c.cpsi} y={B_BUS3 - 14} text="Risco moderado" />
        <BranchLabel x={c.p4b} y={B_BUS3 - 14} text="Caso especial de doação" />

        <BranchLabel x={c.pmi} y={C_BUS2 - 14} text="Interesse do mercado para P&D" />
        <BranchLabel x={c.dialogo} y={C_BUS2 - 14} text="Solução técnica para problema" />
        <BranchLabel x={c.p3c} y={C_BUS2 - 14} text="Ideias abertas e inovações" />

        <BranchLabel x={c.pitch} y={C_BUS3 - 14} text="Apresentação" />
        <BranchLabel x={c.hackathon} y={C_BUS3 - 14} text="Prototipagem" />
        <BranchLabel x={c.concurso} y={C_BUS3 - 14} text="Formal com prêmio" />
      </svg>

      <div style={abs(qcl(c.root, 300), NECESSIDADE_Y)} className="z-[1] relative">
        <QBox text="Necessidade institucional" width={300} height={NECESSIDADE_H} bg="#637074" pill />
      </div>
      <div style={abs(qcl(c.root, 800), P1_Y)} className="z-[1] relative">
        <QBox
          text="O que a instituição precisa fazer?"
          subtitle="Ponto de partida da necessidade institucional"
          width={800} height={P1_H}
        />
      </div>

      <div style={abs(qcl(c.p2a, 200), P2A_Y)} className="z-[1] relative">
        <QBox text="Quem executa o projeto de P&D?" width={200} height={P2_H} bg={FAM_A} />
      </div>
      <div style={abs(qcl(c.p2b, 240), P2B_Y)} className="z-[1] relative">
        <QBox text="A solução já existe no mercado?" width={240} height={P2_H} bg={FAM_B} />
      </div>
      <div style={abs(qcl(c.p2c, 200), P2C_Y)} className="z-[1] relative">
        <QBox text="O que quer descobrir/mapear?" width={200} height={P2_H} bg={FAM_C} />
      </div>

      <div style={abs(cl(c.convenio), A_L3)} className="z-[1] relative">
        <Card data={INSTRUMENTS.convenio} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.acordo), A_L3)} className="z-[1] relative">
        <Card data={INSTRUMENTS.acordo} onInstrumentClick={onInstrumentClick} />
      </div>

      <div style={abs(cl(c.licitacao), B_L3)} className="z-[1] relative">
        <Card data={INSTRUMENTS.licitacao} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(qcl(c.p3risco, 180), B_L3)} className="z-[1] relative">
        <QBox text="Qual o grau de risco técnico e maturidade?" width={180} height={QBOX_H} bg={FAM_B} />
      </div>
      <div style={abs(cl(c.etec), B_L4)} className="z-[1] relative">
        <Card data={INSTRUMENTS.etec} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.cpsi), B_L4)} className="z-[1] relative">
        <Card data={INSTRUMENTS.cpsi} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(qcl(c.p4b, 160), B_L4)} className="z-[1] relative">
        <QBox text="Qual o caso especial?" width={160} height={QBOX_H} bg={FAM_B} />
      </div>
      <div style={abs(cl(c.direta), B_L5)} className="z-[1] relative">
        <Card data={INSTRUMENTS.direta} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.doacao), B_L5)} className="z-[1] relative">
        <Card data={INSTRUMENTS.doacao} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.transferencia), B_L5)} className="z-[1] relative">
        <Card data={INSTRUMENTS.transferencia} onInstrumentClick={onInstrumentClick} />
      </div>

      <div style={abs(cl(c.pmi), C_L3)} className="z-[1] relative">
        <Card data={INSTRUMENTS.pmi} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.dialogo), C_L3)} className="z-[1] relative">
        <Card data={INSTRUMENTS.dialogo} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(qcl(c.p3c, 160), C_L3)} className="z-[1] relative">
        <QBox text="Qual formato de evento?" width={160} height={QBOX_H} bg={FAM_C} />
      </div>
      <div style={abs(cl(c.pitch), C_L4)} className="z-[1] relative">
        <Card data={INSTRUMENTS.pitch} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.hackathon), C_L4)} className="z-[1] relative">
        <Card data={INSTRUMENTS.hackathon} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.concurso), C_L4)} className="z-[1] relative">
        <Card data={INSTRUMENTS.concurso} onInstrumentClick={onInstrumentClick} />
      </div>
    </div>
  )
}
