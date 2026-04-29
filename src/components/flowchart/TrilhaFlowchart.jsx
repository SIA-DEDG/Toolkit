import { Fragment } from 'react'
import { InstrumentCard } from './InstrumentCard'

// ─── Layout constants ──────────────────────────────────────────────────────────
const PAD_X    = 30
const PAD_Y    = 20
const CARD_W   = 150
const CARD_H   = 150   // fixed — all cards identical size
const Q_W      = 150
const Q_H      = 50
const Q_GAP    = 4     // gap between Q box and adjacent cards
const STEP_GAP = 16    // horizontal gap between columns
const BRAND    = '#0e59a8'

// Vertical positions (absolute, shared by all steps)
//   PAD_Y ─── card-above top
//          ── card-above bottom  (PAD_Y + CARD_H)
//   Q_GAP gap
//   Q_Y  ─── Q-box top
//          ── Q-box bottom  (Q_Y + Q_H)
//   Q_GAP gap
//   BELOW_Y ─ card-below top
//           ─ card-below bottom  (BELOW_Y + CARD_H)
//   PAD_Y
const Q_Y     = PAD_Y + CARD_H + Q_GAP        // 20 + 150 + 4 = 174
const BELOW_Y = Q_Y + Q_H + Q_GAP             // 174 + 50 + 4 = 228

// Horizontal positions — 6×(150+16) - 16 + 60 = 1040
const stepX = i => PAD_X + i * (CARD_W + STEP_GAP)

// Canvas dimensions
//   Width:  30 + 6×166 - 16 + 30 = 1040
//   Height: 20 + 150 + 4 + 50 + 4 + 150 + 20 = 398
export const FLOWCHART_W = 1040
export const FLOWCHART_H = 400

// ─── Step data ─────────────────────────────────────────────────────────────────
// cardAbove: rendered ABOVE the question box (step 1 only)
// card:      rendered BELOW the question box (all steps)
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
    card: {
      id: 'contratacao-direta',
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
]

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


      {/* ── Per-step: Q box + cards ── */}
      {STEPS.map((step, i) => (
        <Fragment key={i}>
          {/* Card ABOVE Q box (step 1: Acordo / NÃO) */}
          {step.cardAbove && (
            <div style={{ position: 'absolute', left: stepX(i), top: PAD_Y }}>
              <Card data={step.cardAbove} onInstrumentClick={onInstrumentClick} />
            </div>
          )}

          {/* Question box */}
          <div style={{ position: 'absolute', left: stepX(i), top: Q_Y }}>
            <QuestionBox text={step.question} />
          </div>

          {/* Card BELOW Q box */}
          {step.card && (
            <div style={{ position: 'absolute', left: stepX(i), top: BELOW_Y }}>
              <Card data={step.card} onInstrumentClick={onInstrumentClick} />
            </div>
          )}
        </Fragment>
      ))}
    </div>
  )
}
