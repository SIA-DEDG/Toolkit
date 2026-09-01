import DownloadButton from './DownloadButton'
import { TriangleAlert } from "lucide-react"

/**
 * Uma etapa do fluxo de um instrumento: bolinha na trilha vertical à esquerda,
 * título, descrição, subitens, nota em itálico e, quando a etapa tem arquivo, o
 * botão de download com o aviso embaixo.
 *
 * @param {object} props
 * @param {{
 *   title: string,
 *   description?: string,
 *   note?: string,
 *   fileKey?: string,
 *   downloadLabel?: string,
 *   subitems?: Array<{dote?: boolean, number?: string, title: string, description?: string}>
 * }} props.card - A etapa, vinda de INSTRUMENT_FLOWS. Em `subitems`, `dote`
 *   marca o item como bullet; sem ele, usa `number` como numeração.
 * @param {string} props.accentColor - Cor da família, usada na trilha e nos marcadores.
 * @param {boolean} props.isLast - true na última etapa, para remover o traço que
 *   liga à etapa seguinte.
 * @param {string} [props.warningMessage] - Aviso vermelho abaixo do download.
 */
export function StepItem({ card, accentColor, isLast, warningMessage }) {
  const hasDownload = !!(card.fileKey || card.downloadLabel)

  return (
    <div className="flex gap-2.5 px-4">
      <div className="flex flex-col items-center w-2.5 shrink-0 pt-3.5">
        <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: accentColor }} />
        {!isLast && (
          <div className="w-0.5 flex-1 mt-1 opacity-25" style={{ background: accentColor }} />
        )}
      </div>

      <div className={`flex-1 flex flex-col gap-1 pt-2.5 ${isLast ? 'pb-2.5' : 'pb-4'}`}>
        <span className="font-semibold text-[14px] text-ink-dark leading-snug text-left">
          {card.title}
        </span>

        {card.description && (
          <span className="font-normal text-[12px] text-ink-muted leading-relaxed text-left">
            {card.description}
          </span>
        )}

        {card.subitems && (
          <div className="flex flex-col gap-0.5 mt-0.5">
            {card.subitems.map((item, index) => (
              <div key={index} className="flex gap-1.5 items-start">
                {item.dote
                  ? <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: accentColor }} />
                  : <span className="font-bold text-[14px] shrink-0 leading-relaxed" style={{ color: accentColor }}>
                    {item.number}.
                  </span>
                }
                <div className="flex flex-col">
                  <span className="font-semibold text-[14px] text-ink-sub leading-snug">{item.title}</span>
                  {item.description && (
                    <span className="font-normal text-[12px] text-ink-muted leading-snug">{item.description}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {card.note && (
          <div className="mt-0.5 pl-1.5 border-l-2" style={{ borderColor: accentColor }}>
            <span className="font-normal text-[12px] text-ink-muted leading-snug italic">
              {card.note}
            </span>
          </div>
        )}

        {hasDownload && (
          <div className="mt-0.5">
            <DownloadButton fileKey={card.fileKey} label={card.downloadLabel || 'Baixar Documento'} color={accentColor} />
            <span className='text-[10px] text-[#FF0000] flex justify-start items-center gap-1 mt-1'>
              <TriangleAlert className='inline-block w-3 h-3 mr-1' />
              {warningMessage}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
