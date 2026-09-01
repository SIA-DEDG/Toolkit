import { useRef, useState, useEffect, useLayoutEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import { SectionBadge } from '../SectionBadge'
import { TrilhaFlowchartDecision, INSTRUMENTS } from './TrilhaFlowchartDecision'

const COLLAPSED_HEIGHT = 520
const SCROLL_STEP = 600

/**
 * Overlay de tela cheia que mostra o fluxograma inteiro, encolhido o quanto for
 * preciso para caber na viewport.
 *
 * Dois detalhes que não dá para adivinhar lendo o JSX:
 * 1. Vai para o <body> via portal para escapar do `zoom` aplicado na HomePage.
 * 2. `transform: scale` não muda o tamanho que o elemento ocupa no layout, então
 *    a caixa de fora recebe explicitamente o tamanho JÁ escalado — sem isso
 *    sobra espaço em branco e o overlay ganha scroll.
 *
 * Renderize condicionalmente: o componente não controla a própria visibilidade.
 *
 * @param {object} props
 * @param {() => void} props.onClose - Chamado no Esc, no clique fora e no X.
 * @param {(id: string) => void} props.onInstrumentClick - Clique num card do fluxo.
 */
function FullscreenFlow({ onClose, onInstrumentClick }) {
  const viewportRef = useRef(null)
  const flowRef = useRef(null)
  const [fit, setFit] = useState({ scale: 1, width: 0, height: 0, ready: false })

  useLayoutEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current
      const flow = flowRef.current
      if (!viewport || !flow) return
      const availableWidth = viewport.clientWidth - 24
      const availableHeight = viewport.clientHeight - 24
      // scrollWidth/Height são medidas de layout, não afetadas pelo transform.
      const naturalWidth = flow.scrollWidth
      const naturalHeight = flow.scrollHeight
      if (!naturalWidth || !naturalHeight) return
      const scale = Math.min(1, availableWidth / naturalWidth, availableHeight / naturalHeight)
      setFit({ scale, width: naturalWidth, height: naturalHeight, ready: true })
    }
    measure()
    window.addEventListener('resize', measure)

    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKeyDown)

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow
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
        className="relative bg-surface rounded-xl w-full h-full max-w-[1600px] overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-surface hover:bg-surface-alt shadow ring-1 ring-[color:var(--hairline)] text-ink-mid cursor-pointer border-none"
        >
          <X className="w-5 h-5" />
        </button>

        <div ref={viewportRef} className="w-full h-full overflow-hidden flex items-center justify-center p-3">
          <div
            style={fit.ready ? { width: fit.width * fit.scale, height: fit.height * fit.scale } : undefined}
            className="shrink-0"
          >
            <div style={{ width: fit.width || undefined, height: fit.height || undefined, transform: `scale(${fit.scale})`, transformOrigin: 'top left' }}>
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

// Grupos do menu de atalho no cabeçalho da trilha. `keys` referencia o catálogo
// INSTRUMENTS; `dotColor` é a cor da bolinha e do cabeçalho do menu.
const INSTRUMENT_GROUPS = [
  { id: 'parceria', name: 'Parceria e P&D', dotColor: '#6d28d9', keys: ['convenio', 'acordo'] },
  { id: 'contratacao', name: 'Contratação pública', dotColor: '#0e7490', keys: ['licitacao', 'etec', 'cpsi', 'direta', 'doacao', 'transferencia'] },
  { id: 'mercado', name: 'Exploração de mercado', dotColor: '#b45309', keys: ['pmi', 'dialogo', 'pitchHackathon', 'concurso'] },
]

/**
 * Chip clicável de um grupo que abre um menu flutuante com os instrumentos dele.
 *
 * Não guarda estado próprio de propósito: quem abre e fecha é o pai, via `open`
 * e `onToggle`, para só um menu ficar aberto por vez.
 *
 * @param {object} props
 * @param {{id: string, name: string, dotColor: string, keys: string[]}} props.group -
 *   Um item de INSTRUMENT_GROUPS. `keys` referencia o catálogo INSTRUMENTS.
 * @param {boolean} props.open - Se o menu deste chip está aberto.
 * @param {() => void} props.onToggle - Clique no chip.
 * @param {(id: string) => void} props.onInstrumentClick - Clique num instrumento do menu.
 */
