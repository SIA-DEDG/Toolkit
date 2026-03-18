import React, { useEffect, useState } from 'react'

const NAV_PAGES = [
  { label: 'Acordo\nPD&I',                        href: '/acordo-pd&i' },
  { label: 'Convênio\nPD&I',                      href: '/convenio-pd&i' },
  { label: 'Encomenda\nTecnológica',              href: '/encomenda-tecnologica' },
  { label: 'Contratação\nDireta',                 href: '/contratacao-direta' },
  { label: 'Contrato de\nTransferência',          href: '/contrato-transferencia-tecnologia' },
]

const BORDER_COLOR   = '#1A365D'
const INACTIVE_COLOR = '#2B6CB0'
const ACTIVE_COLOR   = '#1A365D'
const NOTCH          = 20
const BORDER         = 1
const TOTAL          = NAV_PAGES.length

export default function FlowNavBar() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)

  useEffect(() => {
    const handler = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  const navigate = (href) => {
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <>
      <div style={{ height: 72, flexShrink: 0 }} />
      <div className="flex" style={{ position: 'fixed', top: 44, left: 0, right: 0, height: 72, zIndex: 20, backgroundColor: BORDER_COLOR }}>
        {NAV_PAGES.map((page, i) => {
          const isActive = currentPath === page.href || (currentPath.startsWith(page.href) && page.href !== '/')
          const isLast = i === TOTAL - 1

          const outerClip = isLast
            ? null
            : `polygon(0 0, calc(100% - ${NOTCH}px) 0, 100% 50%, calc(100% - ${NOTCH}px) 100%, 0 100%)`

          const innerClip = isLast
            ? `polygon(${BORDER}px ${BORDER}px, calc(100% - ${BORDER}px) ${BORDER}px, calc(100% - ${BORDER}px) calc(100% - ${BORDER}px), ${BORDER}px calc(100% - ${BORDER}px))`
            : `polygon(${BORDER}px ${BORDER}px, calc(100% - ${NOTCH + BORDER}px) ${BORDER}px, calc(100% - ${BORDER}px) 50%, calc(100% - ${NOTCH + BORDER}px) calc(100% - ${BORDER}px), ${BORDER}px calc(100% - ${BORDER}px))`

          return (
            <div
              key={i}
              onClick={() => navigate(page.href)}
              style={{
                clipPath: outerClip,
                backgroundColor: BORDER_COLOR,
                flex: 1,
                height: '100%',
                position: 'relative',
                zIndex: TOTAL - i,
                marginRight: isLast ? 0 : `-${NOTCH}px`,
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  clipPath: innerClip,
                  backgroundColor: isActive ? ACTIVE_COLOR : INACTIVE_COLOR,
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: i === 0 ? '10px' : `${NOTCH + 8}px`,
                  paddingRight: `${NOTCH + 10}px`,
                  transition: 'background-color 0.2s',
                }}
              >
                {page.label.split('\n').map((line, j) => (
                  <span
                    key={j}
                    style={{ fontWeight: 700, fontSize: '14px', lineHeight: 1.3, textAlign: 'center', display: 'block', color: '#fff' }}
                  >
                    {line}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
