import { InstrumentCard } from './InstrumentCard'
import { SectionBadge } from '../SectionBadge'

const BRAND = '#0e59a8'
const BRAND_BG = '#E3EFFF'
const LINE_W = 1.5
const CARD_W = 110
const BUS1_Y = 132   // horizontal bus root→L1
const L1_Y   = 148   // top of level-1 question boxes
const L1_H   = 65
const BUS2_Y = 268   // horizontal bus L1→L2
const L2_Y   = 284   // top of level-2 elements
const L2_H   = 62    // height of level-2 question boxes
const BUS3_Y = 420   // horizontal bus Q2→L3
const L3_Y   = 440   // top of level-3 cards
const BUS4_Y = 460   // bus abaixo de convênio/acordo
const L4_Y   = 476   // top dos cards doação/transferência
const L4_H   = 62

// center-x positions
const CX = {
  root:     650,
  l1Left:   165,
  l1Center: 650,
  l1Right:  1135,
  // L2 left branch
  convenio:  93,
  acordo:   239,
  // L2 center branch
  licitacao: 498,
  q2Center:  741,
  // L2 right branch
  pmi:      1005,
  dialogo:  1135,
  q2Right:  1291,
  // L3 center branch
  etec:  615,
  cpsi:  741,
  contratDireta: 867,
  // L3 right branch
  pitch:    1231,
  concurso: 1351,
  // L4 left branch (below convênio/acordo)
  doacao:    93,
  transferencia: 239,
}

const INSTRUMENTS = {
  convenio: {
    id: 'convenio-pd&i', accentColor: '#209828', iconBg: 'rgba(32,152,40,0.15)',
    icon: '📋', title: 'Convênio', description: 'Com repasse financeiro',
  },
  acordo: {
    id: 'acordo-pd&i', accentColor: '#08ba9c', iconBg: 'rgba(8,186,156,0.15)',
    icon: '🤝', title: 'Acordo', description: 'Sem repasse financeiro',
  },
  licitacao: {
    id: 'licitacao', accentColor: '#37474f', iconBg: 'rgba(55,71,79,0.15)',
    icon: '📑', title: 'Licitação', description: 'Processo licitatório',
  },
  etec: {
    id: 'encomenda-tecnologica', accentColor: '#0e59a8', iconBg: 'rgba(14,89,168,0.15)',
    icon: '🖥️', title: 'ETEC', description: 'Encomenda arts. 20-22',
  },
  cpsi: {
    id: 'contrato-publico', accentColor: '#c21d00', iconBg: 'rgba(194,29,0,0.15)',
    icon: '🏗️', title: 'CPSI', description: 'Por fases arts. 49-51',
  },
  contratDireta: {
    id: 'contratacao-direta', accentColor: '#dbaf00', iconBg: 'rgba(219,175,0,0.15)',
    icon: '📇', title: 'Contrat. Direta', description: 'Dispensa / Inexigibilidade',
  },
  pmi: {
    id: 'pmi', accentColor: '#e65100', iconBg: 'rgba(230,81,0,0.15)',
    icon: '🔍', title: 'PMI', description: 'Manifest. art. 26',
  },
  dialogo: {
    id: 'dialogo-competitivo', accentColor: '#006064', iconBg: 'rgba(0,96,100,0.15)',
    icon: '💬', title: 'Diálogo', description: 'Competit. art. 32',
  },
  pitch: {
    id: 'pitch-hackton', accentColor: '#00A27F', iconBg: 'rgba(0,162,127,0.15)',
    icon: '💡', title: 'Pitch', description: 'Ideias rápidas',
  },
  concurso: {
    id: 'concurso-publico-inovacao', accentColor: '#880e4f', iconBg: 'rgba(136,14,79,0.15)',
    icon: '🏆', title: 'Concurso', description: 'Concurso formal',
  },
  doacao: {
    id: 'doacao-solucao', accentColor: '#209828', iconBg: 'rgba(32,152,40,0.15)',
    icon: '🎁', title: 'Doação', description: 'Solução Inovadora art. 14-A',
  },
  transferencia: {
    id: 'transferencia-tecnologia', accentColor: '#08ba9c', iconBg: 'rgba(8,186,156,0.15)',
    icon: '🔄', title: 'Transfer.', description: 'Tecnologia art. 6º/37',
  },
}

