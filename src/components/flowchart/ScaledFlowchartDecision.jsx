import { useRef, useState, useEffect } from 'react'
import { SectionBadge } from '../SectionBadge'
import { TrilhaFlowchartDecision, INSTRUMENTS } from './TrilhaFlowchartDecision'

const FLOWCHART_W = 1440
const FLOWCHART_H = 690

const FAMILIES = [
  {
    id: 'A',
    name: 'Família A — Parceria e P&D',
    color: '#6d28d9',
    border: 'rgba(109,40,217,0.25)',
    bg: '#f5f3ff',
    keys: ['convenio', 'acordo', 'doacao', 'transferencia'],
  },
  {
    id: 'B',
    name: 'Família B — Contratação pública',
    color: '#0e7490',
    border: 'rgba(14,116,144,0.25)',
    bg: '#ecfeff',
    keys: ['licitacao', 'direta', 'etec', 'cpsi'],
  },
  {
    id: 'C',
    name: 'Família C — Exploração',
    color: '#b45309',
    border: 'rgba(180,83,9,0.25)',
    bg: '#fef3c7',
    keys: ['pmi', 'dialogo', 'pitch', 'concurso'],
  },
]

export function ScaledFlowchartDecision({ onInstrumentClick }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState(0)
  const [openFamilies, setOpenFamilies] = useState(new Set())

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

  const toggle = (id) => {
    setOpenFamilies(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

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
        className="w-full [overflow:clip] mt-[61px]"
        style={{ height: FLOWCHART_H * scale + 55 }}
      >
        <div
          style={{
            width: FLOWCHART_W,
            transformOrigin: 'top left',
            transform: `translateX(${offset}px) translateY(55px) scale(${scale})`,
          }}
        >
          <TrilhaFlowchartDecision onInstrumentClick={onInstrumentClick} />
        </div>
      </div>

      <div className="px-[clamp(20px,5vw,66px)] pt-6 pb-8 flex flex-col gap-3">
        <p className="m-0 mb-1 text-sm font-medium text-ink-mid">
          Resumo por família — os 12 instrumentos
        </p>
        {FAMILIES.map(family => {
          const isOpen = openFamilies.has(family.id)
          return (
            <div
              key={family.id}
              className="rounded-xl overflow-hidden"
              style={{ border: `1.5px solid ${family.border}` }}
            >
              <button
                onClick={() => toggle(family.id)}
                className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors duration-150"
                style={{ background: family.bg }}
              >
                <span className="font-semibold text-sm" style={{ color: family.color }}>
                  {family.name}
                </span>
                <svg
                  width="18" height="18" viewBox="0 0 18 18" fill="none"
                  style={{
                    color: family.color,
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <path d="M4 6.5L9 11.5L14 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOpen && (
                <div className="flex flex-wrap gap-2 px-5 py-4 bg-white">
                  {family.keys.map(key => {
                    const inst = INSTRUMENTS[key]
                    return (
                      <button
                        key={key}
                        onClick={() => onInstrumentClick(inst.id)}
                        className="text-sm leading-snug transition-opacity duration-100 hover:opacity-70"
                        style={{ color: inst.accentColor, fontWeight: 500 }}
                      >
                        {inst.title} — {inst.description}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
