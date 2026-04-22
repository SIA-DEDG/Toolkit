import DownloadButton from './DownloadButton'

export function StepItem({ card, accentColor, isLast }) {
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
        <span className="font-semibold text-xs text-ink-dark leading-snug text-left">
          {card.title}
        </span>

        {card.description && (
          <span className="font-normal text-[11px] text-ink-muted leading-relaxed text-left">
            {card.description}
          </span>
        )}

        {card.subitems && (
          <div className="flex flex-col gap-0.5 mt-0.5">
            {card.subitems.map((item, i) => (
              <div key={i} className="flex gap-1.5 items-start">
                {item.dote
                  ? <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: accentColor }} />
                  : <span className="font-bold text-[10px] shrink-0 leading-relaxed" style={{ color: accentColor }}>
                      {item.number}.
                    </span>
                }
                <div className="flex flex-col">
                  <span className="font-semibold text-[10px] text-ink-sub leading-snug">{item.title}</span>
                  {item.description && (
                    <span className="font-normal text-[10px] text-ink-muted leading-snug">{item.description}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {card.note && (
          <div className="mt-0.5 pl-1.5 border-l-2" style={{ borderColor: accentColor }}>
            <span className="font-normal text-[10px] text-ink-muted leading-snug italic">
              {card.note}
            </span>
          </div>
        )}

        {hasDownload && (
          <div className="mt-0.5">
            <DownloadButton fileKey={card.fileKey} label={card.downloadLabel || 'Baixar Documento'} />
          </div>
        )}
      </div>
    </div>
  )
}
