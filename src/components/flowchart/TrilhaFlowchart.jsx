import { Fragment } from 'react'
import { InstrumentCard } from './InstrumentCard'

const PAD_X = 0
const PAD_Y = 20
const CARD_W = 170
const CARD_H = 150
const Q_W = 170
const Q_H = 60
const Q_GAP = 15
const STEP_GAP = 16
const BRAND = '#0e59a8'

const Q_Y = PAD_Y + CARD_H + Q_GAP
const BELOW_Y = Q_Y + Q_H + Q_GAP

const stepX = i => PAD_X + i * (CARD_W + STEP_GAP)

const ROW_H = PAD_Y + CARD_H + Q_GAP + Q_H + Q_GAP + CARD_H + PAD_Y  // 430
const ROW_GAP = 0
const ROW1_W = 5 * (CARD_W + STEP_GAP) - STEP_GAP  // 914
const ROW1_OFFSET_X = (6 * (CARD_W + STEP_GAP) - STEP_GAP - ROW1_W) / 2  // 93

export const FLOWCHART_W = 6 * (CARD_W + STEP_GAP) - STEP_GAP  // 1100
export const FLOWCHART_H = ROW_H * 2 + ROW_GAP                   // 870

const STEPS = [
  {
    question: 'Haverá repasse de recursos públicos?',
    cardAbove: {
      id: 'acordo-pd&i', badge: 'nao',
      accentColor: '#08ba9c', iconBg: 'rgba(8,186,156,0.15)',
      icon: '🤝', title: 'Acordo', description: 'Sem repasse financeiro',
    },
    card: {
      id: 'convenio-pd&i', badge: 'sim',
      accentColor: '#209828', iconBg: 'rgba(32,152,40,0.15)',
      icon: '📋', title: 'Convênio', description: 'Com repasse financeiro',
    },
  },
  {
    question: 'Existe risco tecnológico?',
    card: {
      id: 'encomenda-tecnologica',
      accentColor: '#0e59a8', iconBg: 'rgba(14,89,168,0.15)',
      icon: '🖥️', title: 'Encomenda Tecnológica', description: 'Lei nº 10.973/2004',
    },
  },
  {
    question: 'Permite contratação direta?',
    cardAbove: {
      id: 'licitacao',
      badge: 'nao',
      accentColor: '#37474f', iconBg: 'rgba(55,71,79,0.15)',
      icon: '📑', title: 'Licitação', description: 'Processo licitatório',
    },
    card: {
      id: 'contratacao-direta',
      badge: 'sim',
      accentColor: '#dbaf00', iconBg: 'rgba(219,175,0,0.15)',
      icon: '📇', title: 'Contratação Direta', description: 'Dispensa / Inexigibilidade',
    },
  },
  {
    question: 'Transferência tecnológica não patenteada?',
    card: {
      id: 'contrato-transferencia-tecnologia',
      accentColor: '#6a0ea8', iconBg: 'rgba(106,14,168,0.15)',
      icon: '🔄', title: 'Transferência Tecnológica', description: 'Know-how interno',
    },
  },
  {
    question: 'Envolve inovação aberta?',
    card: {
      id: 'pitch-hackton',
      accentColor: '#00A27F', iconBg: 'rgba(0,162,127,0.15)',
      icon: '💡', title: 'Pitches e Hackatons', description: 'Pitches, hackatons e afins',
    },
  },
  {
    question: 'Contratar solução inovadora?',
    card: {
      id: 'contrato-publico',
      accentColor: '#c21d00', iconBg: 'rgba(194,29,0,0.15)',
      icon: '🏗️', title: 'CPSI', description: 'Contrato Público para Solução Inovadora',
    },
  },
  {
    question: 'Deseja consultar o mercado antes de definir o objeto?',
    card: {
      id: 'pmi',
      accentColor: '#e65100', iconBg: 'rgba(230,81,0,0.15)',
      icon: '🔍', title: 'PMI', description: 'Procedimento de Manifestação de Interesse',
    },
  },
  {
    question: 'É possível definir as especificações técnicas ex ante?',
    card: {
      id: 'dialogo-competitivo',
      accentColor: '#006064', iconBg: 'rgba(0,96,100,0.15)',
      icon: '💬', title: 'Diálogo Competitivo', description: 'Definição de especificações',
    },
  },
  {
    question: 'Deseja selecionar por melhor técnica com premiação?',
    card: {
      id: 'concurso-publico-inovacao',
      accentColor: '#880e4f', iconBg: 'rgba(136,14,79,0.15)',
      icon: '🏆', title: 'Concurso Público de Inovação', description: 'Seleção por melhor técnica',
    },
  },
  {
    question: 'Existe recursos orçamentários para contratação?',
    card: {
      id: 'doacao-solucao-inovadora',
      accentColor: '#1b5e20', iconBg: 'rgba(27,94,32,0.15)',
      icon: '🎁', title: 'Doação de Solução Inovadora', description: 'Oferta gratuita de solução',
    },
  },
]

