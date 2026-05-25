import { InstrumentCard } from './InstrumentCard'

const BRAND = '#0e59a8'
const BRAND_BG = '#E3EFFF'
const FAM_A = '#6d28d9'
const FAM_B = '#0e7490'
const FAM_C = '#b45309'
const CARD_W = 130

// Coordenadas X (centro) de cada elemento nas colunas
const CX = {
  root: 720,
  p2a: 278, p2b: 720, p2c: 1000,
  p3a: 143, p3b: 403,
  p3c: 570, p3d: 870,
  pmi: 800, dialogo: 1000, p3e: 1180,
  convenio: 55, doacao: 200,
  acordo: 340, transferencia: 485,
  licitacao: 470, direta: 640,
  etec: 810, cpsi: 980,
  pitch: 1010, concurso: 1290,
}

// Coordenadas Y por nível de cada coluna
const EL1_Y = 95
const EL1_H = 65
const EBUS2_Y = 195 
const EL2_Y = 205
const EL2_H = 65
const EBUS3_Y = 310
const EL3_Y = 320

const CL1_Y = 340
const CL1_H = 65
const CBUS2_Y = 445
const CL2_Y = 455
const CL2_H = 65
const CBUS3_Y = 560
const CL3_Y = 570

const DL1_Y = 95
const DL1_H = 65
const DBUS2_Y = 195
const DL2_Y = 205
const DL2_H = 65
const DBUS3_Y = 350
const DL3_Y = 380

const CANVAS_H = 720

// Dados de cada instrumento — id referencia o modal de detalhes
export const INSTRUMENTS = {
  convenio: { id: 'convenio-pd&i', accentColor: '#209828', iconBg: 'rgba(32,152,40,0.15)', icon: '📋', title: 'Convênio', description: 'PD&I — com repasse' },
  doacao: { id: 'doacao-solucao', accentColor: '#209828', iconBg: 'rgba(32,152,40,0.15)', icon: '🎁', title: 'Doação', description: 'Inovadora art. 14-A' },
  acordo: { id: 'acordo-pd&i', accentColor: '#08ba9c', iconBg: 'rgba(8,186,156,0.15)', icon: '🤝', title: 'Acordo', description: 'PD&I — criar nova' },
  transferencia: { id: 'transferencia-tecnologia', accentColor: '#6a0ea8', iconBg: 'rgba(106,14,168,0.15)', icon: '🔄', title: 'Transfer.', description: 'Tecnológica art. 6º' },
  licitacao: { id: 'licitacao', accentColor: '#37474f', iconBg: 'rgba(55,71,79,0.15)', icon: '📑', title: 'Licitação', description: 'L. 14.133' },
  direta: { id: 'contratacao-direta', accentColor: '#dbaf00', iconBg: 'rgba(219,175,0,0.15)', icon: '📇', title: 'Contrat. Direta', description: 'arts. 72-75' },
  etec: { id: 'encomenda-tecnologica', accentColor: '#0e59a8', iconBg: 'rgba(14,89,168,0.15)', icon: '🖥️', title: 'ETEC', description: 'arts. 20-22' },
  cpsi: { id: 'contrato-publico', accentColor: '#c21d00', iconBg: 'rgba(194,29,0,0.15)', icon: '🏗️', title: 'CPSI', description: 'LC 182/21' },
  pmi: { id: 'pmi', accentColor: '#e65100', iconBg: 'rgba(230,81,0,0.15)', icon: '🔍', title: 'PMI', description: 'art. 26' },
  dialogo: { id: 'dialogo-competitivo', accentColor: '#006064', iconBg: 'rgba(0,96,100,0.15)', icon: '💬', title: 'Diálogo', description: 'Competitivo art. 32' },
  pitch: { id: 'pitch-hackton', accentColor: '#00A27F', iconBg: 'rgba(0,162,127,0.15)', icon: '💡', title: 'Pitch', description: 'Pitch / Hackathon' },
  concurso: { id: 'concurso-publico-inovacao', accentColor: '#880e4f', iconBg: 'rgba(136,14,79,0.15)', icon: '🏆', title: 'Concurso', description: 'Inovação art. 29' },
}

