import { ChevronUp, ChevronDown } from 'lucide-react'
import { useCallback } from 'react'
import { StepItem } from './StepItem'
import DownloadButton from './DownloadButton'

// Card expansível com header colorido, lista de passos e botão de download
export function InstrumentFlowCard({ accentColor, icon, title, subtitle, cards, id, openIds, onToggle, downloadKey }) {
  const isOpen = openIds.has(id)

  const handleToggle = useCallback(() => onToggle(id), [id, onToggle])

  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col min-w-0">
      <div className='h-[10px]' style={{ backgroundColor: accentColor }}></div>
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`flow-${id}`}
        className="w-full text-left border-none cursor-pointer px-3.5 py-3 min-h-[80px]"
      >
        <div className="flex items-start gap-2.5">
          <div className="bg-white/25 p-1.5 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentColor }}>
            {typeof icon === 'string'
              ? <span className="text-[18px] leading-none" aria-hidden="true">{icon}</span>
              : (() => { const Icon = icon; return <Icon className="w-[18px] h-[18px] text-white" aria-hidden="true" /> })()
            }
          </div>
          <div className="flex-1 min-w-0 min-h-[10px]">
            <p className="font-bold text-[13px] text-black m-0 leading-snug">{title}</p>
            <p className="font-normal text-[10px] text-black/80 m-0 leading-snug">{subtitle}</p>
          </div>
          <div className="bg-white/20 rounded-md px-1.5 py-0.5 flex items-center justify-center shrink-0 mt-0.5">
            {isOpen
              ? <ChevronUp className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              : <ChevronDown className="w-3.5 h-3.5 text-white" aria-hidden="true" />
            }
          </div>
        </div>
      </button>

      {isOpen && (
        <div id={`flow-${id}`}>
          {cards.map((card, i) => (
            <StepItem key={i} card={card} accentColor={accentColor} isLast={i === cards.length - 1} />
          ))}
        </div>
      )}

      <div className="px-3.5 py-2.5" style={{ background: '#ffffff' }}>
        <DownloadButton fileKey={downloadKey} label="Baixar Relatório" large color={accentColor} />
      </div>
    </div>
  )
}