import { useRef, useState, useEffect } from 'react'
import { SectionBadge } from '../SectionBadge'
import { TrilhaFlowchartDecision } from './TrilhaFlowchartDecision'

const FLOWCHART_W = 1440
const FLOWCHART_H = 620

export function ScaledFlowchartDecision({ onInstrumentClick, headerAction }) {
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
        {headerAction && <div className="mt-2 shrink-0">{headerAction}</div>}
      </div>

      <div
        ref={containerRef}
        className="w-full [overflow:clip] mt-4"
        style={{ height: FLOWCHART_H * scale }}
      >
        <div
          style={{
            width: FLOWCHART_W,
            transformOrigin: 'top left',
            transform: `translateX(${offset}px) scale(${scale})`,
          }}
        >
          <TrilhaFlowchartDecision onInstrumentClick={onInstrumentClick} />
        </div>
      </div>
    </div>
  )
}
