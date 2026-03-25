export function InstrumentCard({ accentColor, iconBg, icon, title, description, width = 201, onClick }) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick() } : undefined}
      className={[
        'bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
        'overflow-visible shrink-0 transition-shadow duration-150',
        onClick ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
      style={{ width }}
      onMouseEnter={e => { if (onClick) e.currentTarget.style.boxShadow = '0px 6px 16px rgba(0,0,0,0.35)' }}
      onMouseLeave={e => { if (onClick) e.currentTarget.style.boxShadow = '0px 4px 4px rgba(0,0,0,0.25)' }}
    >
      <div className="h-1.5 rounded-t-[10px]" style={{ background: accentColor }} />
      <div className="px-3.5 pt-1.5 pb-2.5 flex flex-col gap-1.5">
        <p className="font-medium text-[9px] text-black m-0 leading-normal tracking-[0.05em]">
          INSTRUMENTO
        </p>
        <div className="flex flex-col gap-1">
          <div
            className="p-0.5 rounded w-[22px] h-[22px] flex items-center justify-center shrink-0"
            style={{ background: iconBg }}
          >
            {typeof icon === 'string'
              ? <span className="text-[14px] leading-none" aria-hidden="true">{icon}</span>
              : (() => { const Icon = icon; return <Icon className="w-4 h-4" aria-hidden="true" /> })()
            }
          </div>
          <p className="font-semibold text-sm leading-normal m-0" style={{ color: accentColor }}>{title}</p>
          <p className="font-light text-[10px] text-black leading-snug m-0">{description}</p>
        </div>
      </div>
    </div>
  )
}
