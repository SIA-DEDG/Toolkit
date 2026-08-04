const BADGE_STYLES = {
  sim: { bg: 'rgba(37,212,37,0.5)', dot: '#25d425', color: '#006d10', label: 'Sim' },
  nao: { bg: 'rgba(251,135,135,0.5)', dot: '#cc3030', color: '#ab0000', label: 'Não' },
}

/**
 * Card compacto que representa um instrumento nas folhas do fluxograma.
 *
 * @param {object} props
 * @param {string} props.accentColor - Cor da família, na barra superior e no título.
 * @param {string} props.iconBg - Fundo do quadrado do ícone.
 * @param {React.ComponentType|string} props.icon - Componente de ícone lucide, ou
 *   uma string (emoji), renderizada como texto.
 * @param {string} props.title - Nome do instrumento.
 * @param {string} props.description - Linha de apoio, normalmente a base legal curta.
 * @param {number} [props.width=136] - Largura em px.
 * @param {number} [props.height] - Altura fixa em px. Sem ela, o card cresce
 *   conforme o conteúdo; com ela, o excedente é cortado.
 * @param {'sim'|'nao'} [props.badge] - Selo no canto superior direito. Omitido, não aparece.
 * @param {() => void} [props.onClick] - Ao ser passado, o card vira botão
 *   acessível (Enter/Espaço) e ganha realce de sombra no hover. Sem ele, é
 *   apenas um card estático.
 */
export function InstrumentCard({ accentColor, iconBg, icon, title, description, width = 136, height, badge, onClick }) {
  const badgeStyle = badge ? BADGE_STYLES[badge] : null
  const Icon = typeof icon === 'string' ? null : icon

  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (event) => { if (event.key === 'Enter' || event.key === ' ') onClick() } : undefined}
      className={[
        'relative bg-surface rounded-[8px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
        'shrink-0 transition-shadow duration-150',
        onClick ? 'cursor-pointer' : 'cursor-default',
      ].join(' ')}
      style={{ width, ...(height ? { height, overflow: 'hidden' } : {}) }}
      onMouseEnter={event => { if (onClick) event.currentTarget.style.boxShadow = '0px 6px 16px rgba(0,0,0,0.30)' }}
      onMouseLeave={event => { if (onClick) event.currentTarget.style.boxShadow = '0px 4px 4px rgba(0,0,0,0.25)' }}
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
          style={{ fontSize: 10, fontWeight: 600, color: 'rgb(var(--ink-dark))', letterSpacing: '0.06em' }}
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
          style={{ fontSize: 12, fontWeight: 400, color: 'rgb(var(--ink-sub))', marginTop: 3 }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
