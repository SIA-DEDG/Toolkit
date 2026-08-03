const BADGE = {
  sim: { bg: 'rgba(37,212,37,0.5)', dot: '#25d425', color: '#006d10', label: 'Sim' },
  nao: { bg: 'rgba(251,135,135,0.5)', dot: '#cc3030', color: '#ab0000', label: 'Não' },
}

// Card compacto de instrumento com barra colorida, ícone e badge opcional
export function InstrumentCard({ accentColor, iconBg, icon, title, description, width = 136, height, badge, onClick }) {
  const badgeStyle = badge ? BADGE[badge] : null
  const Icon = typeof icon === 'string' ? null : icon

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
      className={[
        'relative bg-white rounded-[8px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
        'shrink-0 transition-shadow duration-150',
        onClick ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
      style={{ width, ...(height ? { height, overflow: 'hidden' } : {}) }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.boxShadow = '0px 6px 16px rgba(0,0,0,0.30)' }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.boxShadow = '0px 4px 4px rgba(0,0,0,0.25)' }}
    >
      <div
        className="rounded-tl-[8px] rounded-tr-[8px]"
        style={{ height: 8, background: accentColor }}
      />

      {badgeStyle && (
        <div
          className="absolute flex items-center gap-[3px] rounded-[5px]"
          style={{
            top: 13, right: 6,
            height: 14, paddingLeft: 5, paddingRight: 5,
            background: badgeStyle.bg,
            whiteSpace: 'nowrap',
          }}
        >
          <div className="rounded-full shrink-0" style={{ width: 4, height: 4, background: badgeStyle.dot }} />
          <span style={{ fontSize: 9, fontWeight: 500, color: badgeStyle.color, lineHeight: 1 }}>{badgeStyle.label}</span>
        </div>
      )}

      <div style={{ paddingLeft: 13, paddingRight: 13, paddingTop: 8, paddingBottom: 11 }}>
        <p
          className="m-0 leading-normal"
          style={{ fontSize: 10, fontWeight: 600, color: '#000', letterSpacing: '0.06em' }}
        >
          INSTRUMENTO
        </p>

        <div
          className="flex items-center justify-center rounded-[6px] shrink-0"
          style={{
            width: 22, height: 22,
            marginTop: 6,
            padding: 3,
            background: iconBg,
          }}
        >
          {Icon
            ? <Icon style={{ width: 15, height: 15 }} aria-hidden="true" />
            : <span style={{ fontSize: 13, lineHeight: 1 }} aria-hidden="true">{icon}</span>
          }
        </div>

        <p
          className="m-0 leading-snug"
          style={{ fontSize: 14.5, fontWeight: 700, color: accentColor, marginTop: 6 }}
        >
          {title}
        </p>

        <p
          className="m-0 leading-snug"
          style={{ fontSize: 12, fontWeight: 400, color: '#4a5568', marginTop: 3 }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
