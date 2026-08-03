import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { SectionBadge } from '../SectionBadge'
import { TrilhaFlowchartDecision, INSTRUMENTS } from './TrilhaFlowchartDecision'

const COLLAPSED_HEIGHT = 520

// Overlay em tela cheia que escala o fluxograma inteiro para caber na viewport.
// Renderizado via portal no body para escapar do `zoom` da página.
function FullscreenFlow({ onClose, onInstrumentClick }) {
  const wrapRef = useRef(null)
  const flowRef = useRef(null)
  // scale + tamanho natural do fluxo; a caixa externa usa o tamanho JÁ escalado
  // para o layout bater com o visual (transform não encolhe a caixa por si só).
  const [fit, setFit] = useState({ scale: 1, w: 0, h: 0, ready: false })

  useLayoutEffect(() => {
    const measure = () => {
      const wrap = wrapRef.current
      const flow = flowRef.current
      if (!wrap || !flow) return
      const availW = wrap.clientWidth - 24
      const availH = wrap.clientHeight - 24
      // scrollWidth/Height são medidas de layout, não afetadas pelo transform
      const naturalW = flow.scrollWidth
      const naturalH = flow.scrollHeight
      if (!naturalW || !naturalH) return
      const scale = Math.min(1, availW / naturalW, availH / naturalH)
      setFit({ scale, w: naturalW, h: naturalH, ready: true })
    }
    measure()
    window.addEventListener('resize', measure)
    const onKey = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    // Trava o scroll do body enquanto o overlay está aberto
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Fluxo completo"
    >
      <div
        className="relative bg-white rounded-xl w-full h-full max-w-[1600px] overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/90 hover:bg-white shadow ring-1 ring-black/10 text-ink-mid cursor-pointer border-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div ref={wrapRef} className="w-full h-full overflow-hidden flex items-center justify-center p-3">
          {/* Caixa externa com o tamanho escalado — evita scroll/branco excedente */}
          <div
            style={fit.ready ? { width: fit.w * fit.scale, height: fit.h * fit.scale } : undefined}
            className="shrink-0"
          >
            <div style={{ width: fit.w || undefined, height: fit.h || undefined, transform: `scale(${fit.scale})`, transformOrigin: 'top left' }}>
              <div ref={flowRef} className="w-max">
                <TrilhaFlowchartDecision onInstrumentClick={onInstrumentClick} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

const GROUPS = [
  { id: 'A', name: 'Parceria e P&D', dot: '#6d28d9', keys: ['convenio', 'acordo'] },
  { id: 'B', name: 'Contratação pública', dot: '#0e7490', keys: ['licitacao', 'etec', 'cpsi', 'direta', 'doacao', 'transferencia'] },
  { id: 'C', name: 'Exploração de mercado', dot: '#b45309', keys: ['pmi', 'dialogo', 'pitchHackathon', 'concurso'] },
]

// Chip de grupo com bolinha colorida e menu recolhível dos instrumentos daquele grupo
function GroupChip({ group, open, onToggle, onInstrumentClick }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-2 cursor-pointer border rounded-full pl-2.5 pr-2 py-1.5 transition-colors ${open ? 'bg-black/[0.03] border-black/10' : 'bg-white border-black/10 hover:bg-black/[0.03]'
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
              const instrument = INSTRUMENTS[key]
              const Icon = instrument.icon
              return (
                <button
                  key={key}
                  onClick={() => onInstrumentClick(instrument.id)}
                  className="flex items-start gap-3 rounded-xl px-3 py-2 text-left bg-transparent border-none cursor-pointer transition-colors hover:bg-black/[0.04]"
                >
                  <span
                    className="mt-0.5 flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ background: instrument.iconBg }}
                  >
                    <Icon className="w-4 h-4" style={{ color: instrument.accentColor }} />
                  </span>
                  <span className="flex flex-col min-w-0">
                    <span className="font-semibold text-sm leading-tight" style={{ color: instrument.accentColor }}>
                      {instrument.title}
                    </span>
                    <span className="font-normal text-xs text-ink-muted leading-tight mt-0.5">
                      {instrument.description}
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
  const canvasRef = useRef(null)
  const trackRef = useRef(null)
  const groupsRef = useRef(null)
  const [openGroup, setOpenGroup] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [thumb, setThumb] = useState({ width: 100, left: 0 })
  const [naturalHeight, setNaturalHeight] = useState(0)

  // Mede a altura nativa do fluxograma (em tamanho real) para o recolher/expandir
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const measure = () => setNaturalHeight(canvas.scrollHeight)
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(canvas)
    return () => resizeObserver.disconnect()
  }, [])

  // Fecha o menu de grupo aberto ao clicar fora dos chips
  useEffect(() => {
    if (!openGroup) return
    const handleClickOutside = (event) => {
      if (!groupsRef.current?.contains(event.target)) setOpenGroup(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openGroup])

  // Atualiza posição/tamanho do indicador de scroll horizontal
  const updateThumb = useCallback(() => {
    const scroller = scrollRef.current
    if (!scroller) return
    const { scrollWidth, clientWidth, scrollLeft } = scroller
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
  }, [updateThumb, expanded, naturalHeight])

  const scrollBy = (delta) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  // Move o scroll horizontal proporcionalmente à posição do mouse na barra
  const scrollToClientX = useCallback((clientX) => {
    const scroller = scrollRef.current
    const track = trackRef.current
    if (!scroller || !track) return
    const { left, width } = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - left) / width))
    scroller.scrollLeft = ratio * (scroller.scrollWidth - scroller.clientWidth)
  }, [])

  // Arrasto da barra de rolagem (thumb) com o mouse
  const handleThumbPointerDown = useCallback((event) => {
    event.preventDefault()
    scrollToClientX(event.clientX)
    const handlePointerMove = (moveEvent) => scrollToClientX(moveEvent.clientX)
    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
  }, [scrollToClientX])

  return (
    <div className="w-full">
      <div className="py-[clamp(20px,3vw,40px)] px-[clamp(10px,1vw,66px)] pb-0 flex items-center justify-between gap-6 flex-wrap">
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

        <div ref={groupsRef} className="flex items-center gap-6 pt-1">
          {GROUPS.map(group => (
            <GroupChip
              key={group.id}
              group={group}
              open={openGroup === group.id}
              onToggle={() => setOpenGroup(prev => (prev === group.id ? null : group.id))}
              onInstrumentClick={(id) => { setOpenGroup(null); onInstrumentClick(id) }}
            />
          ))}
        </div>
      </div>

      <div className="relative mt-5">
        <div
          ref={scrollRef}
          onScroll={updateThumb}
          className="no-scrollbar w-full overflow-x-auto overflow-y-hidden transition-[max-height] duration-300 ease-in-out"
          style={{ maxHeight: expanded ? (naturalHeight || 4000) + 10 : COLLAPSED_HEIGHT }}
        >
          <div ref={canvasRef} style={{ paddingBottom: 10 }}>
            <TrilhaFlowchartDecision onInstrumentClick={onInstrumentClick} />
          </div>
        </div>

        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-10 bg-gradient-to-t from-white/85 to-transparent" />
        )}
      </div>

      <div className="px-[clamp(20px,5vw,66px)] pt-4 pb-8 flex flex-col items-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(prev => !prev)}
            className="inline-flex items-center gap-1.5 border-none cursor-pointer rounded-full h-[31px] pl-3 pr-2.5 text-white text-[14px] font-medium"
            style={{ background: 'linear-gradient(90deg, #042d63 0%, #0e50a6 80%)' }}
          >
            {expanded ? 'Ver menos do fluxo' : 'Ver mais do fluxo'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-150 ${expanded ? 'rotate-180' : ''}`} />
          </button>

          <button
            type="button"
            onClick={() => setFullscreen(true)}
            className="inline-flex items-center gap-1.5 cursor-pointer rounded-full h-[31px] pl-3 pr-3.5 text-brand text-[14px] font-medium bg-white border border-brand hover:bg-brand-light/40 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            Ver fluxo completo
          </button>
        </div>

        <div className="flex items-center gap-3 w-full max-w-[860px]">
          <button
            type="button"
            onClick={() => scrollBy(-600)}
            aria-label="Rolar para a esquerda"
            className="shrink-0 flex items-center justify-center w-6 h-6 bg-transparent border-none cursor-pointer text-brand hover:opacity-70 transition-opacity"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div
            ref={trackRef}
            onPointerDown={handleThumbPointerDown}
            className="relative flex-1 h-1.5 rounded-full bg-brand-light/60 cursor-pointer group py-2 -my-2"
          >
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-brand-light/60" />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1.5 rounded-full bg-brand transition-[left] duration-75 cursor-grab active:cursor-grabbing group-active:h-2.5"
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

      {fullscreen && (
        <FullscreenFlow
          onClose={() => setFullscreen(false)}
          onInstrumentClick={(id) => { setFullscreen(false); onInstrumentClick(id) }}
        />
      )}
    </div>
  )
}