function QBox({ text, subtitle, width = 160, height = L1_H, bg = BRAND, color = '#fff', border }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[8px]"
      style={{
        width, height, background: bg, padding: '6px 12px',
        border: border ? `2px dashed ${BRAND}` : undefined,
      }}
    >
      <p className="m-0 text-center leading-snug" style={{ fontSize: 12, fontWeight: 600, color }}>
        {text}
      </p>
      {subtitle && (
        <p className="m-0 text-center leading-snug mt-1" style={{ fontSize: 9, fontWeight: 400, color: 'rgba(255,255,255,0.75)' }}>
          {subtitle}
        </p>
      )}
    </div>
  )
}

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

function abs(left, top) {
  return { position: 'absolute', left, top }
}

// Label floated just above a bus junction
function BranchLabel({ x, y, text, anchor = 'middle' }) {
  return (
    <text
      x={x} y={y}
      textAnchor={anchor}
      style={{ fontSize: 10, fontWeight: 500, fill: BRAND, fontFamily: 'inherit' }}
    >
      {text}
    </text>
  )
}

export function TrilhaFlowchartDecision({ onInstrumentClick, headerAction }) {
  const cx = CX

  // helpers for card left-edge from center-x
  const cl = (centerX) => centerX - CARD_W / 2

  return (
    <div className="relative overflow-visible" style={{ width: 1440, height: 650 }}>

      {headerAction && (
        <div className="absolute z-[2]" style={{ right: 20, top: 20 }}>
          {headerAction}
        </div>
      )}

      {/* ── SVG lines ── */}
      <svg
        className="absolute inset-0 overflow-visible pointer-events-none z-0"
        width="1440" height="650"
        viewBox="0 0 1440 650"
        fill="none"
        aria-hidden="true"
      >


        {/* ── helper: cada "trilha" = path grosso azul + path fino claro por cima ── */}

        {/* ── Root → Level-1 bus ── */}
        <path d={`M${cx.root},95 L${cx.root},${BUS1_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.root},95 L${cx.root},${BUS1_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.l1Left},${BUS1_Y} L${cx.l1Right},${BUS1_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.l1Left},${BUS1_Y} L${cx.l1Right},${BUS1_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.l1Left},${BUS1_Y} L${cx.l1Left},${L1_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.l1Left},${BUS1_Y} L${cx.l1Left},${L1_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.l1Center},${BUS1_Y} L${cx.l1Center},${L1_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.l1Center},${BUS1_Y} L${cx.l1Center},${L1_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.l1Right},${BUS1_Y} L${cx.l1Right},${L1_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.l1Right},${BUS1_Y} L${cx.l1Right},${L1_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        {/* ── L1-Left → Level-2 (Convênio / Acordo) ── */}
        <path d={`M${cx.l1Left},${L1_Y + L1_H} L${cx.l1Left},${BUS2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.l1Left},${L1_Y + L1_H} L${cx.l1Left},${BUS2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.convenio},${BUS2_Y} L${cx.acordo},${BUS2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.convenio},${BUS2_Y} L${cx.acordo},${BUS2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.convenio},${BUS2_Y} L${cx.convenio},${L2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.convenio},${BUS2_Y} L${cx.convenio},${L2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.acordo},${BUS2_Y} L${cx.acordo},${L2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.acordo},${BUS2_Y} L${cx.acordo},${L2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        {/* ── Convênio → Doação / Acordo → Transferência ── */}
        <path d={`M${cx.convenio},${L2_Y + 120} L${cx.convenio},${L4_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.convenio},${L2_Y + 120} L${cx.convenio},${L4_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.acordo},${L2_Y + 120} L${cx.acordo},${L4_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.acordo},${L2_Y + 120} L${cx.acordo},${L4_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        {/* ── L1-Center → Level-2 (Licitação / Q2-Center) ── */}
        <path d={`M${cx.l1Center},${L1_Y + L1_H} L${cx.l1Center},${BUS2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.l1Center},${L1_Y + L1_H} L${cx.l1Center},${BUS2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.licitacao},${BUS2_Y} L${cx.q2Center},${BUS2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.licitacao},${BUS2_Y} L${cx.q2Center},${BUS2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.licitacao},${BUS2_Y} L${cx.licitacao},${L2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.licitacao},${BUS2_Y} L${cx.licitacao},${L2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.q2Center},${BUS2_Y} L${cx.q2Center},${L2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.q2Center},${BUS2_Y} L${cx.q2Center},${L2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        {/* ── L1-Right → Level-2 (PMI / Diálogo / Q2-Right) ── */}
        <path d={`M${cx.l1Right},${L1_Y + L1_H} L${cx.l1Right},${BUS2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.l1Right},${L1_Y + L1_H} L${cx.l1Right},${BUS2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.pmi},${BUS2_Y} L${cx.q2Right},${BUS2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.pmi},${BUS2_Y} L${cx.q2Right},${BUS2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.pmi},${BUS2_Y} L${cx.pmi},${L2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.pmi},${BUS2_Y} L${cx.pmi},${L2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.dialogo},${BUS2_Y} L${cx.dialogo},${L2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.dialogo},${BUS2_Y} L${cx.dialogo},${L2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.q2Right},${BUS2_Y} L${cx.q2Right},${L2_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.q2Right},${BUS2_Y} L${cx.q2Right},${L2_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        {/* ── Q2-Center → Level-3 (ETEC / CPSI / Contrat.Direta) ── */}
        <path d={`M${cx.q2Center},${L2_Y + L2_H} L${cx.q2Center},${BUS3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.q2Center},${L2_Y + L2_H} L${cx.q2Center},${BUS3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.etec},${BUS3_Y} L${cx.contratDireta},${BUS3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.etec},${BUS3_Y} L${cx.contratDireta},${BUS3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.etec},${BUS3_Y} L${cx.etec},${L3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.etec},${BUS3_Y} L${cx.etec},${L3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.cpsi},${BUS3_Y} L${cx.cpsi},${L3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.cpsi},${BUS3_Y} L${cx.cpsi},${L3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.contratDireta},${BUS3_Y} L${cx.contratDireta},${L3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.contratDireta},${BUS3_Y} L${cx.contratDireta},${L3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        {/* ── Q2-Right → Level-3 (Pitch / Concurso) ── */}
        <path d={`M${cx.q2Right},${L2_Y + L2_H} L${cx.q2Right},${BUS3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.q2Right},${L2_Y + L2_H} L${cx.q2Right},${BUS3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.pitch},${BUS3_Y} L${cx.concurso},${BUS3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${cx.pitch},${BUS3_Y} L${cx.concurso},${BUS3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.pitch},${BUS3_Y} L${cx.pitch},${L3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.pitch},${BUS3_Y} L${cx.pitch},${L3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        <path d={`M${cx.concurso},${BUS3_Y} L${cx.concurso},${L3_Y}`} stroke={BRAND} strokeWidth="9" strokeLinecap="round" markerEnd="url(#arr)" />
        <path d={`M${cx.concurso},${BUS3_Y} L${cx.concurso},${L3_Y}`} stroke={BRAND_BG} strokeWidth="8" strokeLinecap="round" />

        {/* ── Branch labels from root ── */}
        <BranchLabel x={cx.l1Left}   y={BUS1_Y - 10} text="Desenvolver algo novo" />
        <BranchLabel x={cx.l1Center} y={BUS1_Y - 10} text="Adquirir ou contratar" />
        <BranchLabel x={cx.l1Right}  y={BUS1_Y - 10} text="Explorar o mercado" />

        {/* ── Answer labels L1-Left ── */}
        <BranchLabel x={cx.convenio - 4} y={BUS2_Y - 10} text="Outra entrada" anchor="end" />
        <BranchLabel x={cx.acordo   + 4} y={BUS2_Y - 10} text="Juntos" anchor="start" />

        {/* ── Answer labels L1-Center ── */}
        <BranchLabel x={cx.licitacao - 4} y={BUS2_Y - 10} text="Sim" anchor="end" />
        <BranchLabel x={cx.q2Center  + 4} y={BUS2_Y - 10} text="Não" anchor="start" />

        {/* ── Answer labels L1-Right ── */}
        <BranchLabel x={cx.pmi      - 4} y={BUS2_Y - 10} text="Parceiro P&D" anchor="end" />
        <BranchLabel x={cx.dialogo}      y={BUS2_Y - 10} text="Sol. técnica" anchor="middle" />
        <BranchLabel x={cx.q2Right  + 4} y={BUS2_Y - 10} text="Ideias abertas" anchor="start" />

        {/* ── Answer labels Q2-Center ── */}
        <BranchLabel x={cx.etec         - 4} y={BUS3_Y - 10} text="Alto risco" anchor="end" />
        <BranchLabel x={cx.cpsi}             y={BUS3_Y - 10} text="Mod. risco" anchor="middle" />
        <BranchLabel x={cx.contratDireta + 4} y={BUS3_Y - 10} text="Direto" anchor="start" />

        {/* ── Answer labels Q2-Right ── */}
        <BranchLabel x={cx.pitch    - 4} y={BUS3_Y - 10} text="Pitch/Hack" anchor="end" />
        <BranchLabel x={cx.concurso + 4} y={BUS3_Y - 10} text="Concurso formal" anchor="start" />
      </svg>

      {/* ── Root question ── */}
      <div style={abs(465, 20)} className="z-[1] relative">
        <QBox
          text="O que a instituição precisa?"
          subtitle="Pergunta 1 — ponto de partida da necessidade"
          width={380} height={75}
        />
      </div>

      {/* ── Level-1 questions ── */}
      <div style={abs(87, L1_Y)} className="z-[1] relative">
        <QBox text="Quem executa o projeto?" width={156} height={L1_H} />
      </div>
      <div style={abs(550, L1_Y)} className="z-[1] relative">
        <QBox text="A solução já existe no mercado?" width={200} height={L1_H} />
      </div>
      <div style={abs(1059, L1_Y)} className="z-[1] relative">
        <QBox text="O que quer descobrir?" width={152} height={L1_H} />
      </div>

      {/* ── Level-2: Left branch cards ── */}
      <div style={abs(cl(cx.convenio), L2_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.convenio} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(cx.acordo), L2_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.acordo} onInstrumentClick={onInstrumentClick} />
      </div>

      {/* ── Level-2: Center branch ── */}
      <div style={abs(cl(cx.licitacao), L2_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.licitacao} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cx.q2Center - 82, L2_Y)} className="z-[1] relative">
        <QBox text="Qual o risco tecnológico?" width={164} height={L2_H} />
      </div>

      {/* ── Level-2: Right branch ── */}
      <div style={abs(cl(cx.pmi), L2_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.pmi} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(cx.dialogo), L2_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.dialogo} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cx.q2Right - 68, L2_Y)} className="z-[1] relative">
        <QBox text="Qual formato?" width={136} height={L2_H} />
      </div>

      {/* ── Level-3: Center branch ── */}
      <div style={abs(cl(cx.etec), L3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.etec} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(cx.cpsi), L3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.cpsi} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(cx.contratDireta), L3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.contratDireta} onInstrumentClick={onInstrumentClick} />
      </div>

      {/* ── Level-3: Right branch ── */}
      <div style={abs(cl(cx.pitch), L3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.pitch} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(cx.concurso), L3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.concurso} onInstrumentClick={onInstrumentClick} />
      </div>

      {/* ── Level-4: Doação / Transferência (abaixo de Convênio e Acordo) ── */}
      <div style={abs(cl(cx.doacao), L4_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.doacao} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(cx.transferencia), L4_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.transferencia} onInstrumentClick={onInstrumentClick} />
      </div>

      {/* ── Footnote ── */}
      <div
        className="absolute z-[1] flex flex-col gap-1"
        style={{ left: 30, top: L3_Y + 20 }}
      >
      </div>
    </div>
  )
}