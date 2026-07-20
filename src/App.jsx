import { ToastProvider } from './hooks/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import HomePage from './page/HomePage'

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <HomePage />
      </ToastProvider>
    </ErrorBoundary>
  )
}