const STEPS_ROW1 = STEPS.slice(0, 5)   // Acordo/Convênio → Pitches
const STEPS_ROW2 = STEPS.slice(5)      // CPSI → Licitação

// ─── Sub-components ────────────────────────────────────────────────────────────

function QuestionBox({ text }) {
  return (
    <div
      className="flex items-center justify-center rounded-[5px]"
      style={{ width: Q_W, height: Q_H, background: BRAND, padding: '6px 12px' }}
    >
      <p className="m-0 text-center leading-snug"
        style={{ fontSize: 12, fontWeight: 500, color: '#fff' }}>
        {text}
      </p>
    </div>
  )
}

function Card({ data, onInstrumentClick }) {
  if (!data) return null
  return (
    <InstrumentCard
      accentColor={data.accentColor}
      iconBg={data.iconBg}
      icon={data.icon}
      title={data.title}
      description={data.description}
      badge={data.badge}
      width={CARD_W}
      height={CARD_H}
      onClick={() => onInstrumentClick(data.id)}
    />
  )
}

// ─── Main export ───────────────────────────────────────────────────────────────
export function TrilhaFlowchart({ onInstrumentClick }) {
  return (
    <div style={{ position: 'relative', width: FLOWCHART_W, height: FLOWCHART_H }}>

      {STEPS_ROW1.map((step, i) => {
        const x = stepX(i) + ROW1_OFFSET_X
        return (
          <Fragment key={`r1-${i}`}>
            {step.cardAbove && (
              <div style={{ position: 'absolute', left: x, top: PAD_Y }}>
                <Card data={step.cardAbove} onInstrumentClick={onInstrumentClick} />
              </div>
            )}
            <div style={{ position: 'absolute', left: x, top: Q_Y }}>
              <QuestionBox text={step.question} />
            </div>
            {step.card && (
              <div style={{ position: 'absolute', left: x, top: BELOW_Y }}>
                <Card data={step.card} onInstrumentClick={onInstrumentClick} />
              </div>
            )}
          </Fragment>
        )
      })}

      {/* ── Row 2 (6 steps) ── */}
      {STEPS_ROW2.map((step, i) => {
        const r2 = 250
        return (
          <Fragment key={`r2-${i}`}>
            {step.cardAbove && (
              <div style={{ position: 'absolute', left: stepX(i), top: r2 + PAD_Y }}>
                <Card data={step.cardAbove} onInstrumentClick={onInstrumentClick} />
              </div>
            )}
            <div style={{ position: 'absolute', left: stepX(i), top: r2 + Q_Y }}>
              <QuestionBox text={step.question} />
            </div>
            {step.card && (
              <div style={{ position: 'absolute', left: stepX(i), top: r2 + BELOW_Y }}>
                <Card data={step.card} onInstrumentClick={onInstrumentClick} />
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
