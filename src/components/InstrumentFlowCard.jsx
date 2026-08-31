import { ChevronUp, ChevronDown, TriangleAlert, Info } from 'lucide-react'
import { useCallback, useState } from 'react'
import { StepItem } from './StepItem'
import DownloadButton from './DownloadButton'
import { InstrumentInfoModal } from './InstrumentInfoModal'
import { getInstrumentInfo } from '../data/instrumentInfo'

const CARD_BACKGROUND_IMAGE = '/assets/shared/background-card.svg'

/**
 * Card de um instrumento na seção "Passo a passo": base temática na cor do
 * grupo, cabeçalho clicável que expande a lista de etapas (StepItem) e, no
 * rodapé, o download do guia explicativo à esquerda e o botão de informação à
 * direita, que abre o modal com o texto explicativo.
 *
 * Quem manda se o card está aberto é o pai, via `openIds` e `onToggle`; já o
 * modal é estado local, porque só diz respeito a este card.
 *
 * @param {object} props
 * @param {string} props.id - Id do instrumento. Serve de chave em `openIds` e de
 *   busca do texto em getInstrumentInfo().
 * @param {string} props.accentColor - Cor da família, na faixa, no ícone e no modal.
 * @param {React.ComponentType|string} props.icon - Componente de ícone lucide, ou
 *   uma string (emoji), renderizada como texto.
 * @param {string} props.title - Nome do instrumento.
 * @param {string} props.subtitle - Linha de apoio abaixo do título.
 * @param {Array<object>} props.cards - Etapas do fluxo, repassadas ao StepItem.
 * @param {Set<string>} props.openIds - Ids com o passo a passo aberto.
 * @param {(id: string) => void} props.onToggle - Alterna este card.
 * @param {string} [props.downloadKey] - Caminho do guia explicativo no bucket.
 * @param {string} [props.warningMessage] - Aviso vermelho abaixo do download.
 *   Sem ele, nenhum aviso aparece.
 */
export function InstrumentFlowCard({ accentColor, icon, title, subtitle, cards, id, openIds, onToggle, downloadKey, warningMessage }) {
  const isOpen = openIds.has(id)
  const Icon = typeof icon === 'string' ? null : icon

  const [infoOpen, setInfoOpen] = useState(false)
  // null quando o instrumento ainda não tem texto escrito — aí o botão some.
  const info = getInstrumentInfo(id)

  const handleToggle = useCallback(() => onToggle(id), [id, onToggle])
  const closeInfo = useCallback(() => setInfoOpen(false), [])

  return (
    <div
      className="relative min-h-[190px] bg-surface rounded-lg border overflow-hidden flex flex-col min-w-0"
      style={{
        borderColor: accentColor,
      }}
    >
      <div
        className="relative z-[1] h-[10px] shrink-0"
        style={{ backgroundColor: accentColor }}
      />

      <img
        src={CARD_BACKGROUND_IMAGE}
        alt=""
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 w-[96px] h-[167px] max-w-none select-none ${
          isOpen ? 'bottom-0' : 'top-[22px]'
        }`}
      />

      <button
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls={`flow-${id}`}
        className="relative z-[1] flex-1 w-full text-left border-none cursor-pointer px-3.5 py-3 min-h-[96px] bg-transparent"
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
        <div id={`flow-${id}`} className="relative z-[1]">
          {cards.map((card, index) => (
            <StepItem
              key={index}
              card={card}
              accentColor={accentColor}
              isLast={index === cards.length - 1}
              warningMessage={id === 'acordo-pd&i' ? 'Minutas sujeitas a correção no SEI' : 'Documento sendo validado pela PGE'}
            />
          ))}
        </div>
      )}

      <div className="relative z-[1] px-3.5 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <DownloadButton fileKey={downloadKey} label="Baixar Guia Explicativo" large color={accentColor} />
            {warningMessage && (
              <span className='text-[10px] text-[#FF0000] flex justify-start items-center gap-1 mt-1'>
                <TriangleAlert className='inline-block w-3 h-3 mr-1' />
                {warningMessage}
              </span>
            )}
          </div>

          {info && (
            <button
              type="button"
              onClick={() => setInfoOpen(true)}
              aria-label={`Sobre ${title}`}
              title="Sobre este instrumento"
              className="mt-2 shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border-2 bg-surface hover:bg-surface-alt cursor-pointer transition-colors"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <Info className="w-[18px] h-[18px]" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {info && infoOpen && (
        <InstrumentInfoModal
          info={info}
          accentColor={accentColor}
          onClose={closeInfo}
          titleId={`info-title-${id}`}
        />
      )}
    </div>
  )
}