// Caixa de decisão exibida em cada ponto de bifurcação da árvore
function QBox({ text, subtitle, width = 160, height = 65, bg = BRAND, color = '#fff' }) {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-[8px]"
      style={{ width, height, background: bg, padding: '6px 12px' }}
    >
      <p className="m-0 text-center leading-snug" style={{ fontSize: 11, fontWeight: 600, color }}>
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

// Card de instrumento com handler de clique injetado pelo pai
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

// Atalho para style de posicionamento absoluto
function abs(left, top) {
  return { position: 'absolute', left, top }
}

// Label de texto SVG exibida sobre as linhas de conexão
function BranchLabel({ x, y, text, anchor = 'middle' }) {
  const PAD_X = 6
  const PAD_Y = 3
  const EST_W = text.length * 5.5 + PAD_X * 2
  const H = 16 + PAD_Y * 2
  const rx = anchor === 'middle' ? x - EST_W / 2 : anchor === 'end' ? x - EST_W : x
  return (
    <g>
      <rect
        x={rx} y={y - 12 - PAD_Y}
        width={EST_W} height={H}
        rx={4} ry={4}
        fill="white" stroke={BRAND} strokeWidth={1}
      />
      <text x={x} y={y}
        textAnchor={anchor}
        style={{ fontSize: 10, fontWeight: 500, fill: BRAND, fontFamily: 'inherit' }}>
        {text}
      </text>
    </g>
  )
}

// Converte coordenada X central para borda esquerda do card
const cl = (cx) => cx - CARD_W / 2

// Árvore de decisão que guia o usuário até o instrumento adequado.
// Posições controladas pelos objetos CX (horizontal) e constantes Y por coluna.
export function TrilhaFlowchartDecision({ onInstrumentClick, headerAction }) {
  const c = CX

  const EL1_BOT = EL1_Y + EL1_H
  const CL1_BOT = CL1_Y + CL1_H
  const DL1_BOT = DL1_Y + DL1_H
  const EL2_BOT = EL2_Y + EL2_H
  const CL2_BOT = CL2_Y + CL2_H
  const DL2_BOT = DL2_Y + DL2_H

  const ROOT_BOT = 75
  const BUS1_Y = ROOT_BOT + 10

  // Segmentos agrupados em array para renderização em dois passes:
  // primeiro todas as bordas, depois todos os fills — evita artefatos nas interseções.
  const segs = [
    `M${c.root},${ROOT_BOT} V${BUS1_Y}`,
    `M${c.p2a},${BUS1_Y} H${c.p2c}`,
    // coluna esquerda
    `M${c.p2a},${BUS1_Y} V${EL1_Y}`,
    `M${c.p2a},${EL1_BOT} V${EBUS2_Y}`,
    `M${c.p3a},${EBUS2_Y} H${c.p3b}`,
    `M${c.p3a},${EBUS2_Y} V${EL2_Y}`,
    `M${c.p3b},${EBUS2_Y} V${EL2_Y}`,
    `M${c.p3a},${EL2_BOT} V${EBUS3_Y}`,
    `M${c.p3b},${EL2_BOT} V${EBUS3_Y}`,
    `M${c.convenio},${EBUS3_Y} H${c.doacao}`,
    `M${c.convenio},${EBUS3_Y} V${EL3_Y}`,
    `M${c.doacao},${EBUS3_Y} V${EL3_Y}`,
    `M${c.acordo},${EBUS3_Y} H${c.transferencia}`,
    `M${c.acordo},${EBUS3_Y} V${EL3_Y}`,
    `M${c.transferencia},${EBUS3_Y} V${EL3_Y}`,
    // coluna centro
    `M${c.p2b},${BUS1_Y} V${CL1_Y}`,
    `M${c.p2b},${CL1_BOT} V${CBUS2_Y}`,
    `M${c.p3c},${CBUS2_Y} H${c.p3d}`,
    `M${c.p3c},${CBUS2_Y} V${CL2_Y}`,
    `M${c.p3d},${CBUS2_Y} V${CL2_Y}`,
    `M${c.p3c},${CL2_BOT} V${CBUS3_Y}`,
    `M${c.p3d},${CL2_BOT} V${CBUS3_Y}`,
    `M${c.licitacao},${CBUS3_Y} H${c.direta}`,
    `M${c.licitacao},${CBUS3_Y} V${CL3_Y}`,
    `M${c.direta},${CBUS3_Y} V${CL3_Y}`,
    `M${c.etec},${CBUS3_Y} H${c.cpsi}`,
    `M${c.etec},${CBUS3_Y} V${CL3_Y}`,
    `M${c.cpsi},${CBUS3_Y} V${CL3_Y}`,
    // coluna direita
    `M${c.p2c},${BUS1_Y} V${DL1_Y}`,
    `M${c.p2c},${DL1_BOT} V${DBUS2_Y}`,
    `M${c.pmi},${DBUS2_Y} H${c.p3e}`,
    `M${c.pmi},${DBUS2_Y} V${DL2_Y}`,
    `M${c.dialogo},${DBUS2_Y} V${DL2_Y}`,
    `M${c.p3e},${DBUS2_Y} V${DL2_Y}`,
    `M${c.p3e},${DL2_BOT} V${DBUS3_Y}`,
    `M${c.pitch},${DBUS3_Y} H${c.concurso}`,
    `M${c.pitch},${DBUS3_Y} V${DL3_Y}`,
    `M${c.concurso},${DBUS3_Y} V${DL3_Y}`,
  ]

  return (
    <div className="relative overflow-visible" style={{ width: 1440, height: CANVAS_H, transform: 'translateX(70px)' }}>

      {headerAction && (
        <div className="absolute z-[2]" style={{ right: 20, top: 20 }}>
          {headerAction}
        </div>
      )}

      <svg
        className="absolute inset-0 overflow-visible pointer-events-none z-0"
        width="1440" height={CANVAS_H}
        viewBox={`0 0 1440 ${CANVAS_H}`}
        fill="none"
        aria-hidden="true"
      >
        <g stroke={BRAND} strokeWidth="9" strokeLinecap="round" fill="none">
          {segs.map((d, i) => <path key={i} d={d} />)}
        </g>
        <g stroke={BRAND_BG} strokeWidth="5" strokeLinecap="round" fill="none">
          {segs.map((d, i) => <path key={i} d={d} />)}
        </g>

        <BranchLabel x={c.p2a} y={BUS1_Y - 14} text="Desenvolver algo novo" />
        <BranchLabel x={c.p2b} y={BUS1_Y - 14} text="Adquirir / contratar" />
        <BranchLabel x={c.p2c} y={BUS1_Y - 14} text="Explorar o mercado" />

        <BranchLabel x={c.p3a} y={EBUS2_Y - 14} text="Outra entidade" />
        <BranchLabel x={c.p3b} y={EBUS2_Y - 14} text="Executa junto" />

        <BranchLabel x={c.p3c} y={CBUS2_Y - 14} text="Sim" />
        <BranchLabel x={c.p3d} y={CBUS2_Y - 14} text="Não" />

        <BranchLabel x={c.pmi} y={DBUS2_Y - 14} text="Parceiro P&D" />
        <BranchLabel x={c.dialogo} y={DBUS2_Y - 14} text="Spec. técnica" />
        <BranchLabel x={c.p3e} y={DBUS2_Y - 14} text="Ideias abertas" />

        <BranchLabel x={c.convenio} y={EBUS3_Y - 14} text="Com repasse" />
        <BranchLabel x={c.doacao} y={EBUS3_Y - 14} text="Sem repasse" />
        <BranchLabel x={c.acordo} y={EBUS3_Y - 14} text="Criar nova" />
        <BranchLabel x={c.transferencia} y={EBUS3_Y - 14} text="Já existe" />

        <BranchLabel x={c.licitacao} y={CBUS3_Y - 14} text="Sim" />
        <BranchLabel x={c.direta} y={CBUS3_Y - 14} text="Não" />
        <BranchLabel x={c.etec} y={CBUS3_Y - 14} text="Alto risco" />
        <BranchLabel x={c.cpsi} y={CBUS3_Y - 14} text="Mod. risco" />

        <BranchLabel x={c.pitch} y={DBUS3_Y - 14} text="Sem prêmio" />
        <BranchLabel x={c.concurso} y={DBUS3_Y - 14} text="Com prêmio" />
      </svg>

      <div style={abs(530, -22)} className="z-[1] relative">
        <QBox
          text="O que a instituição precisa?"
          subtitle="Pergunta 1 — ponto de partida da necessidade"
          width={380} height={75}
        />
      </div>

      <div style={abs(183, EL1_Y)} className="z-[1] relative">
        <QBox text="Quem executa o projeto?" width={190} height={EL1_H} bg={FAM_A} />
      </div>
      <div style={abs(610, CL1_Y)} className="z-[1] relative">
        <QBox text="A solução já existe no mercado?" width={220} height={CL1_H} bg={FAM_B} />
      </div>
      <div style={abs(905, DL1_Y)} className="z-[1] relative">
        <QBox text="O que querem obter?" width={190} height={DL1_H} bg={FAM_C} />
      </div>

      <div style={abs(78, EL2_Y)} className="z-[1] relative">
        <QBox text={<>Há repasse<br />financeiro?</>} width={130} height={EL2_H} bg={FAM_A} />
      </div>
      <div style={abs(348, EL2_Y)} className="z-[1] relative">
        <QBox text={<>Criar nova ou<br />licenciar existente?</>} width={130} height={EL2_H} bg={FAM_A} />
      </div>

      <div style={abs(505, CL2_Y)} className="z-[1] relative">
        <QBox text={<>Há mais de um<br />fornecedor?</>} width={130} height={CL2_H} bg={FAM_B} />
      </div>
      <div style={abs(805, CL2_Y)} className="z-[1] relative">
        <QBox text={<>Qual o nível de<br />risco tecnológico?</>} width={130} height={CL2_H} bg={FAM_B} />
      </div>

      <div style={abs(cl(c.pmi), DL2_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.pmi} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.dialogo), DL2_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.dialogo} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(1115, DL2_Y)} className="z-[1] relative">
        <QBox text={<>Informal ou<br />com premiação?</>} width={130} height={DL2_H} bg={FAM_C} />
      </div>

      <div style={abs(cl(c.convenio), EL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.convenio} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.doacao), EL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.doacao} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.acordo), EL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.acordo} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.transferencia), EL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.transferencia} onInstrumentClick={onInstrumentClick} />
      </div>

      <div style={abs(cl(c.licitacao), CL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.licitacao} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.direta), CL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.direta} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.etec), CL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.etec} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.cpsi), CL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.cpsi} onInstrumentClick={onInstrumentClick} />
      </div>

      <div style={abs(cl(c.pitch), DL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.pitch} onInstrumentClick={onInstrumentClick} />
      </div>
      <div style={abs(cl(c.concurso), DL3_Y)} className="z-[1] relative">
        <Card data={INSTRUMENTS.concurso} onInstrumentClick={onInstrumentClick} />
      </div>
    </div>
  )
}
