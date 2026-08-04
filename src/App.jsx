import { ToastProvider } from './hooks/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SiteUnavailable } from './components/SiteUnavailable'
import { useSiteEnabled } from './hooks/useSiteEnabled'
import HomePage from './page/HomePage'

// Raiz da aplicação: segura a renderização até o kill switch responder e, se o
// site estiver liberado, monta a HomePage dentro do ErrorBoundary e do ToastProvider.
export default function App() {
  const status = useSiteEnabled()

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
