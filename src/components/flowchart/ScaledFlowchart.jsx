import { useRef, useState, useEffect } from 'react'
import { TrilhaFlowchart } from './TrilhaFlowchart'

const FLOWCHART_WIDTH  = 1440
const FLOWCHART_HEIGHT = 920

export function ScaledFlowchart({ onInstrumentClick }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const s = Math.min(1, w / FLOWCHART_WIDTH)
      setScale(s)
      // Quando viewport > 1440px, centraliza o canvas; abaixo disso preenche todo o container
      setOffset(Math.max(0, (w - FLOWCHART_WIDTH * s) / 2))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div ref={containerRef} className="w-full [overflow:clip]" style={{ height: FLOWCHART_HEIGHT * scale }}>
      <div style={{ width: FLOWCHART_WIDTH, transformOrigin: 'top left', transform: `translateX(${offset}px) scale(${scale})` }}>
        <TrilhaFlowchart onInstrumentClick={onInstrumentClick} />
      </div>
    </div>
  )
}
