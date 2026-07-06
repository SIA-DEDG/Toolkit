import { useRef, useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionBadge } from '../SectionBadge'
import { TrilhaFlowchartDecision, INSTRUMENTS } from './TrilhaFlowchartDecision'

const FLOWCHART_W = 1960
const FLOWCHART_H = 900

// Altura visível quando a trilha está recolhida (mostra apenas o topo da árvore)
const COLLAPSED_H = 470

// Grupos de instrumentos exibidos como legenda/filtro no cabeçalho da trilha
const GROUPS = [
  { id: 'A', name: 'Parceria e P&D', dot: '#6d28d9', keys: ['convenio', 'acordo'] },
  { id: 'B', name: 'Contratação pública', dot: '#0e7490', keys: ['licitacao', 'etec', 'cpsi', 'direta', 'doacao', 'transferencia'] },
  { id: 'C', name: 'Exploração de mercado', dot: '#b45309', keys: ['pmi', 'dialogo', 'pitch', 'hackathon', 'concurso'] },
]

// Chip de grupo com bolinha colorida e menu recolhível dos instrumentos daquele grupo
function GroupChip({ group, open, onToggle, onInstrumentClick }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-2 cursor-pointer border rounded-full pl-2.5 pr-2 py-1.5 transition-colors ${
          open ? 'bg-black/[0.03] border-black/10' : 'bg-white border-black/10 hover:bg-black/[0.03]'
        }`}
      >
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: group.dot }} />
        <span className="font-medium text-sm text-ink-mid whitespace-nowrap">{group.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-ink-muted shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 w-[340px] rounded-2xl bg-white shadow-xl ring-1 ring-black/5 overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: group.dot }}>
            <span className="w-2.5 h-2.5 rounded-full bg-white/90 shrink-0" />
            <span className="font-semibold text-sm text-white">{group.name}</span>
            <span className="ml-auto text-xs font-medium text-white/75">{group.keys.length} instrumentos</span>
          </div>
          <div className="flex flex-col p-1.5">
            {group.keys.map(key => {
              const inst = INSTRUMENTS[key]
              const Icon = inst.icon
              return (
                <button
                  key={key}
                  onClick={() => onInstrumentClick(inst.id)}
                  className="flex items-start gap-3 rounded-xl px-3 py-2 text-left bg-transparent border-none cursor-pointer transition-colors hover:bg-black/[0.04]"
                >
                  <span
                    className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ background: inst.iconBg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: inst.accentColor }} />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm leading-tight" style={{ color: inst.accentColor }}>
                      {inst.title}
                    </span>
                    <span className="font-normal text-xs text-ink-muted leading-tight mt-0.5">
                      {inst.description}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Wrapper da trilha: cabeçalho com grupos, árvore em tamanho nativo com scroll horizontal
// e controle para recolher/expandir a altura visível.
export function ScaledFlowchartDecision({ onInstrumentClick }) {
  const scrollRef = useRef(null)
  const [openGroup, setOpenGroup] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [thumb, setThumb] = useState({ width: 100, left: 0 })

  // Atualiza posição/tamanho do indicador de scroll horizontal
  const updateThumb = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    const { scrollWidth, clientWidth, scrollLeft } = el
    if (scrollWidth <= clientWidth) {
      setThumb({ width: 100, left: 0 })
      return
    }
    const width = (clientWidth / scrollWidth) * 100
    const left = (scrollLeft / (scrollWidth - clientWidth)) * (100 - width)
    setThumb({ width, left })
  }, [])

  useEffect(() => {
    updateThumb()
    window.addEventListener('resize', updateThumb)
    return () => window.removeEventListener('resize', updateThumb)
  }, [updateThumb, expanded])

  const scrollBy = (delta) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  return (
    <div className="w-full">
      <div className="py-[clamp(20px,3vw,40px)] px-[clamp(10px,1vw,66px)] pb-0 flex items-start justify-between gap-6 items-center flex-wrap">
        <div>
          <SectionBadge>Trilha de Instrumentos</SectionBadge>
          <h2 className="font-semibold text-[clamp(18px,2vw,24px)] text-ink-mid mt-3 mb-1">
            Trilha de Instrumentos
          </h2>
          <p className="font-normal text-sm text-ink-mid m-0">
            Siga as perguntas para identificar o instrumento mais adequado para a sua necessidade.
          </p>
          <span className="inline-flex mt-4 items-center rounded-full border border-brand px-2.5 py-[7px]">
            <span className="font-medium text-sm text-brand">3 Grupos - 12 Instrumentos</span>
          </span>
        </div>

        <div className="flex items-center gap-6 flex pt-1">
          {GROUPS.map(group => (
            <GroupChip
              key={group.id}
              group={group}
              open={openGroup === group.id}
              onToggle={() => setOpenGroup(prev => (prev === group.id ? null : group.id))}
              onInstrumentClick={onInstrumentClick}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-5">
        <div
          ref={scrollRef}
          onScroll={updateThumb}
          className="no-scrollbar w-full overflow-x-auto overflow-y-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: expanded ? FLOWCHART_H : COLLAPSED_H }}
        >
          <div style={{ width: FLOWCHART_W, paddingBottom: 10 }}>
            <TrilhaFlowchartDecision onInstrumentClick={onInstrumentClick} />
          </div>
        </div>

        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>

      <div className="px-[clamp(20px,5vw,66px)] pt-4 pb-8 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={() => setExpanded(v => !v)}
          className="inline-flex items-center gap-1.5 border-none cursor-pointer rounded-full h-[31px] pl-3 pr-2.5 text-white text-xs font-medium"
          style={{ background: 'linear-gradient(90deg, #042d63 0%, #0e50a6 80%)' }}
        >
          {expanded ? 'Ver menos' : 'Ver mais'}
          <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        <div className="flex items-center gap-3 w-full max-w-[860px]">
          <button
            type="button"
            onClick={() => scrollBy(-600)}
            aria-label="Rolar para a esquerda"
            className="shrink-0 flex items-center justify-center w-6 h-6 bg-transparent border-none cursor-pointer text-brand hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative flex-1 h-1.5 rounded-full bg-brand-light/60 overflow-hidden">
            <div
              className="absolute top-0 h-full rounded-full bg-brand transition-[left] duration-75"
              style={{ width: `${thumb.width}%`, left: `${thumb.left}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => scrollBy(600)}
            aria-label="Rolar para a direita"
            className="shrink-0 flex items-center justify-center w-6 h-6 bg-transparent border-none cursor-pointer text-brand hover:opacity-70 transition-opacity"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}
