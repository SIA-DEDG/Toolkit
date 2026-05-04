import { useRef, useState, useEffect } from 'react'
import { SectionBadge } from '../SectionBadge'
import { TrilhaFlowchart, FLOWCHART_W, FLOWCHART_H } from './TrilhaFlowchart'

export function ScaledFlowchart({ onInstrumentClick }) {
  const containerRef = useRef(null)
  const [scale, setScale]   = useState(1)
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
      {/* Title rendered outside the scaled canvas — stays readable at all sizes */}
      <div className="py-[clamp(20px,3vw,40px)] px-[clamp(20px,5vw,66px)] pb-0">
        <SectionBadge>Trilha de Instrumentos</SectionBadge>
        <h2 className="font-semibold text-[clamp(18px,2vw,24px)] text-ink-mid mt-3 mb-1">
          Trilha de Instrumentos
        </h2>
        <p className="font-normal text-sm text-ink-mid m-0">
        Responda as perguntas abaixo para descobrir quais instrumentos <br/> 
        de fomento são mais adequados para o seu caso.  
        </p>
      </div>

      {/* Scaled canvas */}
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
          <TrilhaFlowchart onInstrumentClick={onInstrumentClick} />
        </div>
      </div>
    </div>
  )
}
