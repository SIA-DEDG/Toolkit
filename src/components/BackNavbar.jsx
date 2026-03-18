export default function BackNavbar() {
  const goHome = () => {
    window.history.pushState({}, '', '/')
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <nav
      className="bg-[#2C5282] h-11 flex items-center px-6 border-b border-white/10 fixed top-0 left-0 right-0 z-30"
    >
      <button
        className="flex items-center gap-2 text-white text-sm font-medium hover:opacity-90 transition-opacity font-sans"
        onClick={goHome}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Voltar ao Painel
      </button>
    </nav>
  )
}
