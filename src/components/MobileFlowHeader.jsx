import React, { useState, useEffect, useRef } from 'react'

const NAV_PAGES = [
  { label: 'Acordo PD&I',                       href: '/acordo-pd&i' },
  { label: 'Convênio PD&I',                     href: '/convenio-pd&i' },
  { label: 'Encomenda Tecnológica',             href: '/encomenda-tecnologica' },
  { label: 'Contratação Direta',                href: '/contratacao-direta' },
  { label: 'Contrato de Transferência',         href: '/contrato-transferencia-tecnologia' },
]

export default function MobileFlowHeader() {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname)
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = () => setCurrentPath(window.location.pathname)
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  useEffect(() => {
    const handleOutside = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handleOutside)
    return () => document.removeEventListener('mousedown', handleOutside)
  }, [])

  const navigate = (href) => {
    window.history.pushState({}, '', href)
    window.dispatchEvent(new PopStateEvent('popstate'))
    setOpen(false)
  }

  const current = NAV_PAGES.find(p => currentPath === p.href || currentPath.startsWith(p.href)) || NAV_PAGES[0]

  return (
    <>
      {/* Spacer para compensar o fixed */}
      <div style={{ height: 52 }} />

      <div
        ref={ref}
        style={{ position: 'fixed', top: 44, left: 0, right: 0, zIndex: 20, backgroundColor: '#2C5282' }}
      >
        {/* Botão do dropdown */}
        <button
          onClick={() => setOpen(o => !o)}
          style={{
            width: '100%',
            height: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 20px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderBottom: open ? '1px solid rgba(255,255,255,0.15)' : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="16" height="16" fill="none" stroke="#90CDF4" strokeWidth="2" viewBox="0 0 24 24">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{current.label}</span>
          </div>
          <svg
            width="16" height="16" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" viewBox="0 0 24 24"
            style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* Lista do dropdown */}
        {open && (
          <div style={{ backgroundColor: '#1A365D', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {NAV_PAGES.map((page, i) => {
              const isActive = currentPath === page.href || currentPath.startsWith(page.href)
              return (
                <button
                  key={i}
                  onClick={() => navigate(page.href)}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    backgroundColor: isActive ? '#2B6CB0' : 'rgba(255,255,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 10,
                    fontWeight: 800,
                    color: '#fff',
                    flexShrink: 0,
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.75)', fontWeight: isActive ? 700 : 500, fontSize: 14 }}>
                    {page.label}
                  </span>
                  {isActive && (
                    <svg style={{ marginLeft: 'auto' }} width="16" height="16" fill="none" stroke="#90CDF4" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
