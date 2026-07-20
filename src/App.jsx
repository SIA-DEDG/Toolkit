import { ToastProvider } from './hooks/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SiteUnavailable } from './components/SiteUnavailable'
import { useSiteEnabled } from './hooks/useSiteEnabled'
import HomePage from './page/HomePage'

export default function App() {
  const status = useSiteEnabled()

  // Enquanto carrega não renderiza nada do sistema, para não piscar conteúdo
  // antes da flag ser resolvida.
  if (status === 'loading') return null
  if (status !== 'enabled') return <SiteUnavailable />

  return (
    <ErrorBoundary>
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    </ErrorBoundary>
  )
}
