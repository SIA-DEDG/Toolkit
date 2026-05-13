import { useRef, useState, useEffect } from 'react'
import { TrilhaFlowchartLegacy } from './TrilhaFlowchartLegacy'

const FLOWCHART_WIDTH  = 1440
const FLOWCHART_HEIGHT = 1200

export function ScaledFlowchartLegacy({ onInstrumentClick, headerAction }) {
  const containerRef = useRef(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return
      const w = containerRef.current.offsetWidth
      const s = Math.min(1, w / FLOWCHART_WIDTH)
      setScale(s)
      setOffset(Math.max(0, (w - FLOWCHART_WIDTH * s) / 2))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div ref={containerRef} className="w-full [overflow:clip]" style={{ height: FLOWCHART_HEIGHT * scale }}>
      <div style={{ width: FLOWCHART_WIDTH, transformOrigin: 'top left', transform: `translateX(${offset}px) scale(${scale})` }}>
        <TrilhaFlowchartLegacy onInstrumentClick={onInstrumentClick} headerAction={headerAction} />
      </div>
    </div>
  )
}
