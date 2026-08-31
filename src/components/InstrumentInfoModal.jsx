import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, Scale } from 'lucide-react'

const CARD_BACKGROUND_IMAGE = '/assets/shared/background-card.svg'

/**
 * Modal com o texto explicativo longo de um instrumento.
 *
 * Vai para o <body> via portal de propósito: a HomePage aplica `zoom` em todo o
 * conteúdo, e um modal renderizado dentro dessa árvore herdaria a escala e o
 * contexto de empilhamento. Fecha no Esc, no clique fora e no X, e trava o
 * scroll do body enquanto está aberto.
 *
 * Renderize condicionalmente (`{open && <InstrumentInfoModal .../>}`) — o
 * componente não controla a própria visibilidade.
 *
 * @param {object} props
 * @param {{title: string, legalBasis: string, paragraphs: Array<string|{term: string, text: string}>}} props.info
 *   Conteúdo vindo de getInstrumentInfo().
 * @param {string} props.accentColor - Cor da família do instrumento, usada no cabeçalho.
 * @param {() => void} props.onClose - Chamado ao pedir o fechamento.
 * @param {string} props.titleId - Id do <h2>, referenciado por aria-labelledby.
 */
export function InstrumentInfoModal({ info, accentColor, onClose, titleId }) {
  useEffect(() => {
    const handleKeyDown = (event) => { if (event.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKeyDown)

    const previousBodyOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousBodyOverflow
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div
        className="relative bg-surface rounded-xl w-full max-w-[720px] max-h-full flex flex-col overflow-hidden shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={CARD_BACKGROUND_IMAGE}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 w-[192px] h-[334px] max-w-none select-none"
        />

        <div className="relative z-[1] shrink-0 flex items-start gap-3 px-5 py-4 pr-14" style={{ background: accentColor }}>
          <h2 id={titleId} className="m-0 font-bold text-[17px] text-white leading-snug">
            {info.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute z-[2] top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white cursor-pointer border-none transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Único bloco rolável: o cabeçalho fica fixo enquanto o texto corre */}
        <div className="relative z-[1] overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {info.legalBasis && (
            <div className="flex gap-2 rounded-lg bg-surface-alt p-3 border-l-[3px]" style={{ borderColor: accentColor }}>
              <Scale className="w-4 h-4 shrink-0 mt-0.5" style={{ color: accentColor }} aria-hidden="true" />
              <p className="m-0 text-[12px] text-ink-sub leading-relaxed">
                <span className="font-semibold text-ink-dark">Base Legal: </span>
                {info.legalBasis}
              </p>
            </div>
          )}

          {info.paragraphs.map((paragraph, index) =>
            typeof paragraph === 'string' ? (
              <p key={index} className="m-0 text-[13px] text-ink-sub leading-relaxed text-justify">
                {paragraph}
              </p>
            ) : (
              <div key={index} className="flex gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-[7px]" style={{ background: accentColor }} aria-hidden="true" />
                <p className="m-0 text-[13px] text-ink-sub leading-relaxed text-justify">
                  <span className="font-semibold text-ink-dark">{paragraph.term}: </span>
                  {paragraph.text}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
