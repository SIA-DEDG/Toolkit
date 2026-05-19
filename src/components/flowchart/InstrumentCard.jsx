const BADGE = {
  sim: { bg: 'rgba(37,212,37,0.5)', dot: '#25d425', color: '#006d10', label: 'Sim' },
  nao: { bg: 'rgba(251,135,135,0.5)', dot: '#cc3030', color: '#ab0000', label: 'Não' },
}

// Card compacto de instrumento com barra colorida, ícone e badge opcional
export function InstrumentCard({ accentColor, iconBg, icon, title, description, width = 136, height, badge, onClick }) {
  const b = badge ? BADGE[badge] : null

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
      className={[
        'relative bg-white rounded-[5px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
        'shrink-0 transition-shadow duration-150',
        onClick ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
      style={{ width, ...(height ? { height, overflow: 'hidden' } : {}) }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.boxShadow = '0px 6px 16px rgba(0,0,0,0.30)' }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.boxShadow = '0px 4px 4px rgba(0,0,0,0.25)' }}
    >
      <div
        className="rounded-tl-[10px] rounded-tr-[10px]"
        style={{ height: 6, background: accentColor }}
      />

      {b && (
        <div
          className="absolute flex items-center gap-[3px] rounded-[5px]"
          style={{
            top: 13, right: 6,
            height: 14, paddingLeft: 5, paddingRight: 5,
            background: b.bg,
            whiteSpace: 'nowrap',
          }}
        >
          <div className="rounded-full shrink-0" style={{ width: 4, height: 4, background: b.dot }} />
          <span style={{ fontSize: 9, fontWeight: 500, color: b.color, lineHeight: 1 }}>{b.label}</span>
        </div>
      )}

      <div style={{ paddingLeft: 12, paddingRight: 12, paddingTop: 6, paddingBottom: 10 }}>
        <p
          className="m-0 leading-normal"
          style={{ fontSize: 9, fontWeight: 500, color: '#000', letterSpacing: '0.05em' }}
        >
          INSTRUMENTO
        </p>

        <div
          className="flex items-center justify-center rounded-[4px] shrink-0"
          style={{
            width: 22, height: 22,
            marginTop: 6,
            padding: 3,
            background: iconBg,
          }}
        >
          {typeof icon === 'string'
            ? <span style={{ fontSize: 14, lineHeight: 1 }} aria-hidden="true">{icon}</span>
            : (() => { const I = icon; return <I style={{ width: 16, height: 16 }} aria-hidden="true" /> })()
          }
        </div>

        <p
          className="m-0 leading-normal"
          style={{ fontSize: 14, fontWeight: 600, color: accentColor, marginTop: 4 }}
        >
          {title}
        </p>

        <p
          className="m-0 leading-snug"
          style={{ fontSize: 10, fontWeight: 300, color: '#000', marginTop: 3 }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