function GroupChip({ group, open, onToggle, onInstrumentClick }) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={`flex items-center gap-2 cursor-pointer border rounded-full pl-2.5 pr-2 py-1.5 transition-colors border-[color:var(--hairline)] ${open ? 'bg-[color:var(--overlay)]' : 'bg-surface hover:bg-[color:var(--overlay)]'
          }`}
      >
        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: group.dotColor }} />
        <span className="font-medium text-sm text-ink-mid whitespace-nowrap">{group.name}</span>
        <ChevronDown
          className={`w-4 h-4 text-ink-muted shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-20 w-[340px] rounded-2xl bg-surface shadow-xl ring-1 ring-[color:var(--hairline)] overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-3" style={{ background: group.dotColor }}>
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
                  className="flex items-start gap-3 rounded-xl px-3 py-2 text-left bg-transparent border-none cursor-pointer transition-colors hover:bg-[color:var(--overlay)]"
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

/**
 * Moldura da seção "Trilha de Instrumentos".
 *
 * Apesar do nome, não reescala nada: o fluxograma é renderizado em tamanho
 * nativo e esta camada só monta os controles em volta — cabeçalho com os chips
 * de grupo, a janela de altura limitada com o botão de ver mais/ver menos, a
 * barra de rolagem horizontal customizada (setas e thumb arrastável, já que a
 * nativa fica escondida) e a entrada do modo tela cheia, esse sim escalado.
 *
 * @param {object} props
 * @param {(id: string) => void} props.onInstrumentClick - Disparado ao clicar num
 *   instrumento, seja no fluxo, no menu de grupo ou na tela cheia. A HomePage usa
 *   para abrir o passo a passo correspondente.
 */
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

  // Mede a altura real do fluxograma para o modo expandido saber até onde abrir.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const measure = () => setNaturalHeight(canvas.scrollHeight)
    measure()
    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(canvas)
    return () => resizeObserver.disconnect()
  }, [])

  // Fecha o menu de grupo aberto quando o clique cai fora da área dos chips.
  useEffect(() => {
    if (!openGroup) return
    const handleClickOutside = (event) => {
      if (!groupsRef.current?.contains(event.target)) setOpenGroup(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openGroup])

  // Recalcula largura e posição do thumb (ambos em %) a partir do estado do
  // scroller. Quando não há o que rolar, o thumb ocupa a barra inteira.
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

  // Rola o fluxograma na horizontal (usado pelas setas laterais).
  const scrollBy = (delta) => {
    scrollRef.current?.scrollBy({ left: delta, behavior: 'smooth' })
  }

  // Converte uma coordenada X da tela em posição de scroll: onde o ponteiro
  // caiu dentro da barra vira a fração equivalente do conteúdo rolável.
  const scrollToClientX = useCallback((clientX) => {
    const scroller = scrollRef.current
    const track = trackRef.current
    if (!scroller || !track) return
    const { left, width } = track.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - left) / width))
    scroller.scrollLeft = ratio * (scroller.scrollWidth - scroller.clientWidth)
  }, [])

  // Arrasto do thumb: salta já no clique e segue o ponteiro. Os listeners ficam
  // na window (não no thumb) para o arrasto continuar mesmo saindo da barra.
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
      <div className="pt-[var(--section-spacing)] px-[var(--page-gutter)] pb-0 flex items-center justify-between gap-6 flex-wrap">
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
          {INSTRUMENT_GROUPS.map(group => (
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
          <div
            ref={canvasRef}
            className="w-max min-w-full px-[var(--page-gutter)] flex justify-center"
            style={{ paddingBottom: 10 }}
          >
            <TrilhaFlowchartDecision onInstrumentClick={onInstrumentClick} />
          </div>
        </div>

        {/* Degradê que esfuma o corte inferior quando o fluxo está recolhido */}
        {!expanded && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-10 bg-gradient-to-t from-surface to-transparent" />
        )}
      </div>

      <div className="px-[var(--page-gutter)] pt-4 pb-8 flex flex-col items-center gap-3">
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
            className="inline-flex items-center gap-1.5 cursor-pointer rounded-full h-[31px] pl-3 pr-3.5 text-brand text-[14px] font-medium bg-surface border border-brand hover:bg-brand-light/40 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            Ver fluxo completo
          </button>
        </div>

        <div className="flex items-center gap-3 w-full max-w-[860px]">
          <button
            type="button"
            onClick={() => scrollBy(-SCROLL_STEP)}
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
            onClick={() => scrollBy(SCROLL_STEP)}
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
