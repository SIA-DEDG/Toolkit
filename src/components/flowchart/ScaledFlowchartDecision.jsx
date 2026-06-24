import { useRef, useState, useEffect } from 'react'
import { SectionBadge } from '../SectionBadge'
import { TrilhaFlowchartDecision, INSTRUMENTS } from './TrilhaFlowchartDecision'

const FLOWCHART_W = 1900
const FLOWCHART_H = 1100

const FAMILIES = [
  {
    id: 'A',
    name: 'Família A - Parceria e P&D',
    color: '#f5f3ff',
    border: 'rgba(109,40,217,0.25)',
    bg: '#6d28d9',
    keys: ['convenio', 'acordo', 'doacao', 'transferencia'],
  },
  {
    id: 'B',
    name: 'Família B - Contratação pública',
    color: '#ecfeff',
    border: 'rgba(14,116,144,0.25)',
    bg: '#0e7490',
    keys: ['licitacao', 'direta', 'etec', 'cpsi'],
  },
  {
    id: 'C',
    name: 'Família C - Exploração',
    color: '#fef3c7',
    border: 'rgba(180,83,9,0.25)',
    bg: '#b45309',
    keys: ['pmi', 'dialogo', 'pitch', 'hackathon', 'concurso'],
  },
]

// Wrapper responsivo que escala o fluxograma para caber na largura disponível e exibe o resumo por família
export function ScaledFlowchartDecision({ onInstrumentClick }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const s = Math.min(1, w / FLOWCHART_W)
      setScale(s)
      setOffset(Math.max(0, (w - FLOWCHART_W * s) / 2))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div className="w-full">
      <div className="py-[clamp(20px,3vw,40px)] px-[clamp(20px,5vw,66px)] pb-0 flex items-start justify-between gap-4">
        <div>
          <SectionBadge>Trilha de Instrumentos</SectionBadge>
          <h2 className="font-semibold text-[clamp(18px,2vw,24px)] text-ink-mid mt-3 mb-1">
            Trilha de Instrumentos
          </h2>
          <p className="font-normal text-sm text-ink-mid m-0">
            Siga as perguntas para identificar o instrumento mais adequado para a sua necessidade.
          </p>
        </div>
      </div>

      <div
        ref={containerRef}
        className="w-full [overflow:clip] mt-[20px]"
        style={{ height: FLOWCHART_H * scale + 10 }}
      >
        <div
          style={{
            width: FLOWCHART_W,
            transformOrigin: 'top left',
            transform: `translateX(${offset}px) translateY(10px) scale(${scale})`,
          }}
        >
          <TrilhaFlowchartDecision onInstrumentClick={onInstrumentClick} />
        </div>
      </div>

      <div className="px-[clamp(20px,5vw,66px)] pt-6 pb-8 flex flex-col gap-3">
        <p className="m-0 mb-1 text-sm font-medium text-ink-mid">
          Resumo por família - os 13 instrumentos
        </p>
        <div className="flex gap-3">
          {FAMILIES.map(family => (
            <div
              key={family.id}
              className="flex-1 rounded-xl overflow-hidden"
              style={{ border: `1.5px solid ${family.border}` }}
            >
              <div
                className="px-5 py-3"
                style={{ background: family.bg }}
              >
                <span className="font-semibold text-sm" style={{ color: family.color }}>
                  {family.name}
                </span>
              </div>
              <div className="flex flex-col gap-3 px-5 py-4 bg-white">
                {family.keys.map(key => {
                  const inst = INSTRUMENTS[key]
                  return (
                    <button
                      key={key}
                      onClick={() => onInstrumentClick(inst.id)}
                      className="text-sm leading-snug transition-opacity duration-100 hover:opacity-70 text-left"
                      style={{ color: inst.accentColor, fontWeight: 500 }}
                    >
                      {inst.title} - {inst.description}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
