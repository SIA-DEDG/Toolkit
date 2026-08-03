import { ChevronUp, ChevronDown, TriangleAlert } from 'lucide-react'
import { useCallback } from 'react'
import { StepItem } from './StepItem'
import DownloadButton from './DownloadButton'

// Card expansível com header colorido, lista de passos e botão de download
export function InstrumentFlowCard({ accentColor, icon, title, subtitle, cards, id, openIds, onToggle, downloadKey, msg }) {
  const isOpen = openIds.has(id)
  const Icon = typeof icon === 'string' ? null : icon

  const handleToggle = useCallback(() => onToggle(id), [id, onToggle])

  return (
    <div className="bg-surface rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.12)] overflow-hidden flex flex-col min-w-0">
      <div className="h-[10px]" style={{ backgroundColor: accentColor }} />
      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`flow-${id}`}
        className="w-full text-left border-none cursor-pointer px-3.5 py-3 min-h-[80px]"
      >
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg flex items-center justify-center shrink-0" style={{ background: accentColor }}>
            {Icon
              ? <Icon className="w-[18px] h-[18px] text-white" aria-hidden="true" />
              : <span className="text-[18px] leading-none" aria-hidden="true">{icon}</span>
            }
          </div>
          <div className="flex-1 min-w-0 min-h-[10px]">
            <p className="font-bold text-[16px] text-ink-dark m-0 leading-snug">{title}</p>
            <p className="font-normal text-[14px] text-ink-sub m-0 leading-snug">{subtitle}</p>
          </div>
          <div className="rounded-md px-1.5 py-0.5 flex items-center justify-center shrink-0 mt-0.5" style={{ background: accentColor }}>
            {isOpen
              ? <ChevronUp className="w-4 h-4 text-white" aria-hidden="true" />
              : <ChevronDown className="w-4 h-4 text-white" aria-hidden="true" />
            }
          </div>
        </div>
      </button>

      {isOpen && (
        <div id={`flow-${id}`}>
          {cards.map((card, index) => (
            <StepItem 
            key={index} 
            card={card} 
            accentColor={accentColor} 
            isLast={index === cards.length - 1 } 
            msg={id === 'acordo-pd&i' ? 'Minutas sujeitas a correção no SEI' : 'Documento sendo validado pela PGE'}/>
          ))}
        </div>
      )}

      <div className="px-3.5 py-2.5">
        <DownloadButton fileKey={downloadKey} label="Baixar Guia Explicativo" large color={accentColor} />
        {msg && (
          <span className='text-[10px] text-[#FF0000] flex justify-start items-center gap-1 mt-1'>
            <TriangleAlert className='inline-block w-3 h-3 mr-1' />
            {msg}
          </span>
        )}
      </div>
    </div>
  )
}